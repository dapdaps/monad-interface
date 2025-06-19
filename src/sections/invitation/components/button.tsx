import clsx from "clsx";

const Button = (props: any) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      data-bp="1007-001"
      type="button"
      className={clsx(
        "h-[36px] px-[35px] rounded-[6px] bg-[#A6A6D2] disabled:bg-[#6D7EA5] disabled:!cursor-not-allowed border border-black filter shadow-[0px_6px_0px_#000] disabled:active:shadow-[0px_6px_0px_#000] active:shadow-[0px_2px_0px_#000] active:drop-shadow-[0px_0px_10px_#7961FF] disabled:active:!drop-shadow-none active:translate-y-1 disabled:active:translate-y-0 active:bg-[#A191FF] disabled:active:!bg-[#6D7EA5] text-black text-center font-Unbounded text-[12px] font-[500] leading-[100%] transition-all duration-100",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
