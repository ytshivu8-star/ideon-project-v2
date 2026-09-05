import { useState } from "react";
import { Loader2, ArrowRight, TrendingUp } from "lucide-react";
import { ViewState } from "../App";
import { ProjectConcept, EvolvedProjectData } from "../types";
import { evolveProject } from "../api";

export default function ProjectEvolution({
  project,
  evolvedData,
  setEvolvedData,
  navigate,
  setSelectedProject,
}: {
  project: ProjectConcept;
  evolvedData: EvolvedProjectData | null;
  setEvolvedData: (d: EvolvedProjectData) => void;
  navigate: (v: ViewState) => void;
  setSelectedProject: (p: ProjectConcept) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleEvolve = async () => {
    setLoading(true);
    try {
      const data = await evolveProject(project);
      setEvolvedData(data);
    } catch (e) {
      console.error(e);
      alert("Failed to evolve project");
    } finally {
      setLoading(false);
    }
  };

  const handleAdoptEvolved = () => {
    if (evolvedData) {
      setSelectedProject(evolvedData.evolvedProject);
      navigate("blueprint");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Project Evolution</h2>
        <p className="text-neutral-500">Analyze and transform your idea into a highly differentiated project.</p>
      </div>

      <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Original Idea</h3>
        <div className="text-xl font-bold mb-2">{project.title}</div>
        <p className="text-neutral-600 dark:text-neutral-400">{project.problemStatement}</p>
        <div className="mt-4 inline-flex items-center px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm font-medium">
          Originality Score: {project.originalityScore}
        </div>
      </div>

      {!evolvedData && (
        <div className="flex justify-center py-8">
          <button
            onClick={handleEvolve}
            disabled={loading}
            className="flex items-center px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <TrendingUp className="w-5 h-5 mr-2" />
            )}
            {loading ? "Evolving Idea..." : "Run DNA Analysis & Evolve"}
          </button>
        </div>
      )}

      {evolvedData && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="p-6 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">Project IDEON Analysis</h3>
            <ul className="space-y-2">
              {(evolvedData?.weaknesses || []).map((w, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-sm font-medium text-red-900 dark:text-red-300">{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-neutral-300 rotate-90" />
          </div>

          <div className="p-8 bg-black text-white dark:bg-white dark:text-black rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingUp className="w-32 h-32" />
            </div>
            
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center">
              <span className="text-xl mr-2">🧬</span> Evolved Project
            </h3>
            
            <div className="text-2xl font-bold mb-4">{evolvedData?.evolvedProject?.title || "Untitled"}</div>
            <p className="text-neutral-300 dark:text-neutral-700 font-medium mb-6 leading-relaxed">
              {evolvedData?.evolvedProject?.pitch || ""}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-bold text-neutral-400 mb-2">Originality Jump</h4>
                <div className="flex items-end space-x-3">
                  <span className="text-2xl font-medium text-neutral-500 line-through">{evolvedData?.originalityBefore || "0/10"}</span>
                  <ArrowRight className="w-5 h-5 text-neutral-500 mb-1" />
                  <span className="text-4xl font-black text-green-400">{evolvedData?.originalityAfter || "10/10"}</span>
                </div>
              </div>
            </div>

            <h4 className="text-sm font-bold text-neutral-400 mb-4">What Changed?</h4>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {Object.entries(evolvedData?.changes || {}).map(([key, value]) => (
                <div key={key} className="bg-neutral-900 dark:bg-neutral-100 p-4 rounded-xl">
                  <span className="text-xs uppercase tracking-wider font-bold text-neutral-500 block mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm">{value as string}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleAdoptEvolved}
              className="w-full py-4 bg-white text-black dark:bg-black dark:text-white rounded-xl font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              Build This Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
