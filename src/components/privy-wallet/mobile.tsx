import clsx from "clsx";
import GameAccount from "./game-account";
import GameBalance from "./game-balance";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const PrivyMobile = (props: any) => {
  const { className, formClassName } = props;

  const pathname = usePathname();

  const isEntry = useMemo(() => {
    return pathname === "/arcade";
  }, [pathname]);

  if (!isEntry) {
    return (
      <PrivyMobileForm
        {...props}
        className={clsx(
          "fixed z-10 left-1/2 -translate-x-1/2 top-[14.10vw] w-[93.08vw]",
          formClassName
        )}
      />
    );
  }

  return (
    <div className={clsx(
      "fixed z-10 left-1/2 -translate-x-1/2 top-[25.13vw] w-[92.31vw] p-[8px] rounded-[16px] bg-[#836EF9]",
      className,
    )}>
      <div className="w-full p-[8px] rounded-[12px] border border-[#3E347C] bg-[#1A1843] shadow-[7px_10px_0_0_rgba(0,_0,_0,_0.25)_inset]">
        <PrivyMobileForm
          {...props}
          className={formClassName}
        />
      </div>
      <div className="w-full flex justify-between items-center gap-[8px] mt-[6px]">
        <button
          type="button"
          className="flex-1 h-[32px] rounded-[10px] border border-black bg-[radial-gradient(50%_50%_at_50%_50%,#E1FFB5_0%,#B1FF3D_100%)] shadow-[0_0_6px_0_#BFFF60] text-black font-[Montserrat] text-[16px] font-semibold leading-[100%]"
        >
          Deposit
        </button>
        <button
          type="button"
          className="flex-1 h-[32px] rounded-[10px] border border-black bg-white/30 text-black font-[Montserrat] text-[16px] font-semibold leading-[100%]"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default PrivyMobile;

export const PrivyMobileForm = (props: any) => {
  const { className, ...restProps } = props;

  return (
    <div className={clsx("w-full flex justify-between items-center gap-[10px]", className)}>
      <GameAccount {...restProps} />
      <GameBalance {...restProps} />
    </div>
  );
};
