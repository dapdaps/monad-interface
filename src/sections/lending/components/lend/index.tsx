import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import { useAmount } from '@/sections/lending/hooks/amount';
import DescriptionTitle from '@/sections/lending/components/description-title';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import { LendingAmountChangeParams } from '@/sections/lending/config';

const LendForm = (props: any) => {
  const { className, market, config, action, onClose } = props;

  const {
    amount,
    actionAmount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onLend,
    balance,
    balanceLoading,
    balanceToken,
  } = useAmount({ market, config, onClose, action });

  return (
    <LendingActionCard
      className={clsx("", className)}
      title="Lend"
      market={market}
      token={balanceToken}
      amount={actionAmount}
      spender={config?.lendContract}
      errorTips={errorTips}
      loading={pending}
      onClick={() => {
        onLend();
      }}
      disabled={pending}
      onRefresh={() => {}}
      updater={`button-${updater}`}
      text="Lend"
    >
      <LendingAmountInput
        value={amount}
        onChange={(res: LendingAmountChangeParams) => {
          handleAmountChange(res.value);
        }}
        title="Amount to Lend"
        token={market?.tokens?.[0]}
        balance={balance}
        balanceLoading={balanceLoading}
        balanceToken={balanceToken}
      />
      <div className="mt-[26px]">
        <DescriptionTitle
          descriptionClassName="w-[318px]"
          description="The amount you are expected to receive after maturity. When borrowers repay their WMONAD debt, expect to receive WMONAD. When they forego their shMON collateral, expect to receive shMON."
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
    </LendingActionCard>
  );
};

export default LendForm;
