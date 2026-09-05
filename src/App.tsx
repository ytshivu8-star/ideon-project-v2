import { useState, useCallback } from 'react';
import Landing from './components/Landing';
import StudentDnaForm from './components/StudentDnaForm';
import ProjectDiscovery from './components/ProjectDiscovery';
import ProjectEvolution from './components/ProjectEvolution';
import ProjectBlueprint from './components/ProjectBlueprint';
import ProjectAdaptation from './components/ProjectAdaptation';
import AiMentor from './components/AiMentor';
import VivaSimulator from './components/VivaSimulator';
import Sidebar from './components/Sidebar';
import { StudentDna, ProjectConcept, EvolvedProjectData } from './types';

export type ViewState = 'landing' | 'dna' | 'discovery' | 'evolution' | 'blueprint' | 'adapt' | 'mentor' | 'viva';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [studentDna, setStudentDna] = useState<StudentDna | null>(null);
  const [projects, setProjects] = useState<ProjectConcept[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectConcept | null>(null);
  const [evolvedData, setEvolvedData] = useState<EvolvedProjectData | null>(null);
  const [blueprint, setBlueprint] = useState<any>(null);

  const navigate = useCallback((v: ViewState) => setView(v), []);

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
      {view !== 'landing' && (
        <Sidebar 
          currentView={view} 
          navigate={navigate} 
          hasProject={!!selectedProject} 
          hasDna={!!studentDna} 
          hasProjects={projects.length > 0} 
        />
      )}
      
      <main className="flex-1 overflow-y-auto">
        {view === 'landing' && <Landing navigate={navigate} />}
        {view === 'dna' && (
          <StudentDnaForm 
            navigate={navigate} 
            setStudentDna={setStudentDna} 
            setProjects={setProjects} 
          />
        )}
        {view === 'discovery' && (
          <ProjectDiscovery 
            projects={projects} 
            navigate={navigate} 
            setSelectedProject={setSelectedProject} 
            setEvolvedData={setEvolvedData}
          />
        )}
        {view === 'evolution' && selectedProject && (
          <ProjectEvolution 
            project={selectedProject}
            evolvedData={evolvedData}
            setEvolvedData={setEvolvedData}
            navigate={navigate}
            setSelectedProject={setSelectedProject}
          />
        )}
        {view === 'blueprint' && selectedProject && (
          <ProjectBlueprint 
            project={selectedProject} 
            blueprint={blueprint} 
            setBlueprint={setBlueprint} 
          />
        )}
        {view === 'adapt' && selectedProject && (
          <ProjectAdaptation 
            project={selectedProject} 
            setSelectedProject={setSelectedProject} 
          />
        )}
        {view === 'mentor' && selectedProject && (
          <AiMentor project={selectedProject} />
        )}
        {view === 'viva' && selectedProject && (
          <VivaSimulator project={selectedProject} />
        )}
      </main>
    </div>
  );
}
