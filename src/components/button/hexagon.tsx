import clsx from "clsx";
import CircleLoading from "../circle-loading";
import { useMemo } from "react";

const HexagonButton = (props: any) => {
  const {
    children,
    onClick,
    disabled,
    loading,
    htmlType = "button",
    className,
    innerClassName,
    isLoading = true,
    height = 50,
    ...restProps
  } = props;

  const clipCorner = useMemo(() => {
    return height * 0.4;
  }, [height]);

  return (
    <button
      type={htmlType}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        "group disabled:opacity-30 disabled:!cursor-not-allowed overflow-hidden bg-[#836EF9] p-[1px] relative flex items-center justify-center gap-[0px] flex-nowrap rounded-[4px] font-[Oxanium] text-white font-[500] text-[18px] h-[50px] backdrop-blur-[2px]",
        className
      )}
      {...restProps}
      style={{
        ...restProps.style,
        height,
        clipPath: `polygon(${clipCorner}px 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - ${clipCorner}px), calc(100% - ${clipCorner}px) calc(100% - 1px), calc(100% - ${clipCorner}px) calc(100% - 1px), 1px calc(100% - 1px), 1px ${clipCorner}px)`,
      }}
    >
      <div
        className={clsx("relative rounded-[4px] w-full h-full px-[20px] bg-[radial-gradient(42.56%_100%_at_50.11%_0%,_#3E3284_0%,_#1F1A3D_100%)]", innerClassName)}
        style={{
          clipPath: `polygon(${clipCorner}px 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - ${clipCorner}px), calc(100% - ${clipCorner}px) calc(100% - 1px), calc(100% - ${clipCorner}px) calc(100% - 1px), 1px calc(100% - 1px), 1px ${clipCorner}px)`,
        }}
      >
        <div className="relative z-[3] w-full h-full flex justify-center items-center gap-[5px]">
          {
            loading && isLoading && (
              <CircleLoading size={14} />
            )
          }
          {children}
        </div>
        <div
          className={clsx(
            "rounded-[4px] absolute z-[2] w-full h-full left-0 top-0 bg-[#836EF9] transition-all duration-150 scale-0 opacity-0",
            disabled || loading ? "" : "group-hover:scale-100 group-hover:opacity-100",
          )}
          style={{
            clipPath: `polygon(${clipCorner}px 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - ${clipCorner}px), calc(100% - ${clipCorner}px) calc(100% - 1px), calc(100% - ${clipCorner}px) calc(100% - 1px), 1px calc(100% - 1px), 1px ${clipCorner}px)`,
          }}
        />
      </div>
    </button>
  );
};

export default HexagonButton;
