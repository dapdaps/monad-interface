import { PrivyProvider } from "@privy-io/react-auth";
import { monadTestnet } from "viem/chains";
import { createContext, useContext, useState } from 'react';
import PrivyLogin from "../privy-login";
import PrivyWallet from "../privy-wallet";


export const PrivyContext = createContext<any>('');
const { Provider } = PrivyContext;
export default function GamePrivyProvider({ children }: { children: React.ReactNode }) {
    const [openDeposit, setOpenDeposit] = useState(false);

    return (
        <Provider value={{
            openDeposit,
            setOpenDeposit,
        }}>
            <PrivyProvider
                appId={'cmbgmatho012fl90mlki6e324'}
                config={{
                    appearance: {
                        theme: "light",
                        walletChainType: "ethereum-only",
                    },
                    defaultChain: monadTestnet,
                    supportedChains: [monadTestnet],
                    loginMethods: ["google", "passkey", "wallet", "email", "github"],
                    embeddedWallets: {
                        ethereum: { createOnLogin: "all-users" },
                    },

                }}
            >
                {children}
                <PrivyLogin />
                <PrivyWallet />
            </PrivyProvider>
        </Provider>
    );
}
