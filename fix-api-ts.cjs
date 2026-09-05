const fs = require('fs');
let apiTs = fs.readFileSync('src/api.ts', 'utf8');

const replacement = `  if (!res.ok) {
    let errorMessage = "Failed to generate projects";
    try {
      if (res.status === 404) {
         errorMessage = "API route not found (404). Vercel serverless function may be missing.";
      }
      const errorData = await res.json();
      if (errorData.message) {
         errorMessage = \`\${errorData.stage ? \`[\${errorData.stage.toUpperCase()}] \` : ''}\${errorData.message}\`;
         if (errorData.details) {
            errorMessage += \` | \${errorData.details}\`;
         }
      }
    } catch(e) {
      if (res.status !== 404) errorMessage += \` (\${res.status} \${res.statusText})\`;
    }
    throw new Error(errorMessage);
  }`;

apiTs = apiTs.replace(/  if \(!res\.ok\) \{\n    let errorMessage[\s\S]*?throw new Error\(errorMessage\);\n  \}/, replacement);

// Optional: fix the others too!
const genericReplace = `  if (!res.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch(e) {
      errorMessage += \` (\${res.status})\`;
    }
    throw new Error(errorMessage);
  }`;

apiTs = apiTs.replace(/  if \(!res\.ok\) throw new Error\("Failed to evolve project"\);/g, genericReplace);
apiTs = apiTs.replace(/  if \(!res\.ok\) throw new Error\("Failed to generate blueprint"\);/g, genericReplace);
apiTs = apiTs.replace(/  if \(!res\.ok\) throw new Error\("Failed to adapt project"\);/g, genericReplace);
apiTs = apiTs.replace(/  if \(!res\.ok\) throw new Error\("Failed to get mentor response"\);/g, genericReplace);
apiTs = apiTs.replace(/  if \(!res\.ok\) throw new Error\("Failed to get viva question"\);/g, genericReplace);
apiTs = apiTs.replace(/  if \(!res\.ok\) throw new Error\("Failed to evaluate viva answer"\);/g, genericReplace);

fs.writeFileSync('src/api.ts', apiTs);
