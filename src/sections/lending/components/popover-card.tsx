import clsx from 'clsx';

const PopoverCard = (props: any) => {
  const { className, children } = props;

  return (
    <div className={clsx("text-[#D7D7F6] font-Unbounded text-[10px] font-light leading-normal border border-[#645E8A] rounded-[6px] bg-[rgba(81,79,119,0.80)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px] p-[11px_12px_13px_14px]", className)}>
      {children}
    </div>
  );
};

export default PopoverCard;
