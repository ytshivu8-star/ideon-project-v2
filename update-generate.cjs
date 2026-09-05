const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const generateBlockStart = content.indexOf('app.post("/api/generate"');
const generateBlockEnd = content.indexOf('  app.post("/api/evolve"');

if (generateBlockStart === -1 || generateBlockEnd === -1) {
  console.log("Could not find blocks");
  process.exit(1);
}

const replacement = `  app.get("/api/health", (req, res) => {
    res.json({
      ok: true,
      geminiConfigured: !!process.env.GEMINI_API_KEY
    });
  });

  app.post("/api/generate", async (req, res) => {
    try {
      console.error("[GENERATE] stage=environment - checking API key");
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: true,
          message: "GEMINI_API_KEY is not configured on the server",
          stage: "environment"
        });
      }

      console.error("[GENERATE] stage=environment - initializing Gemini SDK");
      const ai = getAi();
      
      console.error("[GENERATE] stage=request - parsing body");
      const studentDna = req.body;
      if (!studentDna || Object.keys(studentDna).length === 0) {
        return res.status(400).json({
          error: true,
          message: "Missing or empty request body (studentDna is required)",
          stage: "request"
        });
      }

      console.error("[GENERATE] stage=gemini - preparing prompt");
      const prompt = \`You are a final-year project architect, software engineer, AI/ML expert, innovation evaluator, research mentor, and university project guide.
Generate exactly 3 personalized final-year project concepts based on this student profile:
\${JSON.stringify(studentDna, null, 2)}
Avoid generic projects whenever possible (e.g., basic attendance systems, library management, weather apps, basic chat apps, e-commerce, face recognition attendance, hospital management). If a concept is common, transform it into a more differentiated version.\`;

      console.error("[GENERATE] stage=gemini - calling model gemini-2.5-flash");
      const response = await generateContentWithRetry(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
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
        }
      });
      
      console.error("[GENERATE] stage=parsing - checking response");
      if (!response || !response.text) {
        return res.status(502).json({
          error: true,
          message: "Received empty response from Gemini API",
          stage: "gemini",
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
          message: "Failed to parse JSON response from Gemini API",
          stage: "parsing",
          details: parseError.message
        });
      }

      console.error("[GENERATE] stage=server - sending successful response");
      res.json(parsedData);
    } catch (error: any) {
      console.error("[GENERATE] stage=server - caught exception:", error.message || error);
      res.status(500).json({ 
        error: true,
        message: "Internal Server Error in /api/generate",
        stage: "server",
        details: error.message || "Unknown error occurred" 
      });
    }
  });

`;

content = content.substring(0, generateBlockStart) + replacement + content.substring(generateBlockEnd);
fs.writeFileSync('server.ts', content);
console.log("Updated server.ts successfully");
