const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const mentorRouteStart = content.indexOf('app.post("/api/mentor"');
const vivaRouteStart = content.indexOf('app.post("/api/viva/question"');

const newMentor = `  app.post("/api/mentor", async (req, res) => {
    try {
      const ai = getAi();
      const { project, messages } = req.body;
      
      let inputString = "Chat History:\\n";
      for (const msg of messages) {
         inputString += \`\${msg.role}: \${msg.text}\\n\`;
      }
      inputString += "\\nBased on the above history, please respond to the last user message as the AI mentor.";
      
      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.8-flash",
        input: inputString,
        system_instruction: \`You are an AI technical mentor for a final-year student project.You must answer specifically for the current project instead of giving generic answers.Project Details:\${JSON.stringify(project, null, 2)}\`
      });
      
      res.json({ text: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });\n\n`;

content = content.substring(0, mentorRouteStart) + newMentor + content.substring(vivaRouteStart);
fs.writeFileSync('server.ts', content);
