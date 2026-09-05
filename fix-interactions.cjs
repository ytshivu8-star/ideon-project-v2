const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Update generateContentWithRetry to use interactions.create
const newRetry = `const generateContentWithRetry = async (ai: GoogleGenAI, options: any, maxRetries = 5) => {
    let retries = maxRetries;
    while (retries > 0) {
      try {
        const interaction = await ai.interactions.create(options);
        
        let fullOutput = "";
        for (const step of interaction.steps || []) {
          if (step.type === 'model_output') {
            const textContent = step.content?.find(c => c.type === 'text');
            if (textContent && textContent.text) {
              fullOutput += textContent.text;
            }
          }
        }
        
        return { text: fullOutput };
      } catch (error: any) {
        console.error("[GEMINI ERROR]:", error.message || error);
        const isUnavailable = error.status === 'UNAVAILABLE' || 
                              (error.message && (error.message.includes('503') || error.message.includes('429')));
        
        if (isUnavailable) {
          retries--;
          if (retries === 0) throw error;
          const delay = (maxRetries - retries) * 2000;
          console.log(\`[GEMINI RETRY] Retrying in \${delay}ms... (\${retries} retries left)\`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error;
        }
      }
    }
  };`;

content = content.replace(/const generateContentWithRetry = async [\s\S]*?    }\n  };\n/, newRetry + '\n');

// Now we need to update the options passed to it in the routes.
// Instead of `{ model, contents, config: { responseMimeType, responseSchema } }`
// We need `{ model, input, response_format }`

// Let's replace the route options one by one.
content = content.replace(
/const response = await generateContentWithRetry\(ai, {\n\s*model: "gemini-[^"]+",\n\s*contents: prompt,\n\s*config: {\n\s*responseMimeType: "application\/json",\n\s*responseSchema/g,
`const response = await generateContentWithRetry(ai, {
        model: "gemini-3.8-flash",
        input: prompt,
        response_format`
);

// We need to also handle `/api/mentor` which uses `contents: contents` array for chat history.
// And `/api/viva/question` which just has `contents: prompt` without config.

content = content.replace(
/const response = await generateContentWithRetry\(ai, {\n\s*model: "gemini-[^"]+",\n\s*contents: prompt\n\s*}\);/g,
`const response = await generateContentWithRetry(ai, {
        model: "gemini-3.8-flash",
        input: prompt
      });`
);

// For /api/mentor
// Let's just do a blanket replace for gemini-3.6-flash to gemini-3.8-flash first.
content = content.replace(/gemini-3\.6-flash/g, 'gemini-3.8-flash');

fs.writeFileSync('server.ts', content);
