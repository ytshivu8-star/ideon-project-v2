import { ViewState } from "../App";
import { ProjectConcept } from "../types";

export default function ProjectDiscovery({
  projects,
  navigate,
  setSelectedProject,
  setEvolvedData,
}: {
  projects: ProjectConcept[];
  navigate: (v: ViewState) => void;
  setSelectedProject: (p: ProjectConcept) => void;
  setEvolvedData: (d: null) => void;
}) {
  const handleSelect = (project: ProjectConcept, action: 'blueprint' | 'evolution') => {
    setSelectedProject(project);
    setEvolvedData(null); // Reset evolution data when selecting a new project
    navigate(action);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Discovered Projects</h2>
        <p className="text-neutral-500">Based on your DNA, we engineered these specific project concepts.</p>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {projects.map((project, idx) => {
          const overall = Math.round(
            (project.originalityScore +
              project.feasibilityScore +
              project.technicalDepthScore +
              project.academicValueScore +
              project.industryRelevanceScore +
              project.skillMatchScore) /
              6
          );

          return (
            <div
              key={idx}
              className="flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full shrink-0">
                    <span className="text-sm font-bold">{overall}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-6">
                  {project.pitch}
                </p>

                <div className="space-y-4">
                  <ScoreBar label="Originality" score={project.originalityScore} />
                  <ScoreBar label="Feasibility" score={project.feasibilityScore} />
                  <ScoreBar label="Technical Depth" score={project.technicalDepthScore} />
                  <ScoreBar label="Academic Value" score={project.academicValueScore} />
                  <ScoreBar label="Industry Value" score={project.industryRelevanceScore} />
                  <ScoreBar label="Skill Match" score={project.skillMatchScore} />
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {(project.technologies || []).slice(0, 4).map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md font-medium text-neutral-600 dark:text-neutral-300">
                      {t}
                    </span>
                  ))}
                  {(project.technologies || []).length > 4 && (
                    <span className="text-xs px-2 py-1 text-neutral-400">+{(project.technologies || []).length - 4} more</span>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex gap-3">
                <button
                  onClick={() => handleSelect(project, 'evolution')}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                >
                  Evolve Idea
                </button>
                <button
                  onClick={() => handleSelect(project, 'blueprint')}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity"
                >
                  Build Blueprint
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  // Color logic based on score
  let colorClass = "bg-green-500";
  if (score < 50) colorClass = "bg-red-500";
  else if (score < 75) colorClass = "bg-yellow-500";

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-neutral-500">{label}</span>
        <span className="font-bold">{score}</span>
      </div>
      <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
