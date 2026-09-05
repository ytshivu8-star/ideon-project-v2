const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// The replacement was:
// response_format: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { ... } } } } });
// Let's just fix it automatically using regex to remove the extra closing brace before `});`

// Replace `        }\n      });` with `      });`
content = content.replace(/        }\n      \}\);\n/g, '      });\n');
content = content.replace(/          \}\n        \}\n      \}\);\n/g, '        }\n      });\n');

fs.writeFileSync('server.ts', content);
