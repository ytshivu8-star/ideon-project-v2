const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const importStatement = `import generateHandler from "./api/generate.js";\nimport healthHandler from "./api/health.js";\n`;
if (!content.includes('generateHandler')) {
   content = content.replace('const app = express();', importStatement + 'const app = express();');
}

const routeBindings = `
  app.get("/api/health", (req, res) => healthHandler(req, res));
  app.post("/api/generate", (req, res) => generateHandler(req, res));
`;

if (!content.includes('app.post("/api/generate"')) {
   // insert before app.post("/api/evolve"
   content = content.replace('  app.post("/api/evolve"', routeBindings + '  app.post("/api/evolve"');
   fs.writeFileSync('server.ts', content);
   console.log('Restored local routes via handlers');
}
