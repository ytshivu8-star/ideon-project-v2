import { useState } from "react";
import { Loader2 } from "lucide-react";
import { generateProjects } from "../api";
import { StudentDna, ProjectConcept } from "../types";
import { ViewState } from "../App";

const fallbackProjects: ProjectConcept[] = [
  {
    title: "CodeSynth: Collaborative Web IDE",
    pitch: "A browser-based multi-user code editor that resolves concurrent editing conflicts using Abstract Syntax Tree structural merging.",
    problemStatement: "Traditional collaborative text editors use Operational Transformation (OT) or CRDTs at the character level, which frequently leads to syntactically broken code.",
    proposedSolution: "CodeSynth combines a React-based Monaco editor frontend with a Node.js backend executing custom Babel-based AST analysis.",
    targetUsers: "Remote Software Engineering Teams, Computer Science Educators",
    innovationExplanation: "Instead of treating code as plain text, CodeSynth applies syntax-aware AST parsing to merge concurrent edits.",
    originalityScore: 88,
    feasibilityScore: 85,
    technicalDepthScore: 90,
    academicValueScore: 87,
    industryRelevanceScore: 92,
    skillMatchScore: 95,
    estimatedDuration: "12 Weeks",
    estimatedBudget: "$0 - $50 (Free Tier Cloud Hosting)",
    technologies: ["React", "Node.js", "Express", "Socket.io", "Monaco Editor"],
    coreFeatures: ["Multi-user real-time code editing", "AST-based syntax tree parsing"],
    advancedFeatures: ["Dockerized sandbox backend execution environment"],
    aiMlComponents: "None", whySuitable: "It heavily utilizes React for complex UI state management and Node.js for asynchronous event handling."
  },
  {
    title: "AdaptiveSense: Accessibility Proxy",
    pitch: "A custom web proxy and dashboard system that dynamically transforms third-party web content to reduce cognitive overload.",
    problemStatement: "Standard web pages are overcrowded with visual noise that hinder individuals with cognitive load issues.",
    proposedSolution: "AdaptiveSense provides a Node.js reverse proxy that intercepts web traffic, strips visual clutter, re-structures DOM elements.",
    targetUsers: "Neurodivergent Students, Web Accessibility Researchers",
    innovationExplanation: "By combining server-side DOM transformation with dynamic client-side visual adaptation.",
    originalityScore: 91,
    feasibilityScore: 88,
    technicalDepthScore: 84,
    academicValueScore: 93,
    industryRelevanceScore: 89,
    skillMatchScore: 92,
    estimatedDuration: "10 Weeks",
    estimatedBudget: "$0 - $30",
    technologies: ["React", "Node.js", "Express", "Puppeteer"],
    coreFeatures: ["Dynamic DOM cleaning", "React toolbar overlay"],
    advancedFeatures: ["Automated AI-assisted text summarization"],
    aiMlComponents: "None", whySuitable: "Demonstrates deep knowledge of React component architectures."
  },
  {
    title: "SpatialGrid: Virtual Event Engine",
    pitch: "An interactive 2D spatial canvas that routes multi-user WebRTC audio streams based on avatar distance.",
    problemStatement: "Conventional video conferencing tools isolate users into rigid breakout rooms.",
    proposedSolution: "SpatialGrid uses an interactive React Canvas interface where participants move avatars around a virtual map.",
    targetUsers: "Virtual Conference Hosts, Remote Workplaces",
    innovationExplanation: "Replaces static voice rooms with a real-time positional engine.",
    originalityScore: 86,
    feasibilityScore: 82,
    technicalDepthScore: 89,
    academicValueScore: 85,
    industryRelevanceScore: 94,
    skillMatchScore: 90,
    estimatedDuration: "12 Weeks",
    estimatedBudget: "$0 - $40",
    technologies: ["React", "Node.js", "WebRTC", "Socket.io"],
    coreFeatures: ["2D spatial environment rendered via HTML5 Canvas", "Proximity-based WebRTC peer connectivity"],
    advancedFeatures: ["Spatial screen sharing zones"],
    aiMlComponents: "None", whySuitable: "Takes full advantage of React's state management for canvas interaction."
  }
];

export default function StudentDnaForm({
  navigate,
  setStudentDna,
  setProjects,
}: {
  navigate: (v: ViewState) => void;
  setStudentDna: (dna: StudentDna) => void;
  setProjects: (projects: ProjectConcept[]) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState<StudentDna>({
    branch: "",
    skills: "",
    interests: "",
    teamSize: "1",
    duration: "3 months",
    budget: "₹0",
    experience: "Beginner",
    careerGoal: "",
  });

  const handleDemo = () => {
    setFormData({
      branch: "CSE / AIML",
      skills: "Python, Machine Learning, React, SQL",
      interests: "Education, AI, Sustainability",
      teamSize: "3",
      duration: "4 months",
      budget: "₹5,000",
      experience: "Intermediate",
      careerGoal: "AI/ML Engineer",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setErrorMsg(null);
      setStudentDna(formData);
      const generated = await generateProjects(formData);
      setProjects(generated);
      navigate("discovery");
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate projects.";
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8" aria-live="polite">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Student DNA</h2>
          <p className="text-neutral-500">Provide your profile to generate personalized project concepts.</p>
        </div>
        <button
          type="button"
          onClick={handleDemo}
          className="text-sm px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Try Demo Profile
        </button>
      </div>


        {errorMsg && (
          <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            <p className="font-medium mb-2">Generation Failed</p>
            <p className="text-sm mb-4">{errorMsg}</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Retry Generation
              </button>
              <button
                type="button"
                onClick={() => {
                  setProjects(fallbackProjects);
                  navigate("discovery");
                }}
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white rounded-lg text-sm font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              >
                Use Default Projects
              </button>
            </div>
          </div>
        )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="branch" className="text-sm font-medium">Degree / Branch</label>
            <input
              required
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-shadow"
              placeholder="e.g. Computer Science"
              value={formData.branch}
              id="branch"
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="careerGoal" className="text-sm font-medium">Career Goal</label>
            <input
              required
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-shadow"
              placeholder="e.g. Full Stack Developer"
              value={formData.careerGoal}
              id="careerGoal"
              onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="skills" className="text-sm font-medium">Skills (Languages, Frameworks, Tools)</label>
          <input
            required
            className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-shadow"
            placeholder="e.g. JavaScript, React, Node.js"
            value={formData.skills}
            id="skills"
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="interests" className="text-sm font-medium">Interests / Domains</label>
          <input
            required
            className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-shadow"
            placeholder="e.g. Healthcare, Web3, FinTech"
            value={formData.interests}
            id="interests"
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="teamSize" className="text-sm font-medium">Team Size</label>
            <input
              required
              type="number"
              min="1"
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              value={formData.teamSize}
              id="teamSize"
              onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm font-medium">Duration</label>
            <input
              required
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              placeholder="e.g. 3 months"
              value={formData.duration}
              id="duration"
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-medium">Budget</label>
            <input
              required
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              placeholder="e.g. ₹0"
              value={formData.budget}
              id="budget"
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="experience" className="text-sm font-medium">Experience</label>
            <select
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              value={formData.experience}
              id="experience"
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-3 text-white bg-black dark:bg-white dark:text-black rounded-xl font-semibold transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing DNA...
              </>
            ) : (
              "Generate My Projects"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
