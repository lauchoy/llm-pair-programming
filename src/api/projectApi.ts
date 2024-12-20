import { ProjectConfig, ProjectState } from '../types/project';

const MOCK_DELAY = 1000;

export const projectApi = {
  async createProject(config: ProjectConfig): Promise<ProjectState> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      id: crypto.randomUUID(),
      config,
      currentStage: {
        name: 'Initializing',
        status: 'in-progress',
        progress: 0
      },
      generatedCode: []
    };
  },

  async getProjectStatus(projectId: string): Promise<ProjectState> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      id: projectId,
      config: {
        vision: 'Mock project',
        requirements: 'Sample requirements',
        deploymentPreferences: {
          frontend: 'vercel',
          backend: 'railway'
        }
      },
      currentStage: {
        name: 'Generating Code',
        status: 'in-progress',
        progress: 45,
        currentTask: 'Implementing core features'
      },
      generatedCode: []
    };
  }
};