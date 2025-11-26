// 0x56b0202B1C9b4887871D16822dB1fD32F1eF4662 contract is for mainnet environment
const RPS_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_API === "https://mainnet-api-monad.dapdap.net" ? "0x56b0202B1C9b4887871D16822dB1fD32F1eF4662" : "";
export default RPS_CONTRACT_ADDRESS;
