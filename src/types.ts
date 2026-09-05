export interface StudentDna {
  branch: string;
  skills: string;
  interests: string;
  teamSize: string;
  duration: string;
  budget: string;
  experience: string;
  careerGoal: string;
}

export interface ProjectConcept {
  title: string;
  pitch: string;
  problemStatement: string;
  proposedSolution: string;
  targetUsers: string;
  innovationExplanation: string;
  originalityScore: number;
  feasibilityScore: number;
  technicalDepthScore: number;
  academicValueScore: number;
  industryRelevanceScore: number;
  skillMatchScore: number;
  estimatedDuration: string;
  estimatedBudget: string;
  technologies: string[];
  coreFeatures: string[];
  advancedFeatures: string[];
  aiMlComponents: string;
  whySuitable: string;
}

export interface EvolvedProjectData {
  weaknesses: string[];
  originalityBefore: number;
  originalityAfter: number;
  changes: {
    problemScope: string;
    technicalApproach: string;
    aiMlComponent: string;
    architecture: string;
    researchContribution: string;
    targetUsers: string;
    evaluationMethodology: string;
  };
  evolvedProject: ProjectConcept;
}
