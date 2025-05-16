import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TerminalState = {
  limit: Record<string, { lastPostTime: number; }>;
};

type TerminalStore = TerminalState & {
  setLimit: (address: string, params: { lastPostTime: number; }) => void;
};

export const useTerminalStore = create(persist<TerminalStore>(
  (set) => ({
    limit: {},
    setLimit: (address, params) => {
      set((prev) => {
        const _limit = { ...prev.limit };
        if (!_limit[address]) {
          _limit[address] = {
            lastPostTime: params.lastPostTime,
          };
        } else {
          _limit[address].lastPostTime = params.lastPostTime;
        }
        return { limit: _limit };
      });
    },
  }), {
    name: '_terminal',
    version: 0.1,
    storage: createJSONStorage(() => localStorage),
  })
);
