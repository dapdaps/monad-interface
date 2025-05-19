import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSoundStore = create(
  persist<any>(
    (set) => ({
      muted: true,
      conveyorBeltRef: null,
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: "_sound_0519",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);