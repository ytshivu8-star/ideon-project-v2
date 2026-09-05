import { StudentDna, ProjectConcept, EvolvedProjectData } from "./types";

export async function generateProjects(dna: StudentDna): Promise<ProjectConcept[]> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dna),
  });
  if (!res.ok) throw new Error("Failed to generate projects");
  return res.json();
}

export async function evolveProject(project: ProjectConcept): Promise<EvolvedProjectData> {
  const res = await fetch("/api/evolve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project }),
  });
  if (!res.ok) throw new Error("Failed to evolve project");
  return res.json();
}

export async function generateBlueprint(project: ProjectConcept): Promise<any> {
  const res = await fetch("/api/blueprint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project }),
  });
  if (!res.ok) throw new Error("Failed to generate blueprint");
  return res.json();
}

export async function adaptProject(project: ProjectConcept, constraint: string): Promise<any> {
  const res = await fetch("/api/adapt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, constraint }),
  });
  if (!res.ok) throw new Error("Failed to adapt project");
  return res.json();
}

export async function askMentor(project: ProjectConcept, messages: any[]): Promise<any> {
  const res = await fetch("/api/mentor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, messages }),
  });
  if (!res.ok) throw new Error("Failed to get mentor response");
  return res.json();
}

export async function getVivaQuestion(project: ProjectConcept, history: any[]): Promise<any> {
  const res = await fetch("/api/viva/question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, history }),
  });
  if (!res.ok) throw new Error("Failed to get viva question");
  return res.json();
}

export async function evaluateVivaAnswer(project: ProjectConcept, question: string, answer: string): Promise<any> {
  const res = await fetch("/api/viva/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, question, answer }),
  });
  if (!res.ok) throw new Error("Failed to evaluate viva answer");
  return res.json();
}
