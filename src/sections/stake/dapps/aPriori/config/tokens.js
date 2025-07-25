import { monadTestnet } from "viem/chains";
export const APRIORI_CONTRACT_ADDRESS = '0xb2f82D0f38dc453D596Ad40A37799446Cc89274A';

export default [
    {
        address: "0x0000000000000000000000000000000000000000",
        chainId: monadTestnet.id,
        decimals: 18,
        isNative: true,
    },
    {
        address: APRIORI_CONTRACT_ADDRESS,
        chainId: monadTestnet.id,
        decimals: 18,
        isNative: false,
    }
]