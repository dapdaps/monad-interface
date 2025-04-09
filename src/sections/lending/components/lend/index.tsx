import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import { useAmount } from '@/sections/lending/hooks/amount';
import DescriptionTitle from '@/sections/lending/components/description-title';

const LendForm = (props: any) => {
  const { className, market } = props;

  const {
    amount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onLend,
  } = useAmount();

  return (
    <LendingActionCard
      className={clsx("", className)}
      amount={amount}
      spender={market?.lendContract}
      errorTips={errorTips}
      token={market?.tokens?.[0]}
      loading={pending}
      onClick={onLend}
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
            Est. WMONAD
          </div>
          <div className="text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal mt-[8px]">
            0
          </div>
        </div>
        <div className="">
          Or
        </div>
        <div className="text-right">
          <div>
            Est. shMON
          </div>
          <div className="text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal mt-[8px]">
            0
          </div>
        </div>
      </div>
    </LendingActionCard>
  );
};

export default LendForm;
