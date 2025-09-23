import clsx from "clsx";
import CircleLoading from "../circle-loading";

const HexagonButton = (props: any) => {
  const {
    children,
    onClick,
    disabled,
    loading,
    htmlType = "button",
    className,
    innerClassName,
    bgClassName,
    isLoading = true,
    ...restProps
  } = props;

  return (
    <button
      type={htmlType}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        "group disabled:opacity-30 disabled:!cursor-not-allowed overflow-hidden relative flex items-center justify-center gap-[0px] flex-nowrap rounded-[4px] font-[Oxanium] text-white font-[500] text-[18px] h-[50px] backdrop-blur-[2px]",
        className
      )}
      {...restProps}
    >
      <div className="relative z-[3] shrink-0 w-[21px] h-full translate-x-[1px] bg-[url('/images/mainnet/components/button/hexagon-button-left2.svg')] bg-right bg-no-repeat bg-contain"></div>
      <div
        className={clsx(
          "relative z-[3] flex-1 px-[5px] flex items-center justify-center gap-[5px] h-full bg-[url('/images/mainnet/components/button/hexagon-button-middle2.svg')] bg-center bg-repeat-x bg-contain",
          innerClassName,
        )}
      >
        {
          loading && isLoading && (
            <CircleLoading size={14} />
          )
        }
        {children}
      </div>
      <div className="relative z-[3] shrink-0 w-[21px] h-full translate-x-[-1px] bg-[url('/images/mainnet/components/button/hexagon-button-right2.svg')] bg-left bg-no-repeat bg-contain"></div>
      <div
        className={clsx(
          "rounded-[4px] [clip-path:polygon(19px_1px,calc(100%_-_1px)_1px,calc(100%_-_1px)_calc(100%_-_19px),calc(100%_-_19px)_calc(100%_-_1px),1px_calc(100%_-_1px),1px_19px)] absolute z-[1] w-full h-full left-0 top-0 bg-[radial-gradient(42.56%_100%_at_50.11%_0%,_#3E3284_0%,_#1F1A3D_100%)] transition-all duration-150",
          disabled || loading ? "" : "",
          bgClassName
        )}
      />
      <div
        className={clsx(
          "rounded-[4px] [clip-path:polygon(19px_1px,calc(100%_-_1px)_1px,calc(100%_-_1px)_calc(100%_-_19px),calc(100%_-_19px)_calc(100%_-_1px),1px_calc(100%_-_1px),1px_19px)] absolute z-[2] w-full h-full left-0 top-0 bg-[#836EF9] transition-all duration-150 scale-0 opacity-0",
          disabled || loading ? "" : "group-hover:scale-100 group-hover:opacity-100",
        )}
      />
    </button>
  );
};

export default HexagonButton;
