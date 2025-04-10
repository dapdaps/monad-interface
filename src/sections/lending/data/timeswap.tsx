import axios from 'axios';
import LabelValue from '@/sections/lending/components/label-value';
import LazyImage from '@/components/layz-image';
import { numberFormatter } from '@/utils/number-formatter';
import ActionVisibleButton from '@/sections/lending/components/action-visible-button';
import { LENDING_ACTION_TYPE_MAP, LendingAction } from '@/sections/lending/config';
import Big from 'big.js';

export const timeswap = (params: any) => {
  const { config } = params;

  return new Promise((resolve) => {
    const { poolListApi, markets } = config;
    axios(poolListApi, {
      method: "get",
    }).then((res) => {
      const _data = res.data || [];
      resolve(
        markets.map((market: any) => {
          const _pool = _data.find((it: any) => it.id.toLowerCase() === market.id.toLowerCase());
          return {
            ...market,
            poolData: _pool,
            transitionPriceDirection: true,
            // 👇used for order
            tvl: _pool?.tvl,
            apr: _pool?.apr,
            cdp: _pool?.cdp,
            maturity: _pool?.maturity,
          };
        })
      );
    }).catch((err) => {
      console.log('load timeswap data failed: %o', err);
      resolve(markets);
    });
  });
};
