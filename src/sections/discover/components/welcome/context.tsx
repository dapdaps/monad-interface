import { createContext, useContext } from "react";
import { EWelcomeStatus } from "./config";

export type TShareType = "share" | "download";

export interface IShareOpen {
  open: boolean;
  type?: TShareType;
}

export interface IWelcomeContext {
  status: EWelcomeStatus;
  setStatus: (status: EWelcomeStatus) => void;
  shareOpen: IShareOpen;
  setShareOpen: (param: IShareOpen) => void;
  bonus: any;
  setBonus: (bonus: any) => void;
}

const WelcomeContext = createContext<Partial<IWelcomeContext>>({});

export const useWelcomeContext = () => {
  return useContext(WelcomeContext);
};

export const WelcomeProvider = ({ children, value }: { children: React.ReactNode, value: Partial<IWelcomeContext> }) => {
  return <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>;
};
