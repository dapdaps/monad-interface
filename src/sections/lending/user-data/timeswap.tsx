import { ethers } from 'ethers';
import Big from 'big.js';
import { numberRemoveEndZero } from '@/utils/number-formatter';

export const timeswap = async (params: any) => {
  const { config, markets, provider, account } = params;

  const contract = new ethers.Contract(
    config.timeswapV2TokenNft,
    POSITION_ABI,
    provider
  );

  const readPosition = async (readParams: { contractParams: (market?: any) => any[]; method: string; }) => {
    const { contractParams, method } = readParams;

    const results = await Promise.allSettled(
      markets.map(async (market: any) => {
        try {
          const _contractParams = contractParams(market);
          const res = await contract[method](..._contractParams);
          return {
            id: market.id,
            positionOf: ethers.utils.formatUnits(res, market.poolData.pool.token1.decimals)
          };
        } catch (err) {
          console.warn(`Failed to load user-data for market ${market.id}:`, err);
          return null;
        }
      })
    );

    return results
      .map(result => result.status === 'fulfilled' ? result.value : null)
      .filter(Boolean);
  };

  const [borrowPositionOfs, lendPositionOfs] = await Promise.all([
    readPosition({
      method: "positionOf",
      contractParams: (market) => ([
        account,
        {
          token0: market.poolData.pool.token0.address,
          token1: market.poolData.pool.token1.address,
          strike: market.poolData.pool.strike,
          maturity: market.poolData.pool.maturity,
          position: 0, // borrowed debt position
        }
      ]),
    }),
    readPosition({
      method: "positionOf",
      contractParams: (market) => ([
        account,
        {
          token0: market.poolData.pool.token0.address,
          token1: market.poolData.pool.token1.address,
          strike: market.poolData.pool.strike,
          maturity: market.poolData.pool.maturity,
          position: 2, // lending position
        }
      ]),
    })
  ]);

  return markets.reduce((acc: any, market: any) => {
    acc[market.id] = {
      lendBalance: lendPositionOfs.find((it: any) => it.id === market.id)?.positionOf ?? "0",
      borrowBalance: borrowPositionOfs.find((it: any) => it.id === market.id)?.positionOf ?? "0",
    };
    const currDecimals = (market.poolData?.pool.isToken1Base ? market.poolData.pool.token1.decimals : market.poolData?.pool.token0.decimals) ?? market.tokens[0].decimals;
    acc[market.id].lendBalance = Big(acc[market.id].lendBalance).div(10 ** (18 - currDecimals)).toFixed(currDecimals, Big.roundDown);
    acc[market.id].borrowBalance = Big(acc[market.id].borrowBalance).div(10 ** (18 - currDecimals)).toFixed(currDecimals, Big.roundDown);
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
