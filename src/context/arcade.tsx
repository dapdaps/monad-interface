import SwapModal from "@/sections/swap/SwapModal";
import { createContext, useContext, useState } from "react";
import { monad } from "@/configs/tokens/monad-testnet";

interface IArcadeContext {
  setShowSwapModal: (show: boolean) => void;
}

const ArcadeContext = createContext<Partial<IArcadeContext>>({});

export const useArcadeContext = () => {
  return useContext(ArcadeContext);
}

export const ArcadeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [targetToken] = useState(monad["mon"]);

  return (
    <ArcadeContext.Provider
      value={{
        setShowSwapModal,
      }}
    >
      {children}
      {showSwapModal && (
        <SwapModal
          show={showSwapModal}
          defaultOutputCurrency={targetToken}
          outputCurrencyReadonly
          onClose={() => {
            setShowSwapModal(false);
          }}
          from="marketplace"
        />
      )}
    </ArcadeContext.Provider>
  );
};
