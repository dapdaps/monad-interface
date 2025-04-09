import clsx from 'clsx';

const LendingWarning = (props: any) => {
  const {
    className,
    children
  } = props;

  return (
    <div className={clsx('flex justify-between items-start gap-[8px] rounded-[6px] bg-[rgba(255,191,73,0.1)] h-[60px] text-[#FFBF49] font-Unbounded text-[10px] font-light leading-[150%] p-[14px_10px_16px]', className)}>
      <img src="/images/lending/icon-warning.svg" alt="" width={16} height={16} className="object-center object-contain shrink-0" />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default LendingWarning;
