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
      const prompt = `You are a final-year project architect and innovation evaluator.
Analyze this proposed project:
${JSON.stringify(project, null, 2)}

Identify its weaknesses (e.g. too common, limited technical depth, low research novelty, existing solutions are widespread).
Then, evolve it into a significantly improved, highly differentiated project. Explain what changed (problem scope, technical approach, AI/ML component, architecture, research contribution, target users, evaluation methodology).`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.1-flash-lite",
        input: prompt,
        response_format: {
            type: Type.OBJECT,
            properties: {
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              originalityBefore: { type: Type.INTEGER },
              originalityAfter: { type: Type.INTEGER },
              changes: {
                type: Type.OBJECT,
                properties: {
                  problemScope: { type: Type.STRING },
                  technicalApproach: { type: Type.STRING },
                  aiMlComponent: { type: Type.STRING },
                  architecture: { type: Type.STRING },
                  researchContribution: { type: Type.STRING },
                  targetUsers: { type: Type.STRING },
                  evaluationMethodology: { type: Type.STRING }
                },
                required: ["problemScope", "technicalApproach", "aiMlComponent", "architecture", "researchContribution", "targetUsers", "evaluationMethodology"]
              },
              evolvedProject: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  pitch: { type: Type.STRING },
                  problemStatement: { type: Type.STRING },
                  proposedSolution: { type: Type.STRING },
                  targetUsers: { type: Type.STRING },
                  innovationExplanation: { type: Type.STRING },
                  originalityScore: { type: Type.INTEGER },
                  feasibilityScore: { type: Type.INTEGER },
                  technicalDepthScore: { type: Type.INTEGER },
                  academicValueScore: { type: Type.INTEGER },
                  industryRelevanceScore: { type: Type.INTEGER },
                  skillMatchScore: { type: Type.INTEGER },
                  estimatedDuration: { type: Type.STRING },
                  estimatedBudget: { type: Type.STRING },
                  technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  coreFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
                  advancedFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
                  aiMlComponents: { type: Type.STRING },
                  whySuitable: { type: Type.STRING }
                },
                required: ["title", "pitch", "problemStatement", "proposedSolution", "targetUsers", "innovationExplanation", "originalityScore", "feasibilityScore", "technicalDepthScore", "academicValueScore", "industryRelevanceScore", "skillMatchScore", "estimatedDuration", "estimatedBudget", "technologies", "coreFeatures", "advancedFeatures", "aiMlComponents", "whySuitable"]
              }
            },
            required: ["weaknesses", "originalityBefore", "originalityAfter", "changes", "evolvedProject"]
          }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
}
