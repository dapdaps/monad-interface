import MonadBaseCard from '@/components/card/monad-base-card';
import clsx from 'clsx';

const DAppCard = (props: any) => {
  const { icon, iconClassName, children, ...restProps } = props;

  return (
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
