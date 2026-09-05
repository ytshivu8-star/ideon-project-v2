import { getAi, generateContentWithRetry, Type } from './utils';

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
      const { project } = req.body;
      const prompt = `You are a project architect. Generate a complete practical blueprint for this project:
${JSON.stringify(project, null, 2)}

Provide sections for Project Overview, Features (core, advanced, future), Technology Stack, Database Design (entities/tables), Development Roadmap (break down into weeks/phases), Team Distribution (assuming team size constraints if any, or general), Risks & Mitigation, and Future Improvements.`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.1-flash-lite",
        input: prompt,
        response_format: {
            type: Type.OBJECT,
            properties: {
              overview: {
                type: Type.OBJECT,
                properties: {
                  problem: { type: Type.STRING },
                  solution: { type: Type.STRING },
                  targetUsers: { type: Type.STRING },
                  objectives: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["problem", "solution", "targetUsers", "objectives"]
              },
              features: {
                type: Type.OBJECT,
                properties: {
                  core: { type: Type.ARRAY, items: { type: Type.STRING } },
                  advanced: { type: Type.ARRAY, items: { type: Type.STRING } },
                  future: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["core", "advanced", "future"]
              },
              techStack: {
                type: Type.OBJECT,
                properties: {
                  frontend: { type: Type.ARRAY, items: { type: Type.STRING } },
                  backend: { type: Type.ARRAY, items: { type: Type.STRING } },
                  database: { type: Type.ARRAY, items: { type: Type.STRING } },
                  aiMl: { type: Type.ARRAY, items: { type: Type.STRING } },
                  apis: { type: Type.ARRAY, items: { type: Type.STRING } },
                  deployment: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["frontend", "backend", "database", "aiMl", "apis", "deployment"]
              },
              databaseDesign: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    entity: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                }
              },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              },
              teamDistribution: { type: Type.ARRAY, items: { type: Type.STRING } },
              risks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    risk: { type: Type.STRING },
                    mitigation: { type: Type.STRING }
                  }
                }
              },
              futureImprovements: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["overview", "features", "techStack", "databaseDesign", "roadmap", "teamDistribution", "risks", "futureImprovements"]
          }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}
