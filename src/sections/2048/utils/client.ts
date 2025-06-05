import { monadTestnet } from "viem/chains";
import { createPublicClient, http } from "viem";
import { RPC_LIST } from "@/configs/rpc";

// const environment = import.meta.env.VITE_APP_ENVIRONMENT;
// const rpc =
//     environment === "prod"
//         ? import.meta.env.VITE_MONAD_RPC_URL! ||
//           monadTestnet.rpcUrls.default.http[0]
//         : monadTestnet.rpcUrls.default.http[0];

const rpc = RPC_LIST.default.url;

export const publicClient = createPublicClient({
    chain: monadTestnet,
    transport: http(rpc),
});
