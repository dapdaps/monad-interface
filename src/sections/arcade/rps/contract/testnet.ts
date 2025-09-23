const RPS_CONTRACT_ADDRESS = "0x86d09406CF19C0df816506eDf7FB7c1b712A5cdC";
export default RPS_CONTRACT_ADDRESS;

export const RPS_CONTRACT_ADDRESS_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "betAmount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "hiddenMovesA",
        "type": "bytes32"
      }
    ],
    "name": "initRoom",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
];
