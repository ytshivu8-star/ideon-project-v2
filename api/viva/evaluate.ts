import { getAi, generateContentWithRetry, Type } from '../utils';

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
      const { project, question, answer } = req.body;
      const prompt = `You are a university project examiner.
The student is presenting this project:
${JSON.stringify(project)}

You asked: "${question}"
The student answered: "${answer}"

Evaluate the answer and provide:
- technicalAccuracy (0-10)
- clarity (0-10)
- depth (0-10)
- goodPoints
- missingPoints
- betterAnswer
- followUpQuestion

Format as JSON.`;
      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.1-flash-lite",
        input: prompt,
        response_format: {
            type: Type.OBJECT,
            properties: {
              technicalAccuracy: { type: Type.INTEGER },
              clarity: { type: Type.INTEGER },
              depth: { type: Type.INTEGER },
              goodPoints: { type: Type.STRING },
              missingPoints: { type: Type.STRING },
              betterAnswer: { type: Type.STRING },
              followUpQuestion: { type: Type.STRING }
            }
          }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}
