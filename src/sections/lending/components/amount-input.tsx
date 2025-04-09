import LazyImage from '@/components/layz-image';
import InputNumber from '@/components/input-number';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import clsx from 'clsx';

const LendingAmountInput = (props: any) => {
  const {
    title,
    balance,
    className,
    topClassName,
    inputContainerClassName,
    onChange,
    value,
    token
  } = props;

  return (
    <div className={clsx("", className)}>
      <div className={clsx("flex justify-between items-center text-right text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal", topClassName)}>
        <div className="">
          {title}
        </div>
        <div className="flex items-center gap-[6px]">
          <div className="flex items-center gap-[4px]">
            <div>Bal:</div>
            <button
              type="button"
              className="underline underline-offset-2 disabled:opacity-30 disabled:!cursor-not-allowed"
              disabled={Big(balance || 0).lte(0)}
              onClick={() => {
                onChange(balance);
              }}
            >
              {numberFormatter(balance, 6, true)}
            </button>
          </div>
          <LazyImage
            src="/assets/tokens/wmon.png"
            width={16}
            height={16}
            containerClassName="overflow-hidden rounded-full border border-[#3E3965] shrink-0"
          />
        </div>
      </div>
      <div className={clsx("flex justify-between items-center h-[46px] mt-[13px]", inputContainerClassName)}>
        <InputNumber
          placeholder="0.0"
          value={value}
          onNumberChange={onChange}
          className="h-full border border-[#464368] rounded-l-[6px] bg-[rgba(255,255,255,0.05)] flex-1 px-[14px] text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal focus:border-[#FFF] transition-[border] duration-150"
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
