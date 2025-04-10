import { useLendingContext } from '@/sections/lending/context';
import LabelValue from '@/sections/lending/components/label-value';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import LazyImage from '@/components/layz-image';
import ActionVisibleButton from '@/sections/lending/components/action-visible-button';
import { LENDING_ACTION_TYPE_MAP } from '@/sections/lending/config';

const TimeSwap = (props: any) => {
  // ⚠️if you want to add other parameters, please add them in the expand-table component
  const { row, rowIndex } = props;

  const {
    handleCurrentAction,
  } = useLendingContext();

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
              row.poolData?.pool?.isToken1Base
                ? Big(row.poolData?.liquidity?.token1LongBalance ?? 0).div(10 ** (row.poolData?.pool?.token1?.decimals ?? 0))
                : Big(row.poolData?.liquidity?.token0LongBalance ?? 0).div(10 ** (row.poolData?.pool?.token0?.decimals ?? 0)),
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
      <div className="flex items-center justify-end pr-[10px] gap-[12px] w-[384px] shrink-0 md:w-full md:justify-between md:pr-0">
        <ActionVisibleButton
          icon={LENDING_ACTION_TYPE_MAP.deposit.icon}
          onClick={() => {
            handleCurrentAction({
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
            handleCurrentAction({
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
};

export default TimeSwap;
