import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSoundStore = create(
  persist<RpcStore>(
    (set) => ({
      muted: false,
      conveyorBeltRef: null,
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: "_sound_",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);