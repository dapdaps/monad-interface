'use client';

import { createContext, ReactNode, useContext } from 'react';

export const StakeContext = createContext<any>({});

function StakeContextProvider({ children, value }: { children: ReactNode; value?: any; }) {

  return (
    <StakeContext.Provider value={value} >
      {children}
    </StakeContext.Provider>
  );
}

export default StakeContextProvider;

export function useStakeContext() {
  return useContext(StakeContext);
}
