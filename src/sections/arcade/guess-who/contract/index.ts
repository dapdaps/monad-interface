import { DEFAULT_CHAIN_ID } from "@/configs";
import { monadTestnet } from "viem/chains";
import RPS_CONTRACT_ADDRESS_TESTNET, { RPS_CONTRACT_ADDRESS_ABI } from "./testnet";
import RPS_CONTRACT_ADDRESS_MAINNET from "./mainnet";

export const RPS_CONTRACT_ADDRESS = DEFAULT_CHAIN_ID === monadTestnet.id ? RPS_CONTRACT_ADDRESS_TESTNET : RPS_CONTRACT_ADDRESS_MAINNET;
export { RPS_CONTRACT_ADDRESS_ABI };
