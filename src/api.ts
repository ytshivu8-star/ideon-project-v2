import { StudentDna, ProjectConcept, EvolvedProjectData } from "./types";

/**
 * Generates personalized project concepts based on student DNA.
 * @param {StudentDna} dna - The student's skills, interests, and constraints.
 * @returns {Promise<ProjectConcept[]>} Array of generated project concepts.
 */
export async function generateProjects(dna: StudentDna): Promise<ProjectConcept[]> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dna),
  });
  if (!res.ok) {
    let errorMessage = "Failed to generate projects";
    try {
      if (res.status === 404) { 
        errorMessage = "API route not found (404). Vercel serverless function may be missing.";
      }
      const errorData = await res.json();
      if (errorData.message) {
         errorMessage = `${errorData.stage ? `[${errorData.stage.toUpperCase()}] ` : ''}${errorData.message}`;
         if (errorData.details) {
            errorMessage += ` | ${errorData.details}`;
         }
      }
    } catch(e) {
      if (res.status !== 404) errorMessage += ` (${res.status} ${res.statusText})`;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

/**
 * Evolves a generic project concept into a more differentiated solution.
 * @param {ProjectConcept} project - The initial project concept.
 * @returns {Promise<EvolvedProjectData>} The evolved project data.
 */
export async function evolveProject(project: ProjectConcept): Promise<EvolvedProjectData> {
  const res = await fetch("/api/evolve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project }),
  });
  if (!res.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch(e) {
      errorMessage += ` (${res.status})`;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

/**
 * Generates a structured blueprint for a selected project.
 * @param {ProjectConcept} project - The selected project.
 * @returns {Promise<any>} The project blueprint containing architecture and roadmap.
 */
export async function generateBlueprint(project: ProjectConcept): Promise<any> {
  const res = await fetch("/api/blueprint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project }),
  });
  if (!res.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch(e) {
      errorMessage += ` (${res.status})`;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

/**
 * Adapts a project based on a new constraint (e.g., shorter timeline).
 * @param {ProjectConcept} project - The current project.
 * @param {string} constraint - The new constraint to apply.
 * @returns {Promise<any>} The adapted project and explanation.
 */
export async function adaptProject(project: ProjectConcept, constraint: string): Promise<any> {
  const res = await fetch("/api/adapt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, constraint }),
  });
  if (!res.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch(e) {
      errorMessage += ` (${res.status})`;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

/**
 * Asks the AI mentor a question about the project.
 * @param {ProjectConcept} project - The active project context.
 * @param {any[]} messages - The chat history.
 * @returns {Promise<any>} The mentor's response text.
 */
export async function askMentor(project: ProjectConcept, messages: any[]): Promise<any> {
  const res = await fetch("/api/mentor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, messages }),
  });
  if (!res.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch(e) {
      errorMessage += ` (${res.status})`;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

/**
 * Generates a new viva examination question based on project context and history.
 * @param {ProjectConcept} project - The project being defended.
 * @param {any[]} history - Previous questions and answers.
 * @returns {Promise<any>} The generated question.
 */
export async function getVivaQuestion(project: ProjectConcept, history: any[]): Promise<any> {
  const res = await fetch("/api/viva/question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, history }),
  });
  if (!res.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch(e) {
      errorMessage += ` (${res.status})`;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

/**
 * Evaluates the student's answer to a viva question.
 * @param {ProjectConcept} project - The project being defended.
 * @param {string} question - The question asked.
 * @param {string} answer - The student's answer.
 * @returns {Promise<any>} The evaluation containing scores, good points, and follow-up question.
 */
export async function evaluateVivaAnswer(project: ProjectConcept, question: string, answer: string): Promise<any> {
  const res = await fetch("/api/viva/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, question, answer }),
  });
  if (!res.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await res.json();
      if (errorData.message) errorMessage = errorData.message;
    } catch(e) {
      errorMessage += ` (${res.status})`;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}
