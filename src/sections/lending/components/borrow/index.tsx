import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import DescriptionTitle from '@/sections/lending/components/description-title';
import { useAmount } from '@/sections/lending/hooks/amount';
import LendingWarning from '@/sections/lending/components/warning';

const BorrowForm = (props: any) => {
  const { className, market } = props;

  const {
    amount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onBorrow,
  } = useAmount();

  return (
    <LendingActionCard
      className={clsx("", className)}
      amount={amount}
      spender={market?.lendContract}
      errorTips={errorTips}
      token={market?.tokens?.[0]}
      loading={pending}
      onClick={onBorrow}
      disabled={pending}
      onRefresh={() => {}}
      updater={`button-${updater}`}
    >
      <LendingAmountInput
        value={amount}
        onChange={handleAmountChange}
        title="Amount to Lend"
        token={market?.tokens?.[0]}
        balance={0}
      />
      <div className="mt-[26px]">
        <div className="flex justify-between items-center">
          <DescriptionTitle
            descriptionClassName="w-[318px]"
            description="The amount of debt you have to repay at maturity"
          >
            Debt to Repay
          </DescriptionTitle>
          <div className="flex justify-end items-center gap-[4px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
            <div className="text-[#FFF]">
              0
            </div>
            <div className="">
              WMONAD
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[16px]">
          <DescriptionTitle
            descriptionClassName="w-[318px]"
            description="The amount of shMON collateral to be deposited, and the amount withdrawn when the debt is paid."
          >
            Collateral to Lock
          </DescriptionTitle>
          <div className="flex justify-end items-center gap-[4px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
            <div className="text-[#FFF]">
              0
            </div>
            <div className="">
              shMON
            </div>
          </div>
        </div>
      </div>
      <LendingWarning className="mt-[15px]">
        You have to repay the above debt <strong>before maturity</strong>, else you forfeit the collateral deposited.
      </LendingWarning>
    </LendingActionCard>
  );
};

export default BorrowForm;
