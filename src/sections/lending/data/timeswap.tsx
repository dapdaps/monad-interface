import axios from 'axios';
import LabelValue from '@/sections/lending/components/label-value';
import LazyImage from '@/components/layz-image';
import { numberFormatter } from '@/utils/number-formatter';
import ActionVisibleButton from '@/sections/lending/components/action-visible-button';
import { LENDING_ACTION_TYPE_MAP, LendingAction } from '@/sections/lending/config';
import Big from 'big.js';

export const timeswap = (dAppConfig: any) => {
  return new Promise((resolve) => {
    const { poolListApi, markets } = dAppConfig;
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
            expandRender: (
              row: any,
              idx: number,
              options: {
                handleCurrentAction: (params?: { action?: LendingAction; visible?: boolean; market?: any; }) => void;
              }
            ) => {
              const toggleTransitionPriceDirection = () => {
                row.transitionPriceDirection = !row.transitionPriceDirection;
              };

              return (
                <>
                  <div className="flex flex-col gap-[16px] items-stretch flex-1">
                    <LabelValue label="Liquidity">
                      <LazyImage
                        src={row.tokens[0].icon}
                        width={18}
                        height={18}
                        containerClassName="border border-[#3E3965] rounded-full overflow-hidden shrink-0"
                      />
                      <div className="">
                        {numberFormatter(
                          Big(row.poolData?.liquidity?.token1LongBalance ?? 0).div(10 ** (row.poolData?.pool?.token1?.decimals ?? 0)),
                          0,
                          true,
                          { round: 0 }
                        )}
                      </div>
                    </LabelValue>
                    <LabelValue label="Total Volume">
                      {numberFormatter(row.poolData?.volume, 2, true, { prefix: "$" })}
                    </LabelValue>
                    <LabelValue label="Transition Price">
                      <div className="">
                        {numberFormatter(row[row.transitionPriceDirection ? "transitionPrice01" : "transitionPrice10"], 2, true)}
                      </div>
                      <div className="text-[#A6A6DB]">
                        {
                          row.transitionPriceDirection
                            ? row.tokens.map((t: any) => t.symbol).join("/")
                            : row.tokens.map((t: any) => t.symbol).reverse().join("/")
                        }
                      </div>
                      <button
                        type="button"
                        className=""
                        onClick={toggleTransitionPriceDirection}
                      >
                        <img src="/images/lending/icon-exchange.png" alt="" className="shrink-0 w-[14px] object-contain object-center" />
                      </button>
                    </LabelValue>
                  </div>
                  <div className="flex items-center justify-end pr-[10px] gap-[12px] w-[384px] shrink-0">
                    <ActionVisibleButton
                      icon={LENDING_ACTION_TYPE_MAP.deposit.icon}
                      onClick={() => {
                        options.handleCurrentAction({
                          action: LENDING_ACTION_TYPE_MAP.deposit,
                          visible: true,
                          market: row,
                        });
                      }}
                    >
                      {LENDING_ACTION_TYPE_MAP.deposit.label}
                    </ActionVisibleButton>
                    <ActionVisibleButton
                      icon={LENDING_ACTION_TYPE_MAP.borrow.icon}
                      onClick={() => {
                        options.handleCurrentAction({
                          action: LENDING_ACTION_TYPE_MAP.borrow,
                          visible: true,
                          market: row,
                        });
                      }}
                    >
                      {LENDING_ACTION_TYPE_MAP.borrow.label}
                    </ActionVisibleButton>
                  </div>
                </>
              );
            }
          };
        })
      );
    }).catch((err) => {
      console.log('load timeswap data failed: %o', err);
      resolve(markets);
    });
  });
};
