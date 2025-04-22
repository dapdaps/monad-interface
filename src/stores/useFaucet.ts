import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useFaucetStore = create(
  persist<RpcStore>(
    (set) => ({
      // muted: false,
      // conveyorBeltRef: null,
      showRule: true,
      set: (params: any) => set(() => ({ ...params })),
    }),
    {
      name: "_faucet_",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);