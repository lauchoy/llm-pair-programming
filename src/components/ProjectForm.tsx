import React, { useState } from 'react';
import { ProjectConfig } from '../types/project';

interface ProjectFormProps {
  onSubmit: (config: ProjectConfig) => void;
}

export function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [vision, setVision] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      vision,
      requirements,
      deploymentPreferences: {
        frontend: 'vercel',
        backend: 'railway'
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-8 bg-white border-4 border-black">
      <div className="space-y-2">
        <label htmlFor="vision" className="block text-lg uppercase font-bold">
          Project Vision
        </label>
        <textarea
          id="vision"
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          className="brutalist-input w-full p-4 bg-yellow-50"
          rows={4}
          placeholder="DESCRIBE YOUR PROJECT VISION..."
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="requirements" className="block text-lg uppercase font-bold">
          Requirements
        </label>
        <textarea
          id="requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="brutalist-input w-full p-4 bg-blue-50"
          rows={6}
          placeholder="LIST YOUR PROJECT REQUIREMENTS..."
          required
        />
      </div>

      <button
        type="submit"
        className="brutalist-button w-full py-4 px-8 text-xl"
      >
        Start Development
      </button>
    </form>
  );
}