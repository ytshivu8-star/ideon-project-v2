import { StudentDna, ProjectConcept, EvolvedProjectData } from "./types";

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
