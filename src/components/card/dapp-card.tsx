import MonadBaseCard from '@/components/card/monad-base-card';
import clsx from 'clsx';
import useIsMobile from '@/hooks/use-isMobile';

const DAppCard = (props: any) => {
  const { icon, iconClassName, children, config, ...restProps } = props;

  const isMobile = useIsMobile();

  return (
    isMobile ? (
      <div className="w-full bg-[linear-gradient(to_bottom,_#0E0F29_70dvh,_#0E0F2900)]">
        <div className="flex items-center justify-start gap-[7px] mt-[39px] px-[10px]">
          {icon}
          <button
            type="button"
            className="flex justify-center items-center h-[19px] flex-shrink-0 rounded-[4px] bg-[rgba(62,52,124,0.6)] backdrop-blur-[5px] text-[#A5FFFD] text-center font-[Unbounded] text-[12px] font-normal leading-[100%] p-[3px_4px_4px_5px]"
          >
            {config.type}
          </button>
        </div>
        <div className="text-[#FFF] font-Unbounded text-[14px] font-normal leading-normal mt-[23px]">
          {children}
        </div>
      </div>
    ) : (
      <MonadBaseCard {...restProps}>
        {
          icon && (
            <DAppName className={clsx("absolute top-[-52px] left-1/2 -translate-x-1/2", iconClassName)}>
              {icon}
            </DAppName>
          )
        }
        {children}
      </MonadBaseCard>
    )
  );
};

export default DAppCard;

export const DAppName = (props: any) => {
  const { className, children } = props;

  return (
    <div className={clsx("flex justify-center items-stretch h-[50px]", className)}>
      <div className="w-[20px] h-full shrink-0 bg-[url('/images/lending/dapp-name-bg-left.svg')] bg-no-repeat bg-right bg-contain')]" />
      <div className="flex-1 flex justify-center items-center h-full bg-[url('/images/lending/dapp-name-bg-center.svg')] bg-repeat-x bg-contain">
        {children}
      </div>
      <div className="w-[20px] h-full shrink-0 bg-[url('/images/lending/dapp-name-bg-right.svg')] bg-no-repeat bg-left bg-contain" />
    </div>
  );
};
