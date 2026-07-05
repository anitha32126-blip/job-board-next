import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Job } from "../generated/graphql";

interface JobStore {
  savedJobs: Job[];

  filterOpen: boolean;

  activeTheme: "light" | "dark";

  lastViewedJob: Job | null;

  addSavedJob: (job: Job) => void;

  removeSavedJob: (id: string) => void;

  setFilterOpen: (value: boolean) => void;

  setTheme: (theme: "light" | "dark") => void;

  setLastViewedJob: (job: Job) => void;
}

export const useAppStore = create<JobStore>()(
  persist(
    devtools((set) => ({
    savedJobs: [],

    filterOpen: false,

    activeTheme: "light",

    lastViewedJob: null,

    addSavedJob: (job) =>
  set((state) => {
    const exists = state.savedJobs.some(
      (savedJob) => savedJob.id === job.id
    );

    if (exists) {
      return state;
    }

    return {
      savedJobs: [...state.savedJobs, job],
    };
  }),

    removeSavedJob: (id) =>
      set((state) => ({
        savedJobs: state.savedJobs.filter(
          (job) => job.id !== id
        ),
      })),

    setFilterOpen: (value) =>
      set({
        filterOpen: value,
      }),

    setTheme: (theme) =>
      set({
        activeTheme: theme,
      }),

    setLastViewedJob: (job) =>
      set({
        lastViewedJob: job,
      }),
     })),
    {
      name: "job-board-storage",
    }
  )
);