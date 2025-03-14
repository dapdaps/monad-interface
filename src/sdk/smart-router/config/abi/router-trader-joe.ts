export default [
  {
    inputs: [
      { internalType: "address", name: "logic", type: "address" },
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bytes", name: "route", type: "bytes" }
    ],
    name: "swapExactIn",
    outputs: [
      { internalType: "uint256", name: "totalIn", type: "uint256" },
      { internalType: "uint256", name: "totalOut", type: "uint256" }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "logic", type: "address" },
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bytes", name: "route", type: "bytes" }
    ],
    name: "swapExactOut",
    outputs: [
      { internalType: "uint256", name: "totalIn", type: "uint256" },
      { internalType: "uint256", name: "totalOut", type: "uint256" }
    ],
    stateMutability: "payable",
    type: "function"
  }
];
