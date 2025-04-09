import { createContext, ReactNode, useContext } from 'react';
import { Lending } from '@/sections/lending/hooks';

interface ContextValue extends Lending {

}

export const LendingContext = createContext<Partial<ContextValue>>({});

function LendingContextProvider({ children, value }: { children: ReactNode; value: ContextValue; }) {
  return (
    <LendingContext.Provider value={value}>
      {children}
    </LendingContext.Provider>
  );
}

export default LendingContextProvider;

export function useLendingContext(): ContextValue {
  return useContext(LendingContext) as ContextValue;
}
