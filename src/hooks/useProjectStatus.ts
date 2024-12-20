import { useState, useEffect, useCallback } from 'react';
import { ProjectState } from '../types/project';
import { projectApi } from '../api/projectApi';

const POLLING_INTERVAL = 2000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function useProjectStatus(projectId: string) {
  const [project, setProject] = useState<ProjectState | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = useCallback(async (retryCount = 0) => {
    try {
      const status = await projectApi.getProjectStatus(projectId);
      setProject(status);
      setError(null);
      setIsLoading(false);
      return status;
    } catch (err) {
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchStatus(retryCount + 1);
      }
      setError(err instanceof Error ? err : new Error('Failed to fetch status'));
      setIsLoading(false);
      throw err;
    }
  }, [projectId]);

  useEffect(() => {
    let mounted = true;
    let intervalId: number;

    const pollStatus = async () => {
      try {
        const status = await fetchStatus();
        if (!mounted) return;

        if (status.currentStage.status === 'completed' || 
            status.currentStage.status === 'failed') {
          clearInterval(intervalId);
        }
      } catch (err) {
        if (mounted) {
          clearInterval(intervalId);
        }
      }
    };

    pollStatus();
    intervalId = window.setInterval(pollStatus, POLLING_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [fetchStatus]);

  return { project, error, isLoading };
}