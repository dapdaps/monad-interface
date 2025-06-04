

// UI
import App from "./App";
import { PrivyProvider } from "@privy-io/react-auth";

// Utils
import { monadTestnet } from "viem/chains";


export default function Game2048() {
    return (
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
            <App />
        </PrivyProvider>
    );
}