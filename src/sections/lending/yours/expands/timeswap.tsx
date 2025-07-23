import { useLendingContext } from '@/sections/lending/context';
import LabelValue from '@/sections/lending/components/label-value';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import LazyImage from '@/components/layz-image';
import ActionVisibleButton from '@/sections/lending/components/action-visible-button';
import { LENDING_ACTION_TYPE_MAP, LendingActionType } from '@/sections/lending/config';
import DescriptionTitle from '@/sections/lending/components/description-title';
import useApprove, { MAX_APPROVE } from '@/hooks/use-approve';
import { Contract } from 'ethers';
import { useMemo } from 'react';

const TimeSwap = (props: any) => {
  const { row, rowIndex } = props;

  const { type } = row;

  const { config } = useLendingContext();

  const [approveAmount, approveToken, approveSpender] = useMemo<any>(() => {
    return [
      "1",
      {
        address: config?.timeswapV2TokenNft,
        decimals: 18,
      },
      type.value === LendingActionType.Lend ? config?.withdrawContract : config?.repayContract
    ];
  }, [config, type]);

  const {
    approve: onRepayApprove,
    approved: repayApproved,
    approving: repayApproving,
    checking: repayChecking,
  } = useApprove({
    amount: approveAmount,
    token: approveToken,
    spender: approveSpender,
    onApprove,
    onCheckApproved,
  });
  const {
    approve: onWithdrawApprove,
    approved: withdrawApproved,
    approving: withdrawApproving,
    checking: withdrawChecking,
  } = useApprove({
    amount: approveAmount,
    token: approveToken,
    spender: approveSpender,
    onApprove,
    onCheckApproved,
  });

  const {
    handleCurrentAction,
  } = useLendingContext();

  return (
    <>
      <div className="flex flex-col gap-[16px] items-stretch flex-1">
        {
          type.value === LendingActionType.Lend && (
            <div className="px-[10px]">
              <LabelValue
                label={(
                  <DescriptionTitle
                    descriptionClassName="w-[300px]"
                    description={`The amount you are expected to receive after maturity. When borrowers repay their ${row?.tokens?.[1]?.symbol} debt or forego their ${row?.tokens?.[1]?.symbol} collateral, expect to receive ${row?.tokens?.[1]?.symbol}. When they repay their ${row?.tokens?.[0]?.symbol} debt or forego their ${row?.tokens?.[1]?.symbol} collateral, expect to receive ${row?.tokens?.[0]?.symbol}.`}
                  >
                    Amount at Maturity
                  </DescriptionTitle>
                )}
                className="md:flex-col md:items-start md:gap-[8px]"
              >
                <div className="flex items-center gap-[8px]">
                  <div className="flex items-center gap-[4px]">
                    <DescriptionTitle
                      descriptionClassName="!p-[5px_10px]"
                      className="!text-white"
                      description={numberFormatter(row.balance, row.tokens[0]?.decimals, true, { round: 0, isShort: true, isShortUppercase: true })}
                    >
                      {numberFormatter(row.balance, 4, true, { round: 0, isShort: true, isShortUppercase: true, isZeroPrecision: true })}
                    </DescriptionTitle>
                    <LazyImage
                      src={row.tokens[0].icon}
                      width={24}
                      height={24}
                      containerClassName="border border-[#3E3965] rounded-full overflow-hidden shrink-0"
                    />
                    <div className="text-[10px] text-[#A6A6DB]">{row.tokens[0].symbol}</div>
                  </div>
                  <div className="">/</div>
                  <div className="flex items-center gap-[4px]">
                    <DescriptionTitle
                      descriptionClassName="!p-[5px_10px]"
                      className="!text-white"
                      description={numberFormatter(Big(row.balance || 0).div(row.transitionPrice10 || 1), row.tokens[1]?.decimals, true, { round: 0, isShort: true, isShortUppercase: true })}
                    >
                      {numberFormatter(Big(row.balance || 0).div(row.transitionPrice10 || 1), 4, true, { round: 0, isShort: true, isShortUppercase: true, isZeroPrecision: true })}
                    </DescriptionTitle>
                    <LazyImage
                      src={row.tokens[1].icon}
                      width={24}
                      height={24}
                      containerClassName="border border-[#3E3965] rounded-full overflow-hidden shrink-0"
                    />
                    <div className="text-[10px] text-[#A6A6DB]">{row.tokens[1].symbol}</div>
                  </div>
                </div>
              </LabelValue>
            </div>
          )
        }
        {
          type.value === LendingActionType.Borrow && (
            <div className="px-[10px] md:grid md:grid-cols-2">
              <LabelValue
                label={(
                  <DescriptionTitle
                    descriptionClassName="w-[300px]"
                    description={`The amount of ${row.tokens?.[0]?.symbol} you have to repay at maturity to withdraw your collateral. You pay a lesser amount if you repay earlier than the maturity.`}
                  >
                    Debt to repay
                  </DescriptionTitle>
                )}
                className="md:flex-col md:items-start md:gap-[8px]"
              >
                <div className="flex items-center gap-[4px]">
                  <DescriptionTitle
                    descriptionClassName="!p-[5px_10px]"
                    className="!text-white"
                    description={numberFormatter(Big(row.balance || 0).times(row.transitionPrice10 || 1), row.tokens[0]?.decimals, true, { isShort: true, isShortUppercase: true })}
                  >
                    {numberFormatter(Big(row.balance || 0).times(row.transitionPrice10 || 1), 4, true, { round: 0, isShort: true, isShortUppercase: true, isZeroPrecision: true })}
                  </DescriptionTitle>
                  <LazyImage
                    src={row.tokens[0].icon}
                    width={24}
                    height={24}
                    containerClassName="border border-[#3E3965] rounded-full overflow-hidden shrink-0"
                  />
                  <div className="text-[10px] text-[#A6A6DB]">{row.tokens[0].symbol}</div>
                </div>
              </LabelValue>
              <LabelValue
                label={(
                  <DescriptionTitle
                    descriptionClassName="w-[300px]"
                    description={`The amount of ${row.tokens?.[1]?.symbol} collateral to unlock when the debt is paid.`}
                  >
                    Collateral to unlock
                  </DescriptionTitle>
                )}
                className="mt-[16px] md:mt-0 md:flex-col md:items-start md:gap-[8px]"
              >
                <div className="flex items-center gap-[4px]">
                  <DescriptionTitle
                    descriptionClassName="!p-[5px_10px]"
                    className="!text-white"
                    description={numberFormatter(row.balance, row.tokens[1]?.decimals, true, { isShort: true, isShortUppercase: true })}
                  >
                    {numberFormatter(row.balance, 4, true, { round: 0, isShort: true, isShortUppercase: true, isZeroPrecision: true })}
                  </DescriptionTitle>
                  <LazyImage
                    src={row.tokens[1].icon}
                    width={24}
                    height={24}
                    containerClassName="border border-[#3E3965] rounded-full overflow-hidden shrink-0"
                  />
                  <div className="text-[10px] text-[#A6A6DB]">{row.tokens[1].symbol}</div>
                </div>
              </LabelValue>
            </div>
          )
        }
      </div>
      <div className="flex items-center justify-end pr-[10px] gap-[12px] w-[384px] shrink-0 md:w-full md:pr-0">
        {
          type.value === LendingActionType.Lend && (
            <>
              {
                !withdrawApproved ? (
                  <ActionVisibleButton
                    className="whitespace-nowrap !w-[170px]"
                    onClick={onWithdrawApprove}
                    disabled={withdrawApproving || withdrawChecking}
                    loading={withdrawApproving || withdrawChecking}
                  >
                    Approve Close
                  </ActionVisibleButton>
                ) : (
                  <ActionVisibleButton
                    icon={LENDING_ACTION_TYPE_MAP.withdraw.icon}
                    onClick={() => {
                      handleCurrentAction({
                        action: LENDING_ACTION_TYPE_MAP.withdraw,
                        visible: true,
                        market: row,
                      });
                    }}
                  >
                    {LENDING_ACTION_TYPE_MAP.withdraw.labelAlias}
                  </ActionVisibleButton>
                )
              }
            </>
          )
        }
        {
          (type.value === LendingActionType.Borrow && !row.isExpeired) && (
            <>
              {
                !repayApproved ? (
                  <ActionVisibleButton
                    className="whitespace-nowrap !w-[170px]"
                    onClick={onRepayApprove}
                    disabled={repayApproving || repayChecking}
                    loading={repayApproving || repayChecking}
                  >
                    Approve Repay
                  </ActionVisibleButton>
                ) : (
                  <ActionVisibleButton
                    icon={LENDING_ACTION_TYPE_MAP.repay.icon}
                    onClick={() => {
                      handleCurrentAction({
                        action: LENDING_ACTION_TYPE_MAP.repay,
                        visible: true,
                        market: row,
                      });
                    }}
                  >
                    {LENDING_ACTION_TYPE_MAP.repay.label}
                  </ActionVisibleButton>
                )
              }
            </>
          )
        }
      </div>
    </>
  );
};

export default TimeSwap;

const onApprove = (approveProps: any) => {
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
};

const onCheckApproved = async (approveProps: any) => {
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
  const approved = await TokenContract.callStatic.isApprovedForAll(approveProps.account, approveProps.spender);
  if (approved) {
    return MAX_APPROVE;
  }
  return "0";
};
