import MonadBaseCard from '@/components/card/monad-base-card';
import clsx from 'clsx';
import LazyImage from '@/components/layz-image';
import SubmitBtn from '@/sections/swap/SubmitBtn';
import { DEFAULT_CHAIN_ID } from '@/configs';

const LendingActionCard = (props: any) => {
  const {
    className,
    cardClassName,
    children,
    title,
    market,
    onClose,
    ...restProps
  } = props;

  return (
    <MonadBaseCard className={clsx("w-[432px] md:w-full", cardClassName)}>
      <div className={clsx("px-[26px]", className)}>
        <div className="flex justify-between items-center">
          <div className="text-white font-Unbounded text-[14px] font-[500] leading-normal">{title}</div>
          <button
            type="button"
            className="bg-[url('/images/lending/icon-close.svg')] bg-no-repeat bg-contain bg-center w-[15px] h-[15px]"
            onClick={onClose}
          />
        </div>
        <div className="flex justify-center items-center">
          {
            market?.tokens?.map((token: any, index: number) => (
              <LazyImage
                key={index}
                src={token.icon}
                alt={token.symbol}
                width={32}
                height={32}
                containerClassName={clsx("overflow-hidden rounded-full border border-[#3E3965]", index > 0 && "ml-[-7px]")}
              />
            ))
          }
        </div>
        <div className="mt-[10px] text-white font-[500] text-center text-[14px] leading-normal font-Unbounded">
          {market?.tokens?.map((token: any) => token.symbol).join("/")}
        </div>
        <div className="mt-[25px]">
          {children}
        </div>
        <div className="mt-[13px]">
          <SubmitBtn
            chain={{
              chainId: DEFAULT_CHAIN_ID
            }}
            className="!text-[14px] !font-[500] !h-[50px] disabled:!opacity-30 disabled:!cursor-not-allowed"
            {...restProps}
          />
        </div>
      </div>
    </MonadBaseCard>
  );
};

export default LendingActionCard;
