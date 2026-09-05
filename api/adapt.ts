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
      const { project, constraint } = req.body;
      const prompt = `You are an agile project manager and architect.
Adapt the following project to a new constraint: "${constraint}".
The project identity must remain consistent, do not regenerate an unrelated project.
Project:
${JSON.stringify(project, null, 2)}

Provide the Before and After for Features, Timeline, Technology, and Complexity, and explain what was removed, added, or changed. Then provide the adapted project object.`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.1-flash-lite",
        input: prompt,
        response_format: {
            type: Type.OBJECT,
            properties: {
              explanation: { type: Type.STRING },
              before: {
                type: Type.OBJECT,
                properties: {
                  features: { type: Type.STRING },
                  timeline: { type: Type.STRING },
                  technology: { type: Type.STRING },
                  complexity: { type: Type.STRING }
                }
              },
              after: {
                type: Type.OBJECT,
                properties: {
                  features: { type: Type.STRING },
                  timeline: { type: Type.STRING },
                  technology: { type: Type.STRING },
                  complexity: { type: Type.STRING }
                }
              },
              adaptedProject: {
                type: Type.OBJECT,
                // Partial definition matching the main project, enough to render
                properties: {
                  title: { type: Type.STRING },
                  pitch: { type: Type.STRING },
                  problemStatement: { type: Type.STRING },
                  proposedSolution: { type: Type.STRING },
                  technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  coreFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
                  estimatedDuration: { type: Type.STRING },
                  estimatedBudget: { type: Type.STRING },
                }
              }
            }
          }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}
