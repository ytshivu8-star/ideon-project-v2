import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: true, stage: "request", message: "Method not allowed" });
  }

  try {
    console.error("[GENERATE] stage=environment - checking API key");
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(500).json({
        error: true,
        stage: "environment",
        message: "GEMINI_API_KEY is not configured on the server",
      });
    }

    console.error("[GENERATE] stage=request - parsing body");
    let studentDna = req.body;
    if (typeof req.body === 'string') {
      try {
        studentDna = JSON.parse(req.body);
      } catch (e: any) {
         console.error("[GENERATE] stage=request - JSON parse error:", e.message);
         return res.status(400).json({
            error: true,
            stage: "request",
            message: "Failed to parse request body as JSON"
         });
      }
    }

    if (!studentDna || Object.keys(studentDna).length === 0) {
      console.error("[GENERATE] stage=request - Missing or empty request body");
      return res.status(400).json({
        error: true,
        stage: "request",
        message: "Missing or empty request body (studentDna is required)"
      });
    }

    console.error("[GENERATE] stage=gemini - initializing SDK");
    const ai = new GoogleGenAI({ apiKey: key });

    const prompt = `You are a final-year project architect, software engineer, AI/ML expert, innovation evaluator, research mentor, and university project guide.
Generate exactly 3 personalized final-year project concepts based on this student profile:
${JSON.stringify(studentDna, null, 2)}
Avoid generic projects whenever possible (e.g., basic attendance systems, library management, weather apps, basic chat apps, e-commerce, face recognition attendance, hospital management). If a concept is common, transform it into a more differentiated version.`;

    console.error("[GENERATE] stage=gemini - calling model gemini-2.5-flash");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  pitch: { type: Type.STRING },
                  problemStatement: { type: Type.STRING },
                  proposedSolution: { type: Type.STRING },
                  targetUsers: { type: Type.ARRAY, items: { type: Type.STRING } },
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
                  whySuitable: { type: Type.STRING }
                },
                required: [
                  "title", "pitch", "problemStatement", "proposedSolution", "targetUsers",
                  "innovationExplanation", "originalityScore", "feasibilityScore", "technicalDepthScore",
                  "academicValueScore", "industryRelevanceScore", "skillMatchScore", "estimatedDuration",
                  "estimatedBudget", "technologies", "coreFeatures", "advancedFeatures", "whySuitable"
                ]
              }
            }
          },
          required: ["projects"]
        }
      }
    });

    console.error("[GENERATE] stage=parsing - checking response");
    if (!response || !response.text) {
      console.error("[GENERATE] stage=gemini - empty response text");
      return res.status(502).json({
        error: true,
        stage: "gemini",
        message: "Received empty response from Gemini API.",
        details: "Response object or response.text was falsy"
      });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(response.text);
    } catch (parseError: any) {
      console.error("[GENERATE] stage=parsing - JSON error:", parseError.message);
      return res.status(502).json({
        error: true,
        stage: "parsing",
        message: "Failed to parse JSON response from Gemini API.",
        details: parseError.message
      });
    }

    console.error("[GENERATE] stage=server - sending successful response");
    // Depending on what frontend expects, maybe it expects an array directly.
    res.status(200).json(parsedData.projects || parsedData);
  } catch (error: any) {
    console.error("[GENERATE] stage=server - caught exception:", error.message || error);
    return res.status(500).json({
      error: true,
      stage: "server",
      message: "Internal Server Error in /api/generate",
      details: error.message || String(error)
    });
  }
}
