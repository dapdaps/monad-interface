import { motion } from "framer-motion";
import CircleLoading from "@/components/circle-loading";
import clsx from "clsx";
import { useAccount, useSwitchChain } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { monadTestnet } from "viem/chains";

const cls = "h-[32px] px-[10.5px] leading-[30px] border border-[#373A53] rounded-[10px] text-center text-[16px] font-[500] text-white disabled:!opacity-50 disabled:!cursor-not-allowed"

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


  const { address, chainId } = useAccount()
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain()

  if (!address) {
    return <motion.button
      type="button"
      className={clsx(
        cls,
        loading ? "opacity-30" : "",
        className
      )}
      onClick={() => {
        openConnectModal?.()
      }}
      style={{
        background: type === "primary" ? bgColor : "#ffffff",
        ...style
      }}
    >
      Connect Wallet
    </motion.button>
  }

  if (chainId !== monadTestnet.id) {
    return <motion.button
      type="button"
      className={clsx(
        cls,
        loading ? "opacity-30" : "",
        className
      )}
      style={{
        background: type === "primary" ? bgColor : "#ffffff",
        ...style
      }}
      onClick={() => {
        switchChain({ chainId: monadTestnet.id })
      }}
    >Switch Chain</motion.button>
  }

  return (
    <motion.button
      className={clsx(
        cls,
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
