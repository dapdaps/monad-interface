export default [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "route",
        type: "bytes"
      }
    ],
    name: "decodeRoute",
    outputs: [
      {
        internalType: "uint256",
        name: "nbTokens",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "isTransferTax",
        type: "bool"
      },
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]"
      },
      {
        components: [
          {
            internalType: "address",
            name: "pair",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "percent",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "flags",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "tokenInId",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "tokenOutId",
            type: "uint256"
          }
        ],
        internalType: "struct RouteDecoder.Swap[]",
        name: "swaps",
        type: "tuple[]"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "nbTokens",
        type: "uint8"
      },
      {
        internalType: "bool",
        name: "isTransferTax",
        type: "bool"
      },
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]"
      },
      {
        internalType: "address[]",
        name: "pairs",
        type: "address[]"
      },
      {
        internalType: "uint16[]",
        name: "percents",
        type: "uint16[]"
      },
      {
        internalType: "uint16[]",
        name: "flags",
        type: "uint16[]"
      },
      {
        internalType: "uint8[]",
        name: "tokenInIds",
        type: "uint8[]"
      },
      {
        internalType: "uint8[]",
        name: "tokenOutIds",
        type: "uint8[]"
      }
    ],
    name: "encodeRoute",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "dexId",
        type: "uint8"
      },
      {
        internalType: "bool",
        name: "zeroForOne",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "callback",
        type: "bool"
      }
    ],
    name: "generateFlags",
    outputs: [
      {
        internalType: "uint16",
        name: "flags",
        type: "uint16"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "flags",
        type: "uint16"
      }
    ],
    name: "parseFlags",
    outputs: [
      {
        internalType: "uint8",
        name: "dexId",
        type: "uint8"
      },
      {
        internalType: "bool",
        name: "zeroForOne",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "callback",
        type: "bool"
      }
    ],
    stateMutability: "pure",
    type: "function"
  }
];
