import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import { useAmount } from '@/sections/lending/hooks/amount';
import DescriptionTitle from '@/sections/lending/components/description-title';
import { numberFormatter } from '@/utils/number-formatter';
import { LENDING_ACTION_TYPE_MAP, LendingAmountChangeParams } from '@/sections/lending/config';
import LazyImage from '@/components/layz-image';
import { useEffect } from 'react';
import LabelValue from '@/sections/lending/components/label-value';
import Big from 'big.js';

const RepayForm = (props: any) => {
  const { className, market, config, action, onClose } = props;

  const {
    amount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onWithdraw,
    balance,
    balanceLoading,
    balanceToken,
    token0Balance,
  } = useAmount({ market, config, onClose, action });

  const actionText = LENDING_ACTION_TYPE_MAP.repay.label;

  useEffect(() => {
    handleAmountChange(balance);
  }, [balance]);

  return (
    <LendingActionCard
      className={clsx("", className)}
      title={actionText}
      market={market}
      token={balanceToken}
      amount={amount}
      spender={config?.repayContract}
      errorTips={errorTips}
      loading={pending}
      onClick={() => {
        onWithdraw();
      }}
      disabled={pending}
      onRefresh={() => {}}
      updater={`button-${updater}`}
      text={actionText}
    >
      <LendingAmountInput
        value={amount}
        onChange={(res: LendingAmountChangeParams) => {
          handleAmountChange(res.value);
        }}
        title="Debt to Clear"
        token={market?.tokens?.[0]}
        balance={balance}
        balanceLoading={balanceLoading}
        balanceToken={balanceToken}
      />
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
    </LendingActionCard>
  );
};

export default RepayForm;
