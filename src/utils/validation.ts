import { ProjectConfig } from '../types/project';

const MAX_VISION_LENGTH = 2000;
const MAX_REQUIREMENTS_LENGTH = 5000;

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateProjectConfig(config: ProjectConfig): void {
  if (!config.vision.trim()) {
    throw new ValidationError('Project vision is required');
  }
  
  if (!config.requirements.trim()) {
    throw new ValidationError('Project requirements are required');
  }

  if (config.vision.length > MAX_VISION_LENGTH) {
    throw new ValidationError(`Vision must be less than ${MAX_VISION_LENGTH} characters`);
  }

  if (config.requirements.length > MAX_REQUIREMENTS_LENGTH) {
    throw new ValidationError(`Requirements must be less than ${MAX_REQUIREMENTS_LENGTH} characters`);
  }
}