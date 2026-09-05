const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Use gemini-3.1-flash-lite instead of 3.8-flash
content = content.replace(/gemini-3\.8-flash/g, 'gemini-3.1-flash-lite');

// Update retry logic to not retry on quota exceeded
const newRetry = `const generateContentWithRetry = async (ai: GoogleGenAI, options: any, maxRetries = 3) => {
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
        
        // Don't retry if quota exceeded
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
  };`;

content = content.replace(/const generateContentWithRetry = async [\s\S]*?    }\n  };\n/, newRetry + '\n');

fs.writeFileSync('server.ts', content);
