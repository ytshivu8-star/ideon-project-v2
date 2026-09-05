const fs = require('fs');
const path = require('path');
const server = fs.readFileSync('server.ts', 'utf8');

const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir);
const vivaDir = path.join(apiDir, 'viva');
if (!fs.existsSync(vivaDir)) fs.mkdirSync(vivaDir);

const routes = [
  { path: '/api/generate', file: 'generate.ts' },
  { path: '/api/evolve', file: 'evolve.ts' },
  { path: '/api/adapt', file: 'adapt.ts' },
  { path: '/api/mentor', file: 'mentor.ts' },
  { path: '/api/viva/question', file: 'viva/question.ts' },
  { path: '/api/viva/evaluate', file: 'viva/evaluate.ts' },
];

for (const route of routes) {
  const startIdx = server.indexOf(`app.post("${route.path}",`);
  if (startIdx === -1) {
    console.log("NOT FOUND", route.path);
    continue;
  }
  
  // Find the exact block
  const tryStart = server.indexOf('try {', startIdx);
  let catchEnd = server.indexOf('} catch (error: any)', tryStart);
  
  // Find the end of the catch block
  let blockEnd = server.indexOf('  });', catchEnd);
  
  let block = server.substring(tryStart, blockEnd);

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
