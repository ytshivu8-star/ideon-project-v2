import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ProjectConcept } from "../types";
import { generateBlueprint } from "../api";

export default function ProjectBlueprint({
  project,
  blueprint,
  setBlueprint,
}: {
  project: ProjectConcept;
  blueprint: any;
  setBlueprint: (b: any) => void;
}) {
  const [loading, setLoading] = useState(!blueprint);

  useEffect(() => {
    if (!blueprint) {
      generateBlueprint(project)
        .then((b) => setBlueprint(b))
        .catch((e) => {
          console.error(e);
          alert("Failed to generate blueprint");
        })
        .finally(() => setLoading(false));
    }
  }, [project, blueprint, setBlueprint]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
        <p className="text-neutral-500 font-medium">Generating technical blueprint...</p>
      </div>
    );
  }

  if (!blueprint) return null;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Technical Blueprint</h2>
        <h3 className="text-xl text-neutral-500 font-medium">{project.title}</h3>
      </div>

      <section>
        <h3 className="text-xl font-bold mb-4">Project Overview</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Problem" content={blueprint?.overview?.problem || ""} />
          <Card title="Solution" content={blueprint?.overview?.solution || ""} />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <ListCard title="Core Features" items={blueprint?.features?.core || []} />
          <ListCard title="Advanced Features" items={blueprint?.features?.advanced || []} />
          <ListCard title="Future Scope" items={blueprint?.features?.future || []} />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Technology Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <TechCard title="Frontend" items={blueprint?.techStack?.frontend || []} />
          <TechCard title="Backend" items={blueprint?.techStack?.backend || []} />
          <TechCard title="Database" items={blueprint?.techStack?.database || []} />
          <TechCard title="AI / ML" items={blueprint?.techStack?.aiMl || []} />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">System Architecture</h3>
        <div className="p-8 bg-neutral-900 text-white dark:bg-white dark:text-black rounded-2xl overflow-x-auto">
          <div className="flex items-center space-x-4 min-w-max">
            <ArchNode label="User" />
            <ArchArrow />
            <ArchNode label="Frontend" sub={(blueprint?.techStack?.frontend || []).join(", ")} />
            <ArchArrow />
            <ArchNode label="API Layer" sub={(blueprint?.techStack?.backend || []).join(", ")} />
            <ArchArrow />
            <div className="flex flex-col space-y-4">
              <ArchNode label="Database" sub={(blueprint?.techStack?.database || []).join(", ")} />
              <ArchNode label="AI Models" sub={(blueprint?.techStack?.aiMl || []).join(", ")} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4">Development Roadmap</h3>
        <div className="space-y-4">
          {(blueprint?.roadmap || []).map((phase: any, idx: number) => (
            <div key={idx} className="flex bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
              <div className="w-32 shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center p-4 font-bold text-center border-r border-neutral-200 dark:border-neutral-700">
                {phase.phase}
              </div>
              <div className="p-4 flex-1">
                <ul className="list-disc pl-5 space-y-1">
                  {phase.tasks.map((task: string, i: number) => (
                    <li key={i} className="text-sm text-neutral-700 dark:text-neutral-300">{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

function Card({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
      <h4 className="text-sm font-bold text-neutral-400 mb-2">{title}</h4>
      <p className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed">{content}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
      <h4 className="text-sm font-bold text-neutral-400 mb-4">{title}</h4>
      <ul className="space-y-2">
        {items?.map((item, i) => (
          <li key={i} className="flex items-start text-sm">
            <span className="text-neutral-400 mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items?.map(item => (
          <span key={item} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-xs font-medium rounded-md">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArchNode({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="px-6 py-4 border-2 border-current rounded-xl text-center min-w-[140px]">
      <div className="font-bold">{label}</div>
      {sub && <div className="text-[10px] mt-1 opacity-70 truncate max-w-[120px]">{sub}</div>}
    </div>
  );
}

function ArchArrow() {
  return (
    <div className="flex items-center">
      <div className="h-0.5 w-8 bg-current"></div>
      <div className="w-2 h-2 border-t-2 border-r-2 border-current rotate-45 -ml-1"></div>
    </div>
  );
}
