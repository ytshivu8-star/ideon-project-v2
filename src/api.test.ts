import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateProjects, evolveProject, generateBlueprint, adaptProject, askMentor, getVivaQuestion, evaluateVivaAnswer } from './api';

const mockDna: any = {
  skills: ['React'],
  languages: ['JavaScript'],
  experience: 'Beginner',
  interests: ['Web'],
  previousProjects: '',
  careerGoals: '',
  teamSize: '1',
  availableTime: '1 month',
  budget: '0',
  hardware: '',
  difficulty: 'Beginner',
  preferredStack: 'MERN'
};

const mockProject = {
  title: 'Test',
  pitch: 'Test pitch',
  problemStatement: 'Problem',
  proposedSolution: 'Solution',
  targetUsers: 'Users',
  innovationExplanation: 'Innovation',
  originalityScore: 10,
  feasibilityScore: 10,
  technicalDepthScore: 10,
  academicValueScore: 10,
  industryRelevanceScore: 10,
  skillMatchScore: 10,
  estimatedDuration: '1 month',
  estimatedBudget: '0',
  technologies: ['React'],
  coreFeatures: ['Feature 1'],
  advancedFeatures: [],
  aiMlComponents: 'None',
  whySuitable: 'Fits'
};

describe('API Service', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe('generateProjects', () => {
    it('should fetch and return projects successfully', async () => {
      const mockResponse = [{ title: 'Project 1' }];
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await generateProjects(mockDna);
      expect(fetch).toHaveBeenCalledWith('/api/generate', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockDna),
      }));
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors properly', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Not found', stage: 'server' }),
      });

      await expect(generateProjects(mockDna)).rejects.toThrow('[SERVER] Not found');
    });
    
    it('should handle 500 API errors with details', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ message: 'Missing API Key', stage: 'environment' }),
      });

      await expect(generateProjects(mockDna)).rejects.toThrow('[ENVIRONMENT] Missing API Key');
    });
  });

  describe('evolveProject', () => {
    it('should fetch and return evolved project successfully', async () => {
      const mockResponse = { newTitle: 'Evolved' };
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await evolveProject(mockProject);
      expect(fetch).toHaveBeenCalledWith('/api/evolve', expect.any(Object));
      expect(result).toEqual(mockResponse);
    });
    
    it('should handle API errors properly', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Failed to evolve' }),
      });

      await expect(evolveProject(mockProject)).rejects.toThrow('Failed to evolve');
    });
  });

  describe('Other API endpoints', () => {
    it('generateBlueprint should work', async () => {
      (global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ step: 1 }) });
      await expect(generateBlueprint(mockProject)).resolves.toEqual({ step: 1 });
    });
    it('adaptProject should work', async () => {
      (global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ step: 1 }) });
      await expect(adaptProject(mockProject, 'test')).resolves.toEqual({ step: 1 });
    });
    it('askMentor should work', async () => {
      (global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ step: 1 }) });
      await expect(askMentor(mockProject, [])).resolves.toEqual({ step: 1 });
    });
    it('getVivaQuestion should work', async () => {
      (global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ step: 1 }) });
      await expect(getVivaQuestion(mockProject, [])).resolves.toEqual({ step: 1 });
    });
    it('evaluateVivaAnswer should work', async () => {
      (global.fetch as any).mockResolvedValueOnce({ ok: true, json: async () => ({ step: 1 }) });
      await expect(evaluateVivaAnswer(mockProject, 'q', 'a')).resolves.toEqual({ step: 1 });
    });
  });
});
