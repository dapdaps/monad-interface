import LazyImage from '@/components/layz-image';
import DescriptionTitle from '@/sections/lending/components/description-title';
import { numberFormatter } from '@/utils/number-formatter';
import LendingWarning from '@/sections/lending/components/warning';
import { useEffect, useState } from 'react';
import useCustomAccount from '@/hooks/use-account';
import { timeswap } from '@/sections/lending/action/timeswap';
import Big from 'big.js';
import { ethers } from 'ethers';
import Loading from '@/components/loading';

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

  const { account, provider } = useCustomAccount();

  const [claimAmount, setClaimAmount] = useState("0");
  const [claimAmountLoading, setClaimAmountLoading] = useState(true);

  const getClaimAmount = async () => {
    setClaimAmountLoading(true);
    const signer = provider.getSigner(account);
    try {
      const tx: any = await timeswap({
        action,
        actionAmount,
        amount,
        market,
        config,
        signer,
        account,
        isCallStatic: true
      });
      if (!tx) {
        setClaimAmountLoading(false);
        return;
      }
      const token0Amount = ethers.utils.formatUnits(tx.token0Amount, market?.poolData?.pool?.token0?.decimals);
      const token1Amount = ethers.utils.formatUnits(tx.token1Amount, market?.poolData?.pool?.token1?.decimals);
      setClaimAmount(market?.poolData?.pool?.isToken1Base ? token1Amount : token0Amount);
    } catch (err: any) {
      console.log(err);
    }
    setClaimAmountLoading(false);
  };

  useEffect(() => {
    if (Big(amount || 0).lte(0)) return;
    getClaimAmount();
  }, [amount]);

  return (
    <>
      <div className="mt-[26px]">
        Amount to claim
      </div>
      <div className="flex justify-between items-start mt-[16px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
        <div className="">
          <div className="flex items-center gap-[4px]">
            <LazyImage src={market?.tokens?.[0]?.icon} width={16} height={16} containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0" />
            <div>{market?.tokens?.[0]?.symbol}</div>
          </div>
          {
            claimAmountLoading ? (
              <div className="mt-[8px]">
                <Loading size={12} />
              </div>
            ) : (
              <DescriptionTitle
                className="!text-white !text-[12px]"
                descriptionClassName="!p-[5px_10px]"
                triggerContainerClassName="mt-[8px]"
                description={numberFormatter(claimAmount, market?.tokens?.[0]?.decimals, true, { round: 0 })}
              >
                {numberFormatter(claimAmount, 4, true, { round: 0 })}
              </DescriptionTitle>
            )
          }
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
    </>
  );
};

export default TimeSwap;
