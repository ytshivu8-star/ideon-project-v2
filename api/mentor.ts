import { getAi, generateContentWithRetry, Type } from './utils.js';

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

  try {
      const ai = getAi();
      const { project, messages } = req.body;
      
      let inputString = "Chat History:\n";
      for (const msg of messages) {
         inputString += `${msg.role}: ${msg.text}\n`;
      }
      inputString += "\nBased on the above history, please respond to the last user message as the AI mentor.";
      
      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.1-flash-lite",
        input: inputString,
        system_instruction: `You are an AI technical mentor for a final-year student project.You must answer specifically for the current project instead of giving generic answers.Project Details:${JSON.stringify(project, null, 2)}`
      });
      
      res.json({ text: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}
