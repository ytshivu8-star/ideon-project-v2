const fs = require('fs');
let content = fs.readFileSync('src/api.ts', 'utf8');

content = content.replace(
  /export async function generateProjects[\s\S]*?return res\.json\(\);\n}/,
  `export async function generateProjects(dna: StudentDna): Promise<ProjectConcept[]> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dna),
  });
  if (!res.ok) {
    let errorMessage = "Failed to generate projects";
    try {
      const errorData = await res.json();
      if (errorData.message) {
         errorMessage = \`Generation failed: \${errorData.message}\`;
         if (errorData.stage) {
            errorMessage = \`Generation failed at \${errorData.stage} stage: \${errorData.message}\`;
         }
      }
    } catch(e) {}
    throw new Error(errorMessage);
  }
  return res.json();
}`
);

fs.writeFileSync('src/api.ts', content);
