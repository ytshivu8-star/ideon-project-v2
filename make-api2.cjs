const fs = require('fs');
const path = require('path');
const server = fs.readFileSync('server.ts', 'utf8');

const apiDir = path.join(__dirname, 'api');
const vivaDir = path.join(apiDir, 'viva');

const routes = [
  { path: '/api/generate', file: 'generate.ts' },
  { path: '/api/evolve', file: 'evolve.ts' },
  { path: '/api/adapt', file: 'adapt.ts' },
  { path: '/api/mentor', file: 'mentor.ts' },
  { path: '/api/viva/question', file: 'viva/question.ts' },
  { path: '/api/viva/evaluate', file: 'viva/evaluate.ts' },
];

for (const route of routes) {
  // Find the exact app.post block
  const startStr = `app.post("${route.path}", async (req, res) => {`;
  const startIdx = server.indexOf(startStr);
  if (startIdx === -1) {
    console.log("NOT FOUND", route.path);
    continue;
  }
  
  // Extract everything from `try {` until the matching `});`
  // We can do this by counting braces
  let braceCount = 0;
  let blockStart = server.indexOf('{', startIdx) + 1; // After the `{` of `(req, res) => {`
  let blockEnd = blockStart;
  braceCount = 1;

  for (let i = blockStart; i < server.length; i++) {
    if (server[i] === '{') braceCount++;
    if (server[i] === '}') braceCount--;
    
    if (braceCount === 0) {
      blockEnd = i;
      break;
    }
  }

  const block = server.substring(blockStart, blockEnd).trim();

  const depth = route.file.split('/').length - 1;
  const utilsImportPath = depth === 0 ? './utils' : '../utils';
  
  const template = `import { getAi, generateContentWithRetry, Type } from '${utilsImportPath}';

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

  ${block}
}
`;
  fs.writeFileSync(path.join(apiDir, route.file), template);
  console.log("Wrote", route.file);
}
