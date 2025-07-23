import axios from 'axios';
import LabelValue from '@/sections/lending/components/label-value';
import LazyImage from '@/components/layz-image';
import { numberFormatter } from '@/utils/number-formatter';
import ActionVisibleButton from '@/sections/lending/components/action-visible-button';
import { LENDING_ACTION_TYPE_MAP, LendingAction } from '@/sections/lending/config';
import Big from 'big.js';
import { DEFAULT_CHAIN_ID } from '@/configs';
import { monad as monadTestnetTokens } from "@/configs/tokens/monad-testnet";

export const timeswap = (params: any) => {
  const { config } = params;

  return new Promise((resolve) => {
    const { poolListApi, markets } = config;
    axios(poolListApi, {
      method: "get",
    }).then((res) => {
      const _data = res.data || [];
      const _markets = _data.filter((it: any) => it.pool?.chainId === DEFAULT_CHAIN_ID).map((pool: any) => {
        const _market = markets.find((it: any) => {
          return it.id === pool.id;
        });
        const _tokens = [pool.pool?.isToken1Base ? pool.pool?.token1 : pool.pool?.token0, pool.pool?.isToken1Base ? pool.pool?.token0 : pool.pool?.token1];
        _tokens.forEach((it: any) => {
          const _currentToken = Object.values(monadTestnetTokens).find((token: any) => token.address.toLowerCase() === it.address.toLowerCase());
          it.icon = _currentToken ? _currentToken.icon : ""
        });
        return {
          ..._market,
          id: pool.id,
          tokens: _tokens,
          poolData: pool,
          transitionPriceDirection: true,
          // 👇used for order
          tvl: pool?.tvl,
          apr: pool?.apr,
          cdp: pool?.cdp,
          maturity: pool?.maturity,
          isExpeired: pool?.maturity < Date.now() / 1000,
        };
      });
      const unExpeiredPools = _markets.filter((it: any) => !it.isExpeired);
      resolve({
        markets: unExpeiredPools,
        allMarkets: _markets,
      });
    }).catch((err) => {
      console.log('load timeswap data failed: %o', err);
      resolve({});
    });
  });
};
