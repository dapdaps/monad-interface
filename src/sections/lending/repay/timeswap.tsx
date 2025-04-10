import LazyImage from '@/components/layz-image';
import DescriptionTitle from '@/sections/lending/components/description-title';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import LabelValue from '@/sections/lending/components/label-value';

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
    token0Balance,
  } = props;

  return (
    <div className="mt-[26px]">
      <LabelValue label="Total Collateral Locked">
        <DescriptionTitle
          descriptionClassName="!p-[5px_10px]"
          description={numberFormatter(market.balance, market.tokens[1].decimals, true, { isZeroPrecision: true })}
        >
          {numberFormatter(market.balance, 4, true, { isZeroPrecision: true })}
        </DescriptionTitle>
        <LazyImage src={market?.tokens?.[1]?.icon} width={16} height={16} containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0" />
      </LabelValue>
      <LabelValue label="Collateral to Unlock" className="mt-[16px]">
        <DescriptionTitle
          descriptionClassName="!p-[5px_10px]"
          description={numberFormatter(Big(amount || 0).div(market.transitionPrice10), market.tokens[1].decimals, true, { isZeroPrecision: true })}
        >
          {numberFormatter(Big(amount || 0).div(market.transitionPrice10), 4, true, { isZeroPrecision: true })}
        </DescriptionTitle>
        <LazyImage src={market?.tokens?.[1]?.icon} width={16} height={16} containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0" />
      </LabelValue>
      <LabelValue label={`${market?.tokens?.[0]?.symbol} Balance`} className="mt-[16px]">
        <DescriptionTitle
          descriptionClassName="!p-[5px_10px]"
          description={numberFormatter(token0Balance, market.tokens[0].decimals, true, { round: 0 })}
        >
          {numberFormatter(token0Balance, 4, true, { isZeroPrecision: true, round: 0 })}
        </DescriptionTitle>
        <LazyImage src={market?.tokens?.[0]?.icon} width={16} height={16} containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0" />
      </LabelValue>
    </div>
  );
};

export default TimeSwap;
