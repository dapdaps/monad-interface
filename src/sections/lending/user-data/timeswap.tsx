import { ethers } from 'ethers';
import { numberRemoveEndZero } from '@/utils/number-formatter';
import { multicall, multicallAddresses } from '@/utils/multicall';
import { DEFAULT_CHAIN_ID } from '@/configs';

export const timeswap = async (params: any) => {
  const { config, markets, provider, account } = params;

  const multicallAddress = multicallAddresses[DEFAULT_CHAIN_ID];

  const readPosition = async () => {
    const calls: any = [];
    // 0: borrowed debt position
    // 1: lending position
    markets.forEach((market: any) => {
      calls.push({
        address: config.timeswapV2TokenNft,
        name: "positionOf",
        params: [
          account,
          {
            token0: market.poolData.pool.token0.address,
            token1: market.poolData.pool.token1.address,
            strike: market.poolData.pool.strike,
            maturity: market.poolData.pool.maturity,
            position: 0, // borrowed debt position
          }
        ]
      });
      calls.push({
        address: config.timeswapV2TokenNft,
        name: "positionOf",
        params: [
          account,
          {
            token0: market.poolData.pool.token0.address,
            token1: market.poolData.pool.token1.address,
            strike: market.poolData.pool.strike,
            maturity: market.poolData.pool.maturity,
            position: 2, // lending position
          }
        ]
      });
    });

    const result = await multicall({
      abi: POSITION_ABI,
      calls,
      options: {},
      multicallAddress,
      provider
    });

    const borrowPositionOfs: any = [];
    const lendPositionOfs: any = [];
    markets.forEach((market: any, index: number) => {
      const currentLendDecimals = market.poolData?.pool.isToken1Base ? market.poolData.pool.token1.decimals : market.poolData?.pool.token0.decimals;
      const currentBorrowDecimals = market.poolData?.pool.isToken1Base ? market.poolData.pool.token0.decimals : market.poolData?.pool.token1.decimals;
      const [borrowPositionOf] = result[index + (index + 0)] || [];
      const [lendPositionOf] = result[index + (index + 1)] || [];
      borrowPositionOfs.push({
        id: market.id,
        positionOf: ethers.utils.formatUnits(borrowPositionOf || "0", currentBorrowDecimals),
      });
      lendPositionOfs.push({
        id: market.id,
        positionOf: ethers.utils.formatUnits(lendPositionOf || "0", currentLendDecimals),
      });
    });

    return {
      lendPositionOfs,
      borrowPositionOfs,
    };
  };

  const { borrowPositionOfs, lendPositionOfs } = await readPosition();

  return markets.reduce((acc: any, market: any) => {
    acc[market.id] = {
      lendBalance: lendPositionOfs.find((it: any) => it.id === market.id)?.positionOf ?? "0",
      borrowBalance: borrowPositionOfs.find((it: any) => it.id === market.id)?.positionOf ?? "0",
    };
    acc[market.id].lendBalance = numberRemoveEndZero(acc[market.id].lendBalance);
    acc[market.id].borrowBalance = numberRemoveEndZero(acc[market.id].borrowBalance);
    return acc;
  }, {});
};

const POSITION_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      {
        components: [
          { internalType: 'address', name: 'token0', type: 'address' },
          { internalType: 'address', name: 'token1', type: 'address' },
          { internalType: 'uint256', name: 'strike', type: 'uint256' },
          { internalType: 'uint256', name: 'maturity', type: 'uint256' },
          { internalType: 'enum TimeswapV2OptionPosition', name: 'position', type: 'uint8' },
        ],
        internalType: 'struct TimeswapV2TokenPosition',
        name: 'timeswapV2TokenPosition',
        type: 'tuple',
      },
    ],
    name: 'positionOf',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
