import React, { useState } from 'react';
import { ProjectForm } from './components/ProjectForm';
import { DevelopmentMonitor } from './components/DevelopmentMonitor';
import { ProjectState, ProjectConfig } from './types/project';
import { projectApi } from './api/projectApi';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';

function App() {
  const [project, setProject] = useState<ProjectState | null>(null);

  const handleProjectSubmit = async (config: ProjectConfig) => {
    const newProject = await projectApi.createProject(config);
    setProject(newProject);

    const interval = setInterval(async () => {
      const status = await projectApi.getProjectStatus(newProject.id);
      setProject(status);

      if (status.currentStage.status === 'completed') {
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="min-h-screen bg-[#f0f0f0]">
          <header className="bg-black text-white border-b-4 border-black">
            <div className="max-w-7xl mx-auto py-8 px-4">
              <h1 className="text-4xl font-bold uppercase tracking-wider">
                LLM Pair Programming
              </h1>
            </div>
          </header>

          <main className="max-w-7xl mx-auto py-8 px-4">
            {!project ? (
              <ProjectForm onSubmit={handleProjectSubmit} />
            ) : (
              <DevelopmentMonitor project={project} />
            )}
          </main>
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;