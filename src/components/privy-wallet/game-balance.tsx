import clsx from "clsx";

const GameBalance = (props: any) => {
  const { className, tokenBalance, setOpen, setShowDeposit, setIsJustDesposit, showDeposit } = props;

  return (
    <div className={clsx(
      "md:w-[unset] md:gap-[14px] md:h-[46px] md:rounded-[10px] md:border-[#383762] md:bg-black/50 md:mt-0 md:py-0 md:px-[14px] flex items-center justify-between bg-[#000] rounded-[10px] border border-[#8184CC] px-[clamp(1px,_0.833vw,_calc(var(--nadsa-laptop-width-base)*0.00833))] py-[clamp(1px,_0.556vw,_calc(var(--nadsa-laptop-width-base)*0.00556))] mb-[clamp(1px,_1.389vw,_calc(var(--nadsa-laptop-width-base)*0.01389))] w-full mt-[clamp(1px,_1.389vw,_calc(var(--nadsa-laptop-width-base)*0.01389))] ",
      className,
    )}>
      <div className="flex items-center">
        <span className="md:mr-[8px] mr-[clamp(1px,_0.556vw,_calc(var(--nadsa-laptop-width-base)*0.00556))] flex items-center">
          <svg
            className="md:w-[24px] md:h-[24px] w-[clamp(1px,_1.667vw,_calc(var(--nadsa-laptop-width-base)*0.01667))] h-[clamp(1px,_1.667vw,_calc(var(--nadsa-laptop-width-base)*0.01667))] shrink-0"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#836EF9" />
            <path d="M11.959 3.65234C9.5602 3.65234 3.65234 9.58932 3.65234 12.0001C3.65234 14.4109 9.5602 20.348 11.959 20.348C14.3578 20.348 20.2657 14.4108 20.2657 12.0001C20.2657 9.58943 14.3578 3.65234 11.959 3.65234ZM10.6645 16.7737C9.65297 16.4967 6.93338 11.7158 7.20907 10.6993C7.48475 9.68266 12.2419 6.94963 13.2534 7.22668C14.265 7.50369 16.9847 12.2845 16.709 13.3011C16.4333 14.3176 11.6761 17.0507 10.6645 16.7737Z" fill="white" />
          </svg>
        </span>
        <span className="md:text-[16px] md:leading-[100%] text-white text-[clamp(1px,_1.111vw,_calc(var(--nadsa-laptop-width-base)*0.01111))]">
          {Number(tokenBalance || 0).toFixed(4)}
        </span>
      </div>
      <div
        className="cursor-pointer float-right md:float-[unset]"
        onClick={() => {
          setOpen(true)
          setShowDeposit(showDeposit + 1)
          setIsJustDesposit(false)
        }}>
        <svg
          className="md:w-[20px] md:h-[20px] w-[clamp(1px,_1.389vw,_calc(var(--nadsa-laptop-width-base)*0.01389))] h-[clamp(1px,_1.389vw,_calc(var(--nadsa-laptop-width-base)*0.01389))] shrink-0"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="4" fill="#836EF9" />
          <path d="M13.4912 10.8004H10.7998V13.467C10.7998 13.7616 10.5615 14 10.2669 14H9.73399C9.43941 14 9.20018 13.7616 9.20018 13.467V10.8004H6.50881C6.22763 10.8004 6 10.5727 6 10.2915V9.70851C6 9.4273 6.22763 9.19964 6.50881 9.19964H9.20018V6.53298C9.20018 6.23837 9.43941 6 9.73399 6H10.2669C10.5615 6 10.7998 6.23926 10.7998 6.53298V9.19964H13.4912C13.7724 9.19964 14 9.4273 14 9.70851V10.2915C14 10.5718 13.7724 10.8004 13.4912 10.8004Z" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default GameBalance;