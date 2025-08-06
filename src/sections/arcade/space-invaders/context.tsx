'use client';

import { createContext, ReactNode, useContext } from 'react';
import { SpaceInvaders } from './hooks';

export const SpaceInvadersContext = createContext<Partial<SpaceInvaders>>({});

function SpaceInvadersContextProvider({ children, value }: { children: ReactNode; value: Partial<SpaceInvaders> }) {
  return (
    <SpaceInvadersContext.Provider value={{ ...value }}>
      {children}
    </SpaceInvadersContext.Provider>
  );
}

export default SpaceInvadersContextProvider;

export const useSpaceInvadersContext = () => {
  return useContext(SpaceInvadersContext);
}
