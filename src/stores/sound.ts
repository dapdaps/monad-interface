import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSoundStore = create((set) => ({
  muted: true,
  clippingRef: null,
  conveyorBeltRef: null,
  pressButtonRef: null,
  movingMachanicRef: null,
  set: (params: any) => set(() => ({ ...params })),
}));