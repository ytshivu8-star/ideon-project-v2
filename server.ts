import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
app.use(express.json());

// Wait for Gemini setup to lazy load if needed
const getAi = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  const generateContentWithRetry = async (ai: GoogleGenAI, options: any, maxRetries = 5) => {
    let retries = maxRetries;
    while (retries > 0) {
      try {
        return await ai.models.generateContent(options);
      } catch (error: any) {
        if (error.status === 'UNAVAILABLE' || error.message?.includes('503') || error.message?.includes('429')) {
          retries--;
          if (retries === 0) throw error;
          await new Promise(resolve => setTimeout(resolve, 4000));
        } else {
          throw error;
        }
      }
    }
  };

  app.post("/api/generate", async (req, res) => {
    try {
      const ai = getAi();
      const studentDna = req.body;
      
      if (!studentDna || Object.keys(studentDna).length === 0) {
        return res.status(400).json({ error: "Missing or empty request body (studentDna is required)" });
      }

      const prompt = `You are a final-year project architect, software engineer, AI/ML expert, innovation evaluator, research mentor, and university project guide.
Generate exactly 3 personalized final-year project concepts based on this student profile:
${JSON.stringify(studentDna, null, 2)}
Avoid generic projects whenever possible (e.g., basic attendance systems, library management, weather apps, basic chat apps, e-commerce, face recognition attendance, hospital management). If a concept is common, transform it into a more differentiated version.`;

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
                "estimatedBudget", "technologies", "coreFeatures", "advancedFeatures", "whySuitable"
              ]
            }
          }
        }
      });
      
      if (!response || !response.text) {
        console.error("Gemini API returned an empty or invalid response:", response);
        return res.status(502).json({ error: "Received empty response from Gemini API." });
      }

      let parsedData;
      try {
        parsedData = JSON.parse(response.text);
      } catch (parseError: any) {
        console.error("Failed to parse Gemini response as JSON:", response.text);
        return res.status(502).json({ error: "Failed to parse JSON response from Gemini API.", details: parseError.message });
      }

      res.json(parsedData);
    } catch (error: any) {
      console.error("Error in /api/generate:", error);
      res.status(500).json({ 
        error: "Internal Server Error in /api/generate", 
        details: error.message || "Unknown error occurred" 
      });
    }
  });

  app.post("/api/evolve", async (req, res) => {
    try {
      const ai = getAi();
      const { project } = req.body;
      const prompt = `You are a final-year project architect and innovation evaluator.
Analyze this proposed project:
${JSON.stringify(project, null, 2)}

Identify its weaknesses (e.g. too common, limited technical depth, low research novelty, existing solutions are widespread).
Then, evolve it into a significantly improved, highly differentiated project. Explain what changed (problem scope, technical approach, AI/ML component, architecture, research contribution, target users, evaluation methodology).`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
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
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/blueprint", async (req, res) => {
    try {
      const ai = getAi();
      const { project } = req.body;
      const prompt = `You are a project architect. Generate a complete practical blueprint for this project:
${JSON.stringify(project, null, 2)}

Provide sections for Project Overview, Features (core, advanced, future), Technology Stack, Database Design (entities/tables), Development Roadmap (break down into weeks/phases), Team Distribution (assuming team size constraints if any, or general), Risks & Mitigation, and Future Improvements.`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
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
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/adapt", async (req, res) => {
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
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
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
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/mentor", async (req, res) => {
    try {
      const ai = getAi();
      const { project, messages } = req.body;
      
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: `You are an AI technical mentor for a final-year student project.
You must answer specifically for the current project instead of giving generic answers.
Project Details:
${JSON.stringify(project, null, 2)}`,
        },
      });

      // Pass previous context except the last message, this is a bit tricky with chats API if we have history.
      // Easiest is just to generate a one-off with history embedded in prompt if we don't have chat history objects properly formatted.
      // But let's format history for the model.
      
      let contents = [];
      for (const msg of messages) {
         contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
      }

      const response = await generateContentWithRetry(ai, {
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `You are an AI technical mentor for a final-year student project.
You must answer specifically for the current project instead of giving generic answers.
Project Details:
${JSON.stringify(project, null, 2)}`,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/viva/question", async (req, res) => {
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
        model: "gemini-2.5-flash",
        contents: prompt
      });
      res.json({ question: response.text });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/viva/evaluate", async (req, res) => {
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
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
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
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  async function startServer() {
    const PORT = process.env.PORT || 3000;
    // Vite middleware for development
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  }

  if (!process.env.VERCEL) {
    startServer();
  }

  export default app;
