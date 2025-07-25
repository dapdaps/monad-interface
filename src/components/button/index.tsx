import { motion } from "framer-motion";
import CircleLoading from "@/components/circle-loading";
import clsx from "clsx";

const Button = (props: Props) => {
  const {
    onClick,
    type = "primary",
    disabled,
    loading,
    isOnlyLoading,
    className,
    style,
    htmlType = "button",
    children,
    dataBp,
    bgColor = "#8B87FF"
  } = props;

  return (
    <motion.button
      className={clsx(
        "h-[32px] px-[10.5px] leading-[30px] border border-[#373A53] rounded-[10px] text-center text-[16px] font-[500] text-white disabled:!opacity-50 disabled:!cursor-not-allowed",
        loading ? "opacity-30" : "",
        className
      )}
      style={{
        background: type === "primary" ? bgColor : "#ffffff",
        ...style
      }}
      disabled={disabled}
      type={htmlType}
      whileHover={
        !disabled
          ? {
              background: bgColor
            }
          : {}
      }
      onClick={onClick}
      data-bp={dataBp}
    >
      {isOnlyLoading ? (
        loading ? (
          <CircleLoading size={14} />
        ) : (
          children
        )
      ) : loading ? (
        <div className="flex justify-center items-center gap-[5px]">
          <CircleLoading size={14} />
          {children}
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;

interface Props {
  disabled?: boolean;
  loading?: boolean;
  type?: "default" | "primary";
  htmlType?: "button" | "submit" | "reset";
  bgColor?: string;
  children: any;
  style?: React.CSSProperties;
  className?: string;
  isOnlyLoading?: boolean;
  onClick?(): void;
  dataBp?: string;
}
