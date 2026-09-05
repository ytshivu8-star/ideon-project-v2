import { 
  ArrowRight, 
  Microscope, 
  Map, 
  GraduationCap, 
  CheckCircle2, 
  BrainCircuit, 
  Settings2, 
  LineChart, 
  MessageSquare,
  Network,
  Cpu,
  Trophy,
  Users,
  Code,
  Zap,
  Check,
  X,
  ChevronRight
} from "lucide-react";
import { ViewState } from "../App";

export default function Landing({ navigate }: { navigate: (v: ViewState) => void }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100 overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-left z-10">
            <div className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-800 dark:text-indigo-300">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2"></span>
              AI-Powered Project Innovation Platform
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Don't Just Find a Project Idea. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Build One That Matters.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl font-light leading-relaxed">
              Ideon helps students discover, evaluate, evolve, and build final-year projects using AI-powered guidance tailored to their skills, interests, goals, time, budget, and team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("dna")}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                Build My Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-neutral-700 dark:text-neutral-300 transition-colors bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                Explore How It Works
              </a>
            </div>

            <div className="pt-8 flex flex-wrap gap-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Personalized AI Recommendations</span>
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Project Evolution</span>
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Complete Development Blueprint</span>
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> AI Project Mentor</span>
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-indigo-500" /> Viva Preparation</span>
            </div>
          </div>
          
          <div className="relative z-10 hidden lg:block">
            <div className="relative rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden aspect-square flex flex-col">
              <div className="h-12 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-4 space-x-2 bg-neutral-50 dark:bg-neutral-950">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="h-8 w-1/3 bg-neutral-100 dark:bg-neutral-800 rounded-md"></div>
                <div className="flex-1 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 p-4 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-800">
                     <div className="h-6 w-1/4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                     <div className="h-6 w-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                    <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                    <div className="h-4 w-4/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                  </div>
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                    <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                  </div>
                </div>
              </div>
              {/* Overlay floating elements */}
              <div className="absolute -right-6 top-32 p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-100 dark:border-neutral-700 flex items-center gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg"><Trophy className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-bold">Feasibility Score</div>
                  <div className="text-xs text-neutral-500">9.5/10 - Excellent</div>
                </div>
              </div>
              <div className="absolute -left-6 bottom-32 p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-100 dark:border-neutral-700 flex items-center gap-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg"><BrainCircuit className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-bold">AI Mentor Active</div>
                  <div className="text-xs text-neutral-500">Ready to assist...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Finding a Project Is Easy.<br/><span className="text-neutral-400">Finding the RIGHT Project Isn't.</span></h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">Students waste weeks scrolling through outdated lists, often choosing projects that are either too simple, too complex, or completely disconnected from their career goals.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ProblemCard title="Generic Ideas" desc="Thousands of copy-paste project ideas online that don't stand out." />
            <ProblemCard title="Skill Mismatch" desc="Difficulty choosing a project that perfectly matches personal skills and goals." />
            <ProblemCard title="Scope Creep" desc="Projects that sound cool but are too complex for the available time and budget." />
            <ProblemCard title="No Roadmap" desc="Uncertainty about technologies, system architecture, and how to start." />
            <ProblemCard title="Stuck Midway" desc="Hitting a roadblock with no mentor to help debug or guide technical choices." />
            <ProblemCard title="Viva Anxiety" desc="Difficulty preparing to defend the technical decisions during the final review." />
          </div>
        </div>
      </section>

      {/* 3. THE IDEON SOLUTION */}
      <section id="how-it-works" className="py-24 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">One Platform. <br/>From First Idea to Final Viva.</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">Instead of stopping after generating an idea, Ideon stays with you throughout the entire project journey.</p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 relative z-10">
              <Step number="01" title="Discover" />
              <Step number="02" title="Evaluate" />
              <Step number="03" title="Evolve" />
              <Step number="04" title="Blueprint" />
              <Step number="05" title="Adapt" />
              <Step number="06" title="Build" />
              <Step number="07" title="Prepare" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. STUDENT DNA */}
      <section className="py-24 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl mb-6">
              <Network className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tell Ideon Who You Are.</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Ideon understands you before recommending projects. Your project should fit YOU — not the other way around.
            </p>
            <ul className="space-y-3 mb-8 text-neutral-700 dark:text-neutral-300">
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3"/> Skills & Languages</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3"/> Career Goals</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3"/> Available Time & Team Size</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-indigo-500 mr-3"/> Hardware & Budget Constraints</li>
            </ul>
            <button
              onClick={() => navigate("dna")}
              className="px-6 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
            >
              Create My Student DNA
            </button>
          </div>
          <div className="relative rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 shadow-lg">
             <div className="space-y-6 opacity-75">
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-neutral-500 uppercase">Primary Skills</label>
                 <div className="flex gap-2">
                   <span className="px-3 py-1 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 text-sm">React</span>
                   <span className="px-3 py-1 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 text-sm">Python</span>
                   <span className="px-3 py-1 bg-indigo-600 text-white rounded text-sm cursor-pointer">+ Add Skill</span>
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-neutral-500 uppercase">Time Available</label>
                 <div className="h-10 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 flex items-center px-3 text-sm text-neutral-400">3 Months</div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-neutral-500 uppercase">Target Domain</label>
                 <div className="h-10 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 flex items-center px-3 text-sm text-neutral-400">Healthcare AI</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5 & 6. AI PROJECT GENERATOR & SCORING */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Discover Projects Built Around You.</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">Ideon generates highly personalized project concepts and evaluates them against academic and industry standards so you know exactly which idea is worth building.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">Project Generation</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">Each tailored concept includes:</p>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-1"/> Project Title & Pitch</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-1"/> Problem Statement</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-1"/> Proposed Solution</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-1"/> Target Users</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-1"/> Core Features</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-indigo-500 mr-1"/> Technologies</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">AI Project Scoring</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6">Stop guessing. Compare ideas using AI evaluation:</p>
              <div className="space-y-4">
                <ScoreBar label="Originality" score={85} />
                <ScoreBar label="Feasibility" score={92} />
                <ScoreBar label="Technical Depth" score={78} />
                <ScoreBar label="Industry Relevance" score={95} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SIGNATURE FEATURE — IDEA EVOLUTION */}
      <section className="py-32 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-800/50 blur-[100px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm font-medium text-indigo-200 bg-indigo-800/50 rounded-full border border-indigo-700">
            Signature Feature
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">An Idea Is Just the Beginning.</h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-16">Ideon identifies weaknesses and generic aspects of a project and evolves the concept into a highly differentiated version.</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">
            <div className="flex-1 bg-indigo-950/50 border border-indigo-800/50 p-6 rounded-2xl text-left w-full">
              <div className="text-xs font-bold tracking-wider text-indigo-400 mb-2 uppercase">Original Idea</div>
              <h4 className="text-xl font-semibold mb-2">Student Attendance System</h4>
              <p className="text-indigo-200 text-sm">A basic web app that lets teachers mark attendance and students view their records.</p>
            </div>
            
            <div className="hidden md:flex flex-col items-center justify-center text-indigo-400">
              <Settings2 className="w-8 h-8 mb-2 animate-spin-slow" />
              <div className="text-xs font-bold uppercase tracking-widest">AI Analysis</div>
              <ArrowRight className="w-6 h-6 mt-2" />
            </div>
            
            <div className="md:hidden flex flex-col items-center justify-center text-indigo-400 py-4">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </div>

            <div className="flex-1 bg-white text-neutral-900 p-6 rounded-2xl text-left w-full shadow-2xl relative">
              <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Evolved</div>
              <div className="text-xs font-bold tracking-wider text-indigo-600 mb-2 uppercase">Evolved Concept</div>
              <h4 className="text-xl font-semibold mb-2">Predictive Attendance & Risk Intelligence</h4>
              <p className="text-neutral-600 text-sm mb-4">An ML platform that analyzes attendance patterns to predict academic risk and trigger personalized interventions.</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Predictive Analytics</span>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">Risk Detection</span>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded">AI Insights</span>
              </div>
            </div>
          </div>
          
          <p className="mt-16 text-indigo-300 italic">"This is what makes Ideon different from a basic AI idea generator."</p>
        </div>
      </section>

      {/* 8. PROJECT BLUEPRINT */}
      <section className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-96 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden p-6">
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                 <div className="h-20 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"></div>
                 <div className="h-20 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"></div>
                 <div className="h-20 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"></div>
              </div>
              <div className="h-6 w-1/4 bg-neutral-200 dark:bg-neutral-800 rounded mt-6"></div>
              <div className="h-10 w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded flex items-center px-4"><div className="w-1/2 h-2 bg-neutral-200 dark:bg-neutral-700 rounded"></div></div>
              <div className="h-10 w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded flex items-center px-4"><div className="w-3/4 h-2 bg-neutral-200 dark:bg-neutral-700 rounded"></div></div>
              <div className="h-10 w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded flex items-center px-4"><div className="w-1/3 h-2 bg-neutral-200 dark:bg-neutral-700 rounded"></div></div>
            </div>
            {/* Gradient fade out at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-100 dark:from-neutral-900 to-transparent"></div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-6">
              <Map className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">From Concept to Complete Blueprint.</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              Once you select a project, Ideon generates a highly structured, week-by-week development blueprint. No more guessing how to start or what to build next.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-8 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2"/> System Architecture</span>
              <span className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2"/> Database Design</span>
              <span className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2"/> API Requirements</span>
              <span className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2"/> Dev Roadmap</span>
              <span className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2"/> Team Duties</span>
              <span className="flex items-center"><Check className="w-4 h-4 text-blue-500 mr-2"/> Risk Analysis</span>
            </div>
            <button
              onClick={() => navigate("dna")}
              className="px-6 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              Generate My Blueprint
            </button>
          </div>
        </div>
      </section>

      {/* 9. WHAT-IF PROJECT ADAPTATION */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What If Your Constraints Change?</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">Ideon doesn't just generate projects. It helps projects survive real-world constraints. Modify your project dynamically without starting from scratch.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <ConstraintBadge text="What if I only have 6 weeks?" />
            <ConstraintBadge text="What if my budget is ₹2,000?" />
            <ConstraintBadge text="What if I have a team of 5?" />
            <ConstraintBadge text="What if I don't know React?" />
            <ConstraintBadge text="What if I want more AI/ML?" />
            <ConstraintBadge text="What if I have no hardware?" />
          </div>
        </div>
      </section>

      {/* 10 & 11. AI MENTOR & VIVA */}
      <section className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          
          <div className="p-10 rounded-3xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Your AI Mentor,<br/>Whenever You Get Stuck.</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">Ask project-specific questions throughout your development. The AI Mentor understands your exact project context and architecture.</p>
            <div className="space-y-3">
              <ChatBubble text="How should I structure my backend?" />
              <ChatBubble text="Why is my model overfitting?" />
              <ChatBubble text="How should I deploy this?" />
            </div>
          </div>

          <div className="p-10 rounded-3xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Build It.<br/>Then Defend It.</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">Simulate a project viva before the real thing. Ideon acts as an examiner, asks technical questions, and scores your answers.</p>
            <div className="space-y-4">
               <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                 <div className="text-xs font-bold text-neutral-500 uppercase mb-1">Examiner</div>
                 <p className="text-sm font-medium">Why did you choose PostgreSQL over MongoDB for this specific feature?</p>
               </div>
               <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl shadow-sm border border-purple-200 dark:border-purple-800 ml-8">
                 <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-1">Evaluation</div>
                 <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-2">Score: 8.5/10</p>
                 <p className="text-xs text-neutral-600 dark:text-neutral-400">Good explanation of ACID compliance, but missing details on relational mapping.</p>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 12. COMPLETE PROJECT JOURNEY TIMELINE */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Everything You Need to Turn an Idea Into a Real Project.</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-neutral-800 -translate-y-1/2 z-0"></div>
            
            <JourneyNode title="Student DNA" />
            <JourneyNode title="AI Discovery" />
            <JourneyNode title="Idea Evolution" />
            <JourneyNode title="Blueprint" />
            <JourneyNode title="AI Mentor" />
            <JourneyNode title="Viva Simulator" />
            <JourneyNode title="Project Ready" active />
          </div>
        </div>
      </section>

      {/* 13 & 14. WHO IS IDEON FOR & WHY IDEON */}
      <section className="py-24 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            <div>
              <h2 className="text-3xl font-bold mb-8">Who is Ideon For?</h2>
              <div className="flex flex-wrap gap-3">
                <Tag>Final-Year Students</Tag>
                <Tag>Engineering Students</Tag>
                <Tag>Computer Science Students</Tag>
                <Tag>AI/ML Students</Tag>
                <Tag>Student Developers</Tag>
                <Tag>Project Teams</Tag>
                <Tag>Hackathon Participants</Tag>
                <Tag>Academic Mentors</Tag>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">More Than an Idea Generator.</h2>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <div className="grid grid-cols-2 p-4 bg-neutral-100 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 font-bold text-sm">
                  <div className="text-neutral-500">Traditional Search</div>
                  <div className="text-indigo-600 dark:text-indigo-400 flex items-center"><Cpu className="w-4 h-4 mr-2"/> Ideon Platform</div>
                </div>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
                  <ComparisonRow bad="Generic copy-paste ideas" good="Highly personalized projects" />
                  <ComparisonRow bad="No feasibility analysis" good="AI-scored technical depth" />
                  <ComparisonRow bad="Basic concept only" good="Deep idea evolution" />
                  <ComparisonRow bad="No development roadmap" good="Complete technical blueprint" />
                  <ComparisonRow bad="No ongoing guidance" good="Dedicated AI Project Mentor" />
                  <ComparisonRow bad="No presentation prep" good="Interactive Viva Simulator" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 15 & 16. TECHNOLOGY & HACKATHON */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-6">Powered by Modern AI</h3>
            <div className="flex flex-wrap gap-4">
               <TechBadge name="Google AI Studio" />
               <TechBadge name="Gemini 3.1 Flash" />
               <TechBadge name="React" />
               <TechBadge name="TypeScript" />
               <TechBadge name="Tailwind CSS" />
               <TechBadge name="Vercel" />
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-2">Hackathon Build</h3>
            <div className="text-xl font-bold mb-2">PromptWars × Parul University</div>
            <div className="text-sm font-medium text-neutral-500 mb-4">CSE AIML Edition</div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Built as an AI-powered solution to help students solve the real-world challenge of choosing, planning, developing, and defending final-year projects.
            </p>
          </div>
        </div>
      </section>

      {/* 17. FINAL CTA */}
      <section className="py-32 bg-indigo-600 text-white text-center px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold">Your Next Great Project Starts Here.</h2>
          <p className="text-xl text-indigo-100 font-light">Tell Ideon what you know, what you love, and what you want to build.</p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("dna")}
              className="px-8 py-4 text-base font-bold text-indigo-900 bg-white rounded-full hover:bg-indigo-50 shadow-xl transition-transform hover:-translate-y-1"
            >
              Start Building with Ideon →
            </button>
            <button
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="px-8 py-4 text-base font-medium text-white border border-indigo-400 rounded-full hover:bg-indigo-500 transition-colors"
            >
              Explore the Platform
            </button>
          </div>
        </div>
      </section>

      {/* 18. FOOTER */}
      <footer className="bg-neutral-950 text-neutral-400 py-12 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="text-2xl font-bold text-white mb-2">IDEON</div>
            <p className="text-sm">From Idea to Innovation.</p>
            <p className="text-xs mt-6 text-neutral-500">Built for students. Powered by AI.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => window.scrollTo(0,0)} className="hover:text-white transition-colors">Home</button></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><button onClick={() => navigate("dna")} className="hover:text-white transition-colors">Project Generator</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Technology</h4>
            <ul className="space-y-2 text-sm">
              <li>Google AI Studio</li>
              <li>Google Gemini</li>
              <li>React + Vite</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Subcomponents

function ProblemCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
        <X className="w-4 h-4" />
      </div>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
    </div>
  );
}

function Step({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex flex-col items-center relative z-10">
      <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-3 shadow-md">
        {number}
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">{title}</span>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-medium mb-1">
        <span>{label}</span>
        <span className="text-indigo-600 dark:text-indigo-400">{score}/100</span>
      </div>
      <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}

function ConstraintBadge({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-sm font-medium shadow-sm flex items-center hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-default transition-colors">
      <Settings2 className="w-4 h-4 mr-2 opacity-50" />
      {text}
    </div>
  );
}

function ChatBubble({ text }: { text: string }) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-3 rounded-2xl rounded-tl-sm border border-neutral-200 dark:border-neutral-800 text-sm shadow-sm max-w-[80%] inline-block">
      {text}
    </div>
  );
}

function JourneyNode({ title, active }: { title: string; active?: boolean }) {
  return (
    <div className="flex flex-col items-center my-4 md:my-0 relative z-10">
      <div className={`w-4 h-4 rounded-full mb-3 ${active ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]' : 'bg-neutral-700'}`}></div>
      <span className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-white' : 'text-neutral-500'}`}>{title}</span>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium border border-neutral-200 dark:border-neutral-800">
      {children}
    </span>
  );
}

function ComparisonRow({ bad, good }: { bad: string; good: string }) {
  return (
    <div className="grid grid-cols-2 p-4">
      <div className="flex items-start text-neutral-500 pr-4">
        <X className="w-4 h-4 text-red-400 mr-2 shrink-0 mt-0.5" />
        {bad}
      </div>
      <div className="flex items-start text-neutral-900 dark:text-white pl-4 border-l border-neutral-200 dark:border-neutral-800">
        <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
        {good}
      </div>
    </div>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-semibold shadow-sm">
      <Code className="w-4 h-4 mr-2 text-neutral-400" />
      {name}
    </div>
  );
}
