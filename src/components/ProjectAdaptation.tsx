import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { ProjectConcept } from "../types";
import { adaptProject } from "../api";

export default function ProjectAdaptation({
  project,
  setSelectedProject,
}: {
  project: ProjectConcept;
  setSelectedProject: (p: ProjectConcept) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [customConstraint, setCustomConstraint] = useState("");
  const [adaptationData, setAdaptationData] = useState<any>(null);

  const predefinedConstraints = [
    "I only have 6 weeks",
    "My budget is ₹2,000",
    "My team has 5 members",
    "I don't know React",
    "I want more AI/ML",
    "I need a simpler version",
  ];

  const handleAdapt = async (constraint: string) => {
    if (!constraint.trim()) return;
    setLoading(true);
    setAdaptationData(null);
    try {
      const data = await adaptProject(project, constraint);
      setAdaptationData(data);
    } catch (e) {
      console.error(e);
      alert("Failed to adapt project");
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = () => {
    if (adaptationData && adaptationData.adaptedProject) {
      // Merge to keep full project structure for things not returned by partial schema
      setSelectedProject({
        ...project,
        ...adaptationData.adaptedProject,
      });
      setAdaptationData(null);
      setCustomConstraint("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">What If?</h2>
        <p className="text-neutral-500">Adapt your project to new constraints without losing its core identity.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Current Project</h3>
            <div className="text-xl font-bold mb-2">{project.title}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2 mt-4">
              <p><strong>Timeline:</strong> {project.estimatedDuration}</p>
              <p><strong>Budget:</strong> {project.estimatedBudget}</p>
              <p><strong>Tech:</strong> {project.technologies.slice(0,3).join(", ")}...</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Select a constraint:</h3>
            <div className="flex flex-wrap gap-2">
              {predefinedConstraints.map(c => (
                <button
                  key={c}
                  disabled={loading}
                  onClick={() => handleAdapt(c)}
                  className="px-4 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full font-medium transition-colors disabled:opacity-50"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Or type your own:</h3>
            <div className="flex gap-2">
              <input
                value={customConstraint}
                onChange={e => setCustomConstraint(e.target.value)}
                placeholder="e.g. I need to use Firebase instead of Postgres"
                className="flex-1 px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              />
              <button
                disabled={loading || !customConstraint.trim()}
                onClick={() => handleAdapt(customConstraint)}
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium disabled:opacity-50"
              >
                Adapt
              </button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-neutral-950/50 backdrop-blur-sm rounded-2xl z-10">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mb-4" />
              <p className="font-medium">Adapting architecture...</p>
            </div>
          )}
          
          {adaptationData && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 h-full flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-lg font-bold mb-4">Adaptation Results</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl">
                {adaptationData.explanation}
              </p>
              
              <div className="flex-1 space-y-6">
                <ComparisonRow label="Features" before={adaptationData?.before?.features || ""} after={adaptationData?.after?.features || ""} />
                <ComparisonRow label="Timeline" before={adaptationData?.before?.timeline || ""} after={adaptationData?.after?.timeline || ""} />
                <ComparisonRow label="Technology" before={adaptationData?.before?.technology || ""} after={adaptationData?.after?.technology || ""} />
                <ComparisonRow label="Complexity" before={adaptationData?.before?.complexity || ""} after={adaptationData?.after?.complexity || ""} />
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={handleAdopt}
                  className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Accept & Update Project
                </button>
              </div>
            </div>
          )}

          {!adaptationData && !loading && (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-400 text-sm font-medium">
              Select a constraint to see how the project adapts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ComparisonRow({ label, before, after }: { label: string; before: string; after: string }) {
  const changed = before !== after;
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">{label}</h4>
      <div className="flex items-start gap-3 text-sm">
        <div className={`flex-1 p-3 rounded-lg ${changed ? 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200 line-through opacity-70' : 'bg-neutral-50 dark:bg-neutral-800'}`}>
          {before}
        </div>
        {changed && <ArrowRight className="w-5 h-5 shrink-0 mt-3 text-neutral-300" />}
        {changed && (
          <div className="flex-1 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-200 font-medium">
            {after}
          </div>
        )}
      </div>
    </div>
  );
}
