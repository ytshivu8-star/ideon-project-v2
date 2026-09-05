const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const healthBlockStart = content.indexOf('  app.get("/api/health"');
const generateBlockStart = content.indexOf('  app.post("/api/generate"');
const evolveBlockStart = content.indexOf('  app.post("/api/evolve"');

if (healthBlockStart !== -1 && evolveBlockStart !== -1) {
   content = content.substring(0, healthBlockStart) + content.substring(evolveBlockStart);
   fs.writeFileSync('server.ts', content);
   console.log('Removed health and generate from server.ts');
} else {
   console.log('Could not find blocks', healthBlockStart, generateBlockStart, evolveBlockStart);
}
