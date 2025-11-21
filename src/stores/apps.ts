import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface App {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
  banner: string;
  link: string;
  bp: string;
  bpContent: string;
  isSpotlight: boolean;
  isOutlink: boolean;
}

interface AppsStore {
  apps: App[];
  setApps: (apps: App[]) => void;
  addApp: (app: App) => void;
  removeApp: (id: number) => void;
  updateApp: (id: number, app: Partial<App>) => void;
  getAppById: (id: number) => App | undefined;
  getAppsByCategory: (category: string) => App[];
  getSpotlightApps: () => App[];
}

export const useAppsStore = create(
  persist<AppsStore>(
    (set, get) => ({
      apps: [],
      setApps: (apps: App[]) => set({ apps }),
      addApp: (app: App) =>
        set((state) => ({
          apps: [...state.apps, app],
        })),
      removeApp: (id: number) =>
        set((state) => ({
          apps: state.apps.filter((app) => app.id !== id),
        })),
      updateApp: (id: number, updatedApp: Partial<App>) =>
        set((state) => ({
          apps: state.apps.map((app) =>
            app.id === id ? { ...app, ...updatedApp } : app
          ),
        })),
      getAppById: (id: number) => {
        return get().apps.find((app) => app.id === id);
      },
      getAppsByCategory: (category: string) => {
        return get().apps.filter((app) => app.category === category);
      },
      getSpotlightApps: () => {
        return get().apps.filter((app) => app.isSpotlight);
      },
    }),
    {
      name: "_apps",
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

