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
      console.log("[GENERATE] Checking API key");
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: true, stage: "environment", message: "GEMINI_API_KEY is missing." });
      }

      console.log("[GENERATE] Initializing Gemini");
      const ai = getAi();
      const studentDna = req.body;
      
      if (!studentDna || Object.keys(studentDna).length === 0) {
        return res.status(400).json({ error: true, stage: "request", message: "Missing request body" });
      }

      const prompt = `You are a final-year project architect, software engineer, AI/ML expert, innovation evaluator, research mentor, and university project guide.
Generate exactly 3 personalized final-year project concepts based on this student profile:
${JSON.stringify(studentDna, null, 2)}
Avoid generic projects whenever possible. If a concept is common, transform it into a more differentiated version.`;

      console.log("[GENERATE] Calling Gemini");
      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.1-flash-lite",
        input: prompt,
        response_format: {
            type: Type.ARRAY,
            items: {
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
              required: [
                "title", "pitch", "problemStatement", "proposedSolution", "targetUsers",
                "innovationExplanation", "originalityScore", "feasibilityScore", "technicalDepthScore",
                "academicValueScore", "industryRelevanceScore", "skillMatchScore", "estimatedDuration",
                "estimatedBudget", "technologies", "coreFeatures", "advancedFeatures", "aiMlComponents", "whySuitable"
              ]
            }
          }
      });
      
      console.log("[GENERATE] Parsing response");
      if (!response || !response.text) {
        return res.status(502).json({ error: true, stage: "gemini", message: "Received empty response from Gemini API" });
      }

      let parsedData;
      try {
        parsedData = JSON.parse(response.text);
      } catch (parseError) {
        return res.status(502).json({ error: true, stage: "parsing", message: "Failed to parse JSON response", details: parseError.message });
      }

      res.json(parsedData);
    } catch (error) {
      console.error("[GENERATE] Server Error:", error);
      res.status(500).json({ error: true, stage: "server", message: "Internal Server Error in /api/generate", details: error.message });
    }
}
