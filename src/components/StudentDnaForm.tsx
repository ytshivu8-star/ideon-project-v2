import { useState } from "react";
import { Loader2 } from "lucide-react";
import { generateProjects } from "../api";
import { StudentDna, ProjectConcept } from "../types";
import { ViewState } from "../App";

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
      setStudentDna(formData);
      const generated = await generateProjects(formData);
      setProjects(generated);
      navigate("discovery");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to generate projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Degree / Branch</label>
            <input
              required
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-shadow"
              placeholder="e.g. Computer Science"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Career Goal</label>
            <input
              required
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-shadow"
              placeholder="e.g. Full Stack Developer"
              value={formData.careerGoal}
              onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Skills (Languages, Frameworks, Tools)</label>
          <input
            required
            className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-shadow"
            placeholder="e.g. JavaScript, React, Node.js"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Interests / Domains</label>
          <input
            required
            className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-shadow"
            placeholder="e.g. Healthcare, Web3, FinTech"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Team Size</label>
            <input
              required
              type="number"
              min="1"
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              value={formData.teamSize}
              onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <input
              required
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              placeholder="e.g. 3 months"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget</label>
            <input
              required
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              placeholder="e.g. ₹0"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Experience</label>
            <select
              className="w-full px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg outline-none"
              value={formData.experience}
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
