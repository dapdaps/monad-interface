import Loading from "@/components/circle-loading";
import useApprove from "@/hooks/use-approve";
import useAccount from "@/hooks/use-account";
import { useSwitchChain } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useEffect } from "react";
import clsx from 'clsx';
import Big from 'big.js';

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
  });
  const { isPending: switching, switchChain } = useSwitchChain();
  const { open } = useAppKit();
  const { account, chainId } = useAccount();

  useEffect(() => {
    checkApproved();
  }, [updater]);

  if (!account || !chainId) {
    return (
      <BaseButton
        onClick={() => {
          open();
        }}
        className={className}
      >
        Connect wallet
      </BaseButton>
    );
  }

  if (chainId !== chain.chainId) {
    return (
      <BaseButton
        onClick={() => {
          switchChain({
            chainId: chain.chainId
          });
        }}
        loading={switching}
        className={className}
      >
        Switch Network
      </BaseButton>
    );
  }

  if (checking || approving || loading) {
    return <BaseButton loading={true} disabled className={className} />;
  }

  if (!amount || Big(amount || 0).lte(0)) {
    return (
      <BaseButton className={className} disabled>
        {text}
      </BaseButton>
    );
  }

  if (errorTips) {
    return <BaseButton className={className} disabled>{errorTips}</BaseButton>;
  }

  if (!spender) return <BaseButton className={className} disabled>Insufficient Liquidity</BaseButton>;

  if (!approved) {
    return <BaseButton className={className} onClick={approve}>Approve {token?.symbol}</BaseButton>;
  }

  return (
    <BaseButton className={className} onClick={onClick} disabled={disabled}>
      {text}
    </BaseButton>
  );
}
