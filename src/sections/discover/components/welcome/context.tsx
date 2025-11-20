import { createContext, useContext } from "react";
import { EWelcomeStatus } from "./config";

export interface IWelcomeContext {
  status: EWelcomeStatus;
  setStatus: (status: EWelcomeStatus) => void;
}

const WelcomeContext = createContext<Partial<IWelcomeContext>>({});

export const useWelcomeContext = () => {
  return useContext(WelcomeContext);
};

export const WelcomeProvider = ({ children, value }: { children: React.ReactNode, value: Partial<IWelcomeContext> }) => {
  return <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>;
};
