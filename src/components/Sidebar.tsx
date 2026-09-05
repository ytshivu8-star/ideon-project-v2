import { FileText, Lightbulb, Map, Microscope, MessageSquare, GraduationCap } from "lucide-react";
import { ViewState } from "../App";

export default function Sidebar({
  currentView,
  navigate,
  hasProject,
  hasDna,
  hasProjects,
}: {
  currentView: ViewState;
  navigate: (v: ViewState) => void;
  hasProject: boolean;
  hasDna: boolean;
  hasProjects: boolean;
}) {
  const navItems = [
    { id: "dna", label: "Student DNA", icon: Microscope, enabled: true },
    { id: "discovery", label: "Projects", icon: Lightbulb, enabled: hasProjects },
    { id: "evolution", label: "Evolution", icon: FileText, enabled: hasProject },
    { id: "blueprint", label: "Blueprint", icon: Map, enabled: hasProject },
    { id: "adapt", label: "What If?", icon: Lightbulb, enabled: hasProject },
    { id: "mentor", label: "Mentor", icon: MessageSquare, enabled: hasProject },
    { id: "viva", label: "Viva", icon: GraduationCap, enabled: hasProject },
  ];

  return (
    <div className="w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
      <button type="button" aria-label="Go to landing page" className="w-full text-left p-6 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-white" onClick={() => navigate("landing")}>
        <div className="text-xl font-bold tracking-tight">PROJECT IDEON</div>
        <div className="text-xs text-neutral-500 mt-1 uppercase tracking-widest font-semibold">Architect</div>
      </button>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => item.enabled && navigate(item.id as ViewState)}
              disabled={!item.enabled}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                  : item.enabled
                  ? "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
                  : "text-neutral-300 dark:text-neutral-700 cursor-not-allowed"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      {hasProject && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Project Active
          </div>
        </div>
      )}
    </div>
  );
}
