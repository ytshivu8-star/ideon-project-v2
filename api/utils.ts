import { GoogleGenAI, Type } from "@google/genai";

export const getAi = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY environment variable is required");
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

export const generateContentWithRetry = async (ai: GoogleGenAI, options: any, maxRetries = 3) => {
  let retries = maxRetries;
  while (retries > 0) {
    try {
      const interaction = await ai.interactions.create(options);
      
      let fullOutput = "";
      for (const step of interaction.steps || []) {
        if (step.type === 'model_output') {
          const textContent = step.content?.find((c: any) => c.type === 'text');
          if (textContent && (textContent as any).text) {
            fullOutput += (textContent as any).text;
          }
        }
      }
      
      return { text: fullOutput };
    } catch (error: any) {
      console.error("[GEMINI ERROR]:", error.message || error);
      
      if (error.message && error.message.toLowerCase().includes('quota')) {
        throw new Error("API Quota Exceeded: " + error.message);
      }

      const isUnavailable = error.status === 'UNAVAILABLE' || 
                            (error.message && (error.message.includes('503') || error.message.includes('429')));
      
      if (isUnavailable) {
        retries--;
        if (retries === 0) throw error;
        const delay = (maxRetries - retries) * 1500;
        console.log(`[GEMINI RETRY] Retrying in ${delay}ms... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

export { Type };
