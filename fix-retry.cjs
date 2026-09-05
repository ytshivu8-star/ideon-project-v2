const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Replace model versions to gemini-3.6-flash everywhere
content = content.replace(/gemini-3\.7-flash/g, 'gemini-3.6-flash');

// Update retry logic
const newRetry = `const generateContentWithRetry = async (ai: GoogleGenAI, options: any, maxRetries = 5) => {
    let retries = maxRetries;
    while (retries > 0) {
      try {
        return await ai.models.generateContent(options);
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

fs.writeFileSync('server.ts', content);
