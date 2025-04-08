import clsx from 'clsx';

const MonadBaseCard = (props: any) => {
  const { children, className, contentClassName } = props;

  return (
    <div className={clsx("flex flex-col items-stretch justify-center", className)}>
      <div className="flex items-center justify-center h-[28px] shrink-0 w-full">
        <div className="w-[28px] h-full shrink-0 bg-[url('/images/lending/card-bg-top-left.svg')] bg-no-repeat bg-right bg-contain" />
        <div className="flex-1 h-full bg-[url('/images/lending/card-bg-top-center.svg')] bg-repeat bg-contain" />
        <div className="w-[28px] h-full shrink-0 bg-[url('/images/lending/card-bg-top-right.svg')] bg-no-repeat bg-left bg-contain" />
      </div>
      <div className="relative flex-1 min-h-2 bg-[#2B294A] text-[#FFF] font-Unbounded text-[14px] font-normal leading-normal px-[2px]">
        <div className="w-[2px] z-[1] absolute left-0 top-0 h-full bg-[image:linear-gradient(to_bottom,_#958fbc,_#47445b)]" />
        <div className={contentClassName}>
          {children}
        </div>
        <div className="w-[2px] z-[1] absolute right-0 top-0 h-full bg-[image:linear-gradient(to_bottom,_#958fbc,_#47445b)]" />
      </div>
      <div className="flex items-center justify-center h-[28px] shrink-0 w-full">
        <div className="w-[28px] h-full shrink-0 bg-[url('/images/lending/card-bg-bot-left.svg')] bg-no-repeat bg-right bg-contain" />
        <div className="flex-1 h-full bg-[url('/images/lending/card-bg-bot-center.svg')] bg-repeat bg-contain" />
        <div className="w-[28px] h-full shrink-0 bg-[url('/images/lending/card-bg-bot-right.svg')] bg-no-repeat bg-left bg-contain" />
      </div>
    </div>
  );
};

export default MonadBaseCard;
