import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import { useAmount } from '@/sections/lending/hooks/amount';
import DescriptionTitle from '@/sections/lending/components/description-title';
import { numberFormatter } from '@/utils/number-formatter';
import { LENDING_ACTION_TYPE_MAP, LendingAmountChangeParams } from '@/sections/lending/config';
import LendingWarning from '@/sections/lending/components/warning';
import LazyImage from '@/components/layz-image';
import { useEffect } from 'react';
import { Contract } from 'ethers';
import useCustomAccount from '@/hooks/use-account';
import { MAX_APPROVE } from '@/hooks/use-approve';

const WithdrawForm = (props: any) => {
  const { className, market, config, action, onClose } = props;

  const {
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
  } = useAmount({ market, config, onClose, action });
  const { account } = useCustomAccount();

  const isTimeSwap = config.name === "Timeswap";

  const actionText = isTimeSwap ? LENDING_ACTION_TYPE_MAP.withdraw.labelAlias : LENDING_ACTION_TYPE_MAP.withdraw.label;

  useEffect(() => {
    handleAmountChange(market.balance);
  }, [market.balance]);

  return (
    <LendingActionCard
      className={clsx("", className)}
      title={actionText}
      market={market}
      token={balanceToken}
      amount={actionAmount}
      spender={config?.closeLendContract}
      errorTips={errorTips}
      loading={pending}
      onClick={() => {
        onWithdraw();
      }}
      disabled={pending}
      onRefresh={() => {}}
      updater={`button-${updater}`}
      text={actionText}
      onApprove={isTimeSwap ? (approveProps: any) => {
        const TokenContract = new Contract(
          approveProps.token.address,
          [
            {
              inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "bool", name: "all", type: "bool" }
              ],
              name: "setApprovalForAll",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "nonpayable",
              type: "function"
            }
          ],
          approveProps.signer
        );
        return TokenContract.setApprovalForAll(approveProps.spender, true);
      } : void 0}
      onCheckApproved={isTimeSwap ? async (approveProps: any) => {
        const TokenContract = new Contract(
          approveProps.token.address,
          [
            {
              inputs: [
                { internalType: "address", name: "account", type: "address" },
                { internalType: "address", name: "spender", type: "address" }
              ],
              name: "isApprovedForAll",
              outputs: [{ internalType: "bool", name: "", type: "bool" }],
              stateMutability: "nonpayable",
              type: "function"
            }
          ],
          approveProps.signer
        );
        const approved = await TokenContract.callStatic.isApprovedForAll(account, approveProps.spender);
        if (approved) {
          return MAX_APPROVE;
        }
        return "0";
      } : void 0}
    >
      <LendingAmountInput
        disabled={true}
        isBalance={false}
        value={amount}
        onChange={(res: LendingAmountChangeParams) => {
          handleAmountChange(res.value);
        }}
        title="Total Amount Lent"
        token={market?.tokens?.[0]}
        balance={balance}
        balanceLoading={balanceLoading}
        balanceToken={balanceToken}
      />
      <div className="mt-[26px]">
        Amount to claim
      </div>
      <div className="flex justify-between items-start mt-[16px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
        <div className="">
          <div className="flex items-center gap-[4px]">
            <LazyImage src={market?.tokens?.[0]?.icon} width={16} height={16} containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0" />
            <div>{market?.tokens?.[0]?.symbol}</div>
          </div>
          <DescriptionTitle
            className="!text-white !text-[12px]"
            descriptionClassName="!p-[5px_10px]"
            triggerContainerClassName="mt-[8px]"
            description={numberFormatter(amount, market?.tokens?.[0]?.decimals, true, { round: 0 })}
          >
            {numberFormatter(amount, 4, true, { round: 0 })}
          </DescriptionTitle>
        </div>
        <div className="">
          &
        </div>
        <div className="text-right">
          <div className="flex items-center gap-[4px]">
            <LazyImage src={market?.tokens?.[1]?.icon} width={16} height={16} containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0" />
            <div>{market?.tokens?.[1]?.symbol}</div>
          </div>
          <DescriptionTitle
            className="!text-white !text-[12px]"
            descriptionClassName="!p-[5px_10px]"
            triggerContainerClassName="mt-[8px]"
            description={numberFormatter(0, market?.tokens?.[0]?.decimals, true, { round: 0 })}
          >
            {numberFormatter(0, 4, true, { round: 0 })}
          </DescriptionTitle>
        </div>
      </div>
      <div className="flex justify-between items-center gap-[5px] mt-[16px]">
        <DescriptionTitle
          descriptionClassName="w-[240px]"
          description="The percentage deviation between the total amount lent vs the amount being claimed now"
        >
          Slippage
        </DescriptionTitle>
        <div className="text-[#e95567]">
          {numberFormatter(0.009, 2, true, { round: 0 })}%
        </div>
      </div>
      <LendingWarning className="mt-[15px]">
        Closing lend positions before maturity depends on current liquidity and interest rate in pool, you may incur losses due to slippage. Close your lend positions after maturity for minimal slippage.
      </LendingWarning>
    </LendingActionCard>
  );
};

export default WithdrawForm;
