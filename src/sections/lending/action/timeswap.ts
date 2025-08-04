import { ethers } from 'ethers';
import { LendingActionType } from '@/sections/lending/config';
import dayjs from 'dayjs';
import Big from 'big.js';

export const timeswap = async (actionParams: any) => {
  const { action, amount, actionAmount, config, market, signer, account, isCallStatic } = actionParams;

  let options: any = {};
  let params: any = [];
  let method: any = "";
  let contract: any = null;
  let currentToken = market.tokens[0];
  let actionToken = market.tokens[1];

  const parsedAmount = ethers.utils.parseUnits(
    amount,
    currentToken.decimals
  );
  const parsedActionAmount = ethers.utils.parseUnits(
    Big(actionAmount || 0).times(1.05).toFixed(actionToken.decimals),
    actionToken.decimals
  );

  if (currentToken.isNative) {
    options.value = parsedAmount;
  }

  if (action.value === LendingActionType.Lend) {
    contract = new ethers.Contract(
      config.lendContract,
      LEND_ABI,
      signer
    );
    method = "lendGivenPrincipal";
    params = [
      {
        token0: market.poolData.pool.token0.address,
        token1: market.poolData.pool.token1.address,
        strike: market.poolData.pool.strike,
        maturity: market.poolData.pool.maturity,
        to: account,
        isToken0: !market.poolData.pool.isToken1Base,
        tokenAmount: parsedAmount,
        minReturnAmount: 0,
        deadline: Math.floor(dayjs().add(20, "minutes").valueOf() / 1000),
      }
    ];
  }

  if (action.value === LendingActionType.Borrow) {
    contract = new ethers.Contract(
      config.borrowContract,
      BORROW_ABI,
      signer
    );
    method = "borrowGivenPrincipal";
    params = [
      {
        token0: market.poolData.pool.token0.address,
        token1: market.poolData.pool.token1.address,
        strike: market.poolData.pool.strike,
        maturity: market.poolData.pool.maturity,
        tokenTo: account,
        longTo: account,
        isToken0: !market.poolData.pool.isToken1Base,
        isLong0: true,
        tokenAmount: parsedAmount,
        maxPositionAmount: parsedActionAmount,
        deadline: Math.floor(dayjs().add(20, "minutes").valueOf() / 1000),
      }
    ];
  }

  if (action.value === LendingActionType.Withdraw) {
    contract = new ethers.Contract(
      config.withdrawContract,
      WITHDRAW_ABI,
      signer
    );
    method = "closeLendGivenPosition";
    params = [
      {
        token0: market.poolData.pool.token0.address,
        token1: market.poolData.pool.token1.address,
        strike: market.poolData.pool.strike,
        maturity: market.poolData.pool.maturity,
        to: account,
        isToken0: !market.poolData.pool.isToken1Base,
        positionAmount: parsedAmount,
        minToken0Amount: "0",
        minToken1Amount: "0",
        deadline: Math.floor(dayjs().add(20, "minutes").valueOf() / 1000),
      }
    ];
  }

  if (action.value === LendingActionType.Repay) {
    let repayPositionAmount = ethers.utils.parseUnits(actionAmount, actionToken.decimals);
    if (Big(actionAmount || 0).gte(market.balance)) {
      repayPositionAmount = ethers.utils.parseUnits(market.balance, actionToken.decimals);
    }

    contract = new ethers.Contract(
      config.repayContract,
      REPAY_ABI,
      signer
    );
    method = "closeBorrowGivenPosition";
    params = [
      {
        token0: market.poolData.pool.token0.address,
        token1: market.poolData.pool.token1.address,
        strike: market.poolData.pool.strike,
        maturity: market.poolData.pool.maturity,
        to: account,
        isToken0: !market.poolData.pool.isToken1Base,
        isLong0: true,
        positionAmount: repayPositionAmount,
        maxTokenAmount: parsedAmount,
        deadline: Math.floor(dayjs().add(20, "minutes").valueOf() / 1000),
      }
    ];
  }

  return new Promise((resolve, reject) => {
    const _contract = isCallStatic ? contract.callStatic : contract;
    const createTx = (gas?: any) => {
      const _gas = gas ? Big(gas.toString()).mul(1.2).toFixed(0) : 4000000;
      _contract[method](...params, {
        ...options,
        gasLimit: _gas
      }).then((tx: any) => {
        resolve(tx);
      }) .catch((err: any) => {
        console.log("%s failed: %o", action.label, err);
        reject(err);
      });
    };

    contract.estimateGas[method](...params, options)
      .then((gas: any) => {
        createTx(gas);
      })
      .catch((err: any) => {
        console.log("estimateGas failed: %o", err);
        createTx();
      });
  });
};

const LEND_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'token0', type: 'address' },
          { internalType: 'address', name: 'token1', type: 'address' },
          { internalType: 'uint256', name: 'strike', type: 'uint256' },
          { internalType: 'uint256', name: 'maturity', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'bool', name: 'isToken0', type: 'bool' },
          { internalType: 'uint256', name: 'tokenAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'minReturnAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' }
        ],
        internalType: 'struct TimeswapV2PeripheryNoDexLendGivenPrincipalParam',
        name: 'param',
        type: 'tuple'
      }
    ],
    name: 'lendGivenPrincipal',
    outputs: [
      { internalType: 'uint256', name: 'positionAmount', type: 'uint256' }
    ],
    stateMutability: 'payable',
    type: 'function'
  }
];

const BORROW_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'token0', type: 'address' },
          { internalType: 'address', name: 'token1', type: 'address' },
          { internalType: 'uint256', name: 'strike', type: 'uint256' },
          { internalType: 'uint256', name: 'maturity', type: 'uint256' },
          { internalType: 'address', name: 'tokenTo', type: 'address' },
          { internalType: 'address', name: 'longTo', type: 'address' },
          { internalType: 'bool', name: 'isToken0', type: 'bool' },
          { internalType: 'bool', name: 'isLong0', type: 'bool' },
          { internalType: 'uint256', name: 'tokenAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'maxPositionAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' }
        ],
        internalType: 'struct TimeswapV2PeripheryNoDexBorrowGivenPrincipalParam',
        name: 'param',
        type: 'tuple'
      }
    ],
    name: 'borrowGivenPrincipal',
    outputs: [
      { internalType: 'uint256', name: 'positionAmount', type: 'uint256' }
    ],
    stateMutability: 'payable',
    type: 'function'
  }
];

const WITHDRAW_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'token0', type: 'address' },
          { internalType: 'address', name: 'token1', type: 'address' },
          { internalType: 'uint256', name: 'strike', type: 'uint256' },
          { internalType: 'uint256', name: 'maturity', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'bool', name: 'isToken0', type: 'bool' },
          { internalType: 'uint256', name: 'positionAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'minToken0Amount', type: 'uint256' },
          { internalType: 'uint256', name: 'minToken1Amount', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct TimeswapV2PeripheryNoDexCloseLendGivenPositionParam',
        name: 'param',
        type: 'tuple',
      },
    ],
    name: 'closeLendGivenPosition',
    outputs: [
      { internalType: 'uint256', name: 'token0Amount', type: 'uint256' },
      { internalType: 'uint256', name: 'token1Amount', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const REPAY_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'token0', type: 'address' },
          { internalType: 'address', name: 'token1', type: 'address' },
          { internalType: 'uint256', name: 'strike', type: 'uint256' },
          { internalType: 'uint256', name: 'maturity', type: 'uint256' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'bool', name: 'isToken0', type: 'bool' },
          { internalType: 'bool', name: 'isLong0', type: 'bool' },
          { internalType: 'uint256', name: 'positionAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'maxTokenAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct TimeswapV2PeripheryNoDexCloseBorrowGivenPositionParam',
        name: 'param',
        type: 'tuple',
      },
    ],
    name: 'closeBorrowGivenPosition',
    outputs: [
      { internalType: 'uint256', name: 'tokenAmount', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
];
