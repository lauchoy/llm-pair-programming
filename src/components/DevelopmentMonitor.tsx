import React from 'react';
import { ProjectState } from '../types/project';
import { Code } from 'lucide-react';

interface DevelopmentMonitorProps {
  project: ProjectState;
}

export function DevelopmentMonitor({ project }: DevelopmentMonitorProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white border-4 border-black p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl uppercase font-bold">Development Progress</h2>
          <span className="text-sm bg-black text-white px-4 py-2 uppercase font-bold">
            {project.currentStage.name}
          </span>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-4 items-center justify-between">
            <span className="bg-black text-white px-4 py-2 uppercase font-bold text-sm">
              {project.currentStage.status}
            </span>
            <span className="bg-black text-white px-4 py-2 uppercase font-bold text-sm">
              {project.currentStage.progress}%
            </span>
          </div>
          <div className="h-4 border-4 border-black bg-white">
            <div
              style={{ width: `${project.currentStage.progress}%` }}
              className="h-full bg-black"
            />
          </div>
        </div>

        {project.currentStage.currentTask && (
          <div className="mt-6 p-4 border-4 border-black bg-red-50">
            <span className="uppercase font-bold">Current Task:</span>
            <span className="ml-2">{project.currentStage.currentTask}</span>
          </div>
        )}
      </div>

      <div className="bg-white border-4 border-black p-8">
        <div className="flex items-center space-x-4 mb-6">
          <Code className="h-6 w-6" />
          <h2 className="text-xl uppercase font-bold">Generated Code</h2>
        </div>
        
        {project.generatedCode.length > 0 ? (
          <div className="space-y-6">
            {project.generatedCode.map((code, index) => (
              <div key={index} className="border-4 border-black">
                <h3 className="font-bold uppercase bg-black text-white p-4">
                  {code.fileName}
                </h3>
                <pre className="p-4 bg-green-50 overflow-x-auto font-mono">
                  {code.content}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-4 border-4 border-black bg-yellow-50 uppercase">
            No code generated yet
          </p>
        )}
      </div>
    </div>
  );
}