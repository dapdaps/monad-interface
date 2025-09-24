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
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "roomId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "hiddenMovesB",
        "type": "bytes32"
      }
    ],
    "name": "joinRoom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "indexFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "indexTo",
        "type": "uint256"
      }
    ],
    "name": "getRoomsInfo",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "roomId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "playerA",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "playerB",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "bet",
                "type": "uint256"
              }
            ],
            "internalType": "struct RockPaperScissors.UniqRoomData",
            "name": "data",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "pot",
            "type": "uint256"
          },
          {
            "internalType": "enum RockPaperScissors.RoomStatus",
            "name": "status",
            "type": "uint8"
          },
          {
            "internalType": "enum RockPaperScissors.WinnerStatus",
            "name": "winnerStatus",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "encrMovesA",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "encrMovesB",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "createTime",
            "type": "uint64"
          }
        ],
        "internalType": "struct RockPaperScissors.RoomInfo[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "roomId",
        "type": "uint256"
      }
    ],
    "name": "canClaimTimeout",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "roomId",
        "type": "uint256"
      }
    ],
    "name": "claimTimeout",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];
