export interface ProjectConfig {
  vision: string;
  requirements: string;
  deploymentPreferences: {
    frontend: string;
    backend: string;
  };
}

export interface CodeGeneration {
  fileName: string;
  content: string;
  language: string;
}

export interface DevelopmentStage {
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  progress: number;
  currentTask?: string;
}

export interface ProjectState {
  id: string;
  config: ProjectConfig;
  currentStage: DevelopmentStage;
  generatedCode: CodeGeneration[];
  deploymentUrl?: string;
  error?: string;
}