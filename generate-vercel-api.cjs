const fs = require('fs');
const path = require('path');

const serverFile = fs.readFileSync('server.ts', 'utf8');

const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir);
}
const vivaDir = path.join(apiDir, 'viva');
if (!fs.existsSync(vivaDir)) {
  fs.mkdirSync(vivaDir);
}

// Write utils.ts
const utilsCode = `import { GoogleGenAI, Type } from "@google/genai";

export const getAi = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY environment variable is required");
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

export const generateContentWithRetry = async (ai: GoogleGenAI, options: any, maxRetries = 3) => {
  let retries = maxRetries;
  while (retries > 0) {
    try {
      const interaction = await ai.interactions.create(options);
      
      let fullOutput = "";
      for (const step of interaction.steps || []) {
        if (step.type === 'model_output') {
          const textContent = step.content?.find((c: any) => c.type === 'text');
          if (textContent && textContent.text) {
            fullOutput += textContent.text;
          }
        }
      }
      
      return { text: fullOutput };
    } catch (error: any) {
      console.error("[GEMINI ERROR]:", error.message || error);
      
      if (error.message && error.message.toLowerCase().includes('quota')) {
        throw new Error("API Quota Exceeded: " + error.message);
      }

      const isUnavailable = error.status === 'UNAVAILABLE' || 
                            (error.message && (error.message.includes('503') || error.message.includes('429')));
      
      if (isUnavailable) {
        retries--;
        if (retries === 0) throw error;
        const delay = (maxRetries - retries) * 1500;
        console.log(\`[GEMINI RETRY] Retrying in \${delay}ms... (\${retries} retries left)\`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

export { Type };
`;
fs.writeFileSync(path.join(apiDir, 'utils.ts'), utilsCode);

// Write health.ts
fs.writeFileSync(path.join(apiDir, 'health.ts'), `
export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    ok: true,
    service: "ideon-api",
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
}
`);

// Extract individual routes from server.ts
function extractRoute(routePath) {
    // Escape string for regex
    const escapedRoute = routePath.replace(/\//g, '\\/');
    // Try to find app.post("/api/...")
    const regex = new RegExp(\`app\\.post\\("\\\${escapedRoute}", async \\(req, res\\) => \\{([\\\\s\\\\S]*?)\\} catch \\(error: any\\) \\{\\s*console\\.error\\(error\\);([\\\\s\\\\S]*?)\\}  \\}\\);\`, 'm');
    const match = serverFile.match(regex);
    if (!match) return null;
    return match[1] + "} catch (error: any) {\n      console.error(error);\n" + match[2] + "}";
}

const routes = [
    { path: '/api/generate', file: 'generate.ts' },
    { path: '/api/evolve', file: 'evolve.ts' },
    { path: '/api/adapt', file: 'adapt.ts' },
    { path: '/api/mentor', file: 'mentor.ts' },
    { path: '/api/viva/question', file: 'viva/question.ts' },
    { path: '/api/viva/evaluate', file: 'viva/evaluate.ts' },
];

for (const route of routes) {
    let logic = extractRoute(route.path);
    if (logic) {
        // For utils import path
        const depth = route.file.split('/').length - 1;
        const utilsImportPath = depth === 0 ? './utils' : '../utils';
        
        // Remove 'try {' since the extracted block has it, but wait, the extractRoute returns everything inside the outer try/catch, minus the res.status part maybe?
        // Actually, my regex captures `try {` to the end of `catch {}`.
        // Let's refine the regex slightly.
        const fullMatchRegex = new RegExp(\`app\\.post\\("\\\${route.path.replace(/\\//g, '\\\\/')}", async \\(req, res\\) => \\{([\\\\s\\\\S]*?)(?:\\}\\);|  app\\.post)\`, 'm');
        let fullMatch = serverFile.match(fullMatchRegex);
        let block = fullMatch ? fullMatch[1].trim() : '';
        
        // Remove trailing `});` if it got caught
        if (block.endsWith('});')) {
            block = block.slice(0, -3);
        }

        const template = \`import { getAi, generateContentWithRetry, Type } from '\${utilsImportPath}';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, stage: "server", message: "Method not allowed" });
  }

  \${block}
}
\`;
        fs.writeFileSync(path.join(apiDir, route.file), template);
        console.log(\`Generated \${route.file}\`);
    } else {
        console.log(\`Could not find route \${route.path}\`);
    }
}
