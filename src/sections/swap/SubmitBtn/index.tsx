import Loading from "@/components/circle-loading";
import useApprove from "@/hooks/use-approve";
import useAccount from "@/hooks/use-account";
import { useSwitchChain } from "wagmi";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect } from "react";
import clsx from 'clsx';
import Big from 'big.js';
import HexagonButton from "@/components/button/hexagon";

export const BaseButton = ({ loading, onClick, children, disabled = false, className }: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-hover-sound
      className={clsx("h-[60px] md:h-[46px] w-full text-white duration-500 hover:opacity-70 active:opacity-90 flex items-center justify-center border border-[#8B87FF] rounded-[10px] bg-[#8B87FF] text-[18px] md:text-[16px] font-[600] mt-[16px] cursor-pointer", className)}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};

export default function SubmitBtn({
  chain,
  spender,
  token,
  amount,
  loading,
  errorTips,
  disabled,
  onClick,
  onRefresh,
  updater,
  className,
  text = "Swap",
  onApprove,
  onCheckApproved,
  isApproveMax,
  isSkip
}: any) {
  const { approve, approved, approving, checking, checkApproved } = useApprove({
    amount,
    token,
    spender,
    onSuccess: onRefresh,
    onApprove,
    onCheckApproved,
    isSkip,
    isMax: isApproveMax
  });
  const { isPending: switching, switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const { account, chainId } = useAccount();

  useEffect(() => {
    checkApproved();
  }, [updater]);

  if (!account || !chainId) {
    return (
      <HexagonButton
        onClick={() => {
          openConnectModal?.();
        }}
        className={className}
      >
        Connect wallet
      </HexagonButton>
    );
  }

  if (chainId !== chain.chainId) {
    return (
      <HexagonButton
        onClick={() => {
          switchChain({
            chainId: chain.chainId
          });
        }}
        loading={switching}
        className={className}
      >
        Switch Network
      </HexagonButton>
    );
  }

  if (checking || approving || loading) {
    return <HexagonButton loading={true} disabled className={className} />;
  }

  if (!amount || Big(amount || 0).lte(0)) {
    return (
      <HexagonButton className={className} disabled>
        {text}
      </HexagonButton>
    );
  }

  if (errorTips) {
    return <HexagonButton className={className} disabled>{errorTips}</HexagonButton>;
  }

  if (!spender) return <HexagonButton className={className} disabled>Insufficient Liquidity</HexagonButton>;

  if (!approved) {
    return <HexagonButton className={className} onClick={approve}>Approve {token?.symbol}</HexagonButton>;
  }

  return (
    <HexagonButton className={className} onClick={onClick} disabled={disabled}>
      {text}
    </HexagonButton>
  );
}
