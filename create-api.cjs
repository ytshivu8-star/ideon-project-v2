const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir);
}

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

const generateCode = `import { getAi, generateContentWithRetry, Type } from './utils';

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

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: true, stage: "environment", message: "GEMINI_API_KEY is missing." });
    }
    
    const ai = getAi();
    const studentDna = req.body;
    
    if (!studentDna || Object.keys(studentDna).length === 0) {
      return res.status(400).json({ error: true, stage: "request", message: "Missing request body" });
    }
    
    const prompt = \`You are a final-year project architect, software engineer, AI/ML expert, innovation evaluator, research mentor, and university project guide.Generate exactly 3 personalized final-year project concepts based on this student profile:\${JSON.stringify(studentDna, null, 2)}Avoid generic projects whenever possible. If a concept is common, transform it into a more differentiated version.\`;
    
    const response = await generateContentWithRetry(ai, {
      model: "gemini-3.1-flash-lite",
      input: prompt,
      response_format: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            pitch: { type: Type.STRING },
            problemStatement: { type: Type.STRING },
            proposedSolution: { type: Type.STRING },
            targetUsers: { type: Type.STRING },
            innovationExplanation: { type: Type.STRING },
            originalityScore: { type: Type.INTEGER },
            feasibilityScore: { type: Type.INTEGER },
            technicalDepthScore: { type: Type.INTEGER },
            academicValueScore: { type: Type.INTEGER },
            industryRelevanceScore: { type: Type.INTEGER },
            skillMatchScore: { type: Type.INTEGER },
            estimatedDuration: { type: Type.STRING },
            estimatedBudget: { type: Type.STRING },
            technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
            coreFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            advancedFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            aiMlComponents: { type: Type.STRING },
            whySuitable: { type: Type.STRING }
          },
          required: [
            "title", "pitch", "problemStatement", "proposedSolution", "targetUsers",
            "innovationExplanation", "originalityScore", "feasibilityScore", "technicalDepthScore",
            "academicValueScore", "industryRelevanceScore", "skillMatchScore", "estimatedDuration",
            "estimatedBudget", "technologies", "coreFeatures", "advancedFeatures", "aiMlComponents", "whySuitable"
          ]
        }
      }
    });

    if (!response || !response.text) {
      return res.status(502).json({ error: true, stage: "gemini", message: "Received empty response from Gemini API" });
    }

    res.status(200).json(JSON.parse(response.text!));
  } catch (error: any) {
    console.error(error);
    const statusCode = error.status === 'NOT_FOUND' ? 404 : 500;
    res.status(statusCode).json({ error: true, stage: "server", message: "Internal Server Error in /api/generate", details: error.message || error.toString() });
  }
}
`;
fs.writeFileSync(path.join(apiDir, 'generate.ts'), generateCode);

const healthCode = `export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    ok: true,
    service: "ideon-api",
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
}
`;
fs.writeFileSync(path.join(apiDir, 'health.ts'), healthCode);

// Optional: create evolve.ts and adapt.ts to ensure Vercel doesn't break other features!
const evolveCode = `import { getAi, generateContentWithRetry, Type } from './utils';
export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  try {
    const ai = getAi();
    const { project, feedback } = req.body;
    const prompt = \`You are an expert AI software architect and academic project evaluator. Evolve this student project concept based on the feedback... (mocked for brevity to fit script)\`; // Need exact prompt? Let's get it from server.ts
    // For now, I will extract it from server.ts in the next step to ensure accuracy.
  } catch(e) {}
}
`;
