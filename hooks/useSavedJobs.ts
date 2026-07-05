import { useAppStore } from "../store/useAppStore";

export function useSavedJobs() {
  const savedJobs = useAppStore(
    (state) => state.savedJobs
  );

  const addSavedJob = useAppStore(
    (state) => state.addSavedJob
  );

  const removeSavedJob = useAppStore(
    (state) => state.removeSavedJob
  );

  return {
    savedJobs,
    addSavedJob,
    removeSavedJob,
  };
}