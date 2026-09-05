import { getAi, generateContentWithRetry, Type } from '../utils.js';

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
      const { project, history } = req.body;
      const prompt = `You are a university project examiner.
The student is presenting this project:
${JSON.stringify(project, null, 2)}

Based on the viva history (if any), ask ONE new relevant question covering Problem statement, Motivation, Architecture, Technology choices, Algorithms, Dataset, AI/ML methodology, Security, Scalability, Limitations, or Future work.
Do not evaluate yet, just ask the question. Make it sound like a strict but fair professor.

History:
${JSON.stringify(history, null, 2)}
`;
      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.1-flash-lite",
        input: prompt
      });
      res.json({ question: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}
