import LazyImage from '@/components/layz-image';
import InputNumber from '@/components/input-number';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import clsx from 'clsx';
import Loading from '@/components/loading';
import { LendingAmountChangeType } from '@/sections/lending/config';

const LendingAmountInput = (props: any) => {
  const {
    title,
    balance,
    balanceLoading,
    balanceToken,
    className,
    topClassName,
    inputContainerClassName,
    onChange,
    value,
    token,
    disabled,
    isBalance = true
  } = props;

  return (
    <div className={clsx("", className)}>
      <div className={clsx("flex justify-between items-center text-right text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal", topClassName)}>
        <div className="">
          {title}
        </div>
        {
          isBalance && (
            <div className="flex items-center gap-[6px]">
              <div className="flex items-center gap-[4px]">
                <div>Bal:</div>
                <button
                  type="button"
                  className="underline underline-offset-2 disabled:opacity-30 disabled:!cursor-not-allowed"
                  disabled={Big(balance || 0).lte(0) || balanceLoading || disabled}
                  onClick={() => {
                    onChange({ type: LendingAmountChangeType.Balance, value: balance });
                  }}
                  title={numberFormatter(balance, balanceToken?.decimals || token?.decimals || 18, true, { round: 0 })}
                >
                  {
                    balanceLoading ? (
                      <div className="translate-y-0.5">
                        <Loading size={12} />
                      </div>
                    ) : numberFormatter(balance, 5, true, { round: 0 })
                  }
                </button>
              </div>
              <LazyImage
                src={balanceToken?.icon ?? token?.icon}
                width={16}
                height={16}
                containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0"
              />
            </div>
          )
        }
      </div>
      <div className={clsx("flex justify-between items-center h-[46px] mt-[13px]", inputContainerClassName)}>
        <InputNumber
          disabled={disabled}
          placeholder="0.0"
          value={value}
          onNumberChange={(val: string) => {
            onChange({ type: LendingAmountChangeType.Input, value: val });
          }}
          className="h-full border border-[#464368] rounded-l-[6px] disabled:!cursor-not-allowed bg-[rgba(255,255,255,0.05)] flex-1 px-[14px] text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal focus:border-[#FFF] transition-[border] duration-150"
        />
        <div className="h-full border border-[#464368] border-l-[0] rounded-r-[6px] bg-[rgba(255,255,255,0.05)] shrink-0 flex items-center justify-center gap-[6px] px-[10px] text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal">
          <LazyImage
            src={token?.icon}
            width={26}
            height={26}
            containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0"
          />
          <div>{token?.symbol}</div>
        </div>
      </div>
    </div>
  );
};

export default LendingAmountInput;
