import DescriptionTitle from '@/sections/lending/components/description-title';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';

const TimeSwap = (props: any) => {
  const {
    market,
    config,
    action,
    onClose,
    amount,
    actionAmount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onWithdraw,
    balance,
    balanceLoading,
    balanceToken,
  } = props;

  return (
    <>
      <div className="mt-[26px]">
        <DescriptionTitle
          descriptionClassName="w-[318px]"
          description={`The amount you are expected to receive after maturity. When borrowers repay their ${market?.tokens?.[0]?.symbol} debt, expect to receive ${market?.tokens?.[0]?.symbol}. When they forego their ${market?.tokens?.[1]?.symbol} collateral, expect to receive ${market?.tokens?.[1]?.symbol}.`}
        >
          Amount at Maturity
        </DescriptionTitle>
      </div>
      <div className="flex justify-between items-start mt-[16px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
        <div className="">
          <div>
            Est. {market?.tokens?.[0]?.symbol}
          </div>
          <div className="text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal mt-[8px]">
            {numberFormatter(amount, 4, true, { round: 0 })}
          </div>
        </div>
        <div className="">
          Or
        </div>
        <div className="text-right">
          <div>
            Est. {market?.tokens?.[1]?.symbol}
          </div>
          <div className="text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal mt-[8px]">
            {numberFormatter(Big(amount || 0).times(market?.transitionPrice01 || 1), 4, true, { round: 0 })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSwap;
