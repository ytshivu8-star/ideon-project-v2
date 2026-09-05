import { ArrowRight, Microscope, Map, GraduationCap } from "lucide-react";
import { ViewState } from "../App";

export default function Landing({ navigate }: { navigate: (v: ViewState) => void }) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl w-full space-y-12">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white">
            PROJECT IDEON
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-light">
            Turn your skills into a project worth building.
          </p>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-500 max-w-2xl mx-auto">
            An AI project architect that helps final-year students discover, evolve, plan and defend meaningful projects.
          </p>
        </div>

        <button
          onClick={() => navigate("dna")}
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-colors bg-neutral-900 rounded-full hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
        >
          Create My Project
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>

        <div className="pt-16 border-t border-neutral-100 dark:border-neutral-900">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm font-medium text-neutral-400 dark:text-neutral-600 mb-12">
            <span>Student DNA</span>
            <ArrowRight className="w-4 h-4" />
            <span>Generate</span>
            <ArrowRight className="w-4 h-4" />
            <span>Evaluate</span>
            <ArrowRight className="w-4 h-4" />
            <span className="text-neutral-900 dark:text-white">Evolve</span>
            <ArrowRight className="w-4 h-4" />
            <span>Build</span>
            <ArrowRight className="w-4 h-4" />
            <span>Defend</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Microscope}
              title="Project Evolution"
              description="Transform generic ideas into highly differentiated research topics."
            />
            <FeatureCard
              icon={Map}
              title="Project Blueprint"
              description="Generate a practical, week-by-week technical development roadmap."
            />
            <FeatureCard
              icon={GraduationCap}
              title="AI Viva Mentor"
              description="Practice defending your project against a strict AI university examiner."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="p-6 text-left border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50">
      <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-xl mb-4 border border-neutral-100 dark:border-neutral-700 shadow-sm">
        <Icon className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
