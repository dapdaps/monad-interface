import HexagonButton from "@/components/button/hexagon";
import Loading from "@/components/loading";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useSwitchChain, useConnect } from "wagmi";
import { useOneclickWallet } from "../lib/bridges/oneclick/wallet";
import { useRequest } from "ahooks";
import { useMemo } from "react";


const cls = 'w-full flex items-center justify-center rounded-[6px] text-[#fff] bg-[#8B87FF] text-[20px] font-[600] mt-[16px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'

export default function SubmitBtn(props: any) {
  const { fromToken, comingSoon, onClick, isLoading, disabled, fromChainId, selectedRoute } = props;
  const { switchChain } = useSwitchChain()
  const { address, chainId } = useAccount()
  const { openConnectModal } = useConnectModal();
  const wallet = useOneclickWallet();

  const { runAsync: onApprove, loading: approving, data: approveSuccess } = useRequest(wallet.approve, {
    manual: true,
  });

  const [needApprove, approveSpender, approveAmount] = useMemo(() => {
    const _needApprove = selectedRoute?.quote?.needApprove && !approveSuccess;
    const _approveSpender = selectedRoute?.quote?.approveSpender;
    const _approveAmount = selectedRoute?.quote?.quote?.amountIn;
    return [
      _needApprove,
      _approveSpender,
      _approveAmount,
    ];
  }, [selectedRoute, approveSuccess]);

  const [loading, text] = useMemo(() => {
    let _loading = isLoading || approving;
    let _text = () => {
      if (comingSoon) {
        return "Coming soon...";
      }
      if (_loading) {
        return (
          <Loading size={20} />
        );
      }
      if (chainId !== fromChainId) {
        return "Switch Chain";
      }
      if (needApprove) {
        return "Approve";
      }
      return "Send";
    };

    return [
      _loading,
      _text(),
    ];
  }, [isLoading, approving, comingSoon, chainId, fromChainId, needApprove]);

  if (!address) {
    return <HexagonButton
      type="button"
      className={cls}
      onClick={() => {
        openConnectModal?.()
      }}
    >
      Connect Wallet
    </HexagonButton>
  }

  return (
    <HexagonButton
      data-click-sound
      type="button"
      className={cls}
      disabled={comingSoon || (chainId === fromChainId && disabled)}
      onClick={() => {

        if (chainId !== fromChainId) {
          switchChain({
            chainId: fromChainId,
          }, {
            onSuccess: () => {
            },
            onError: (e) => {
              console.log(e)
            },
            onSettled: () => {
              console.log('settled')
            }
          })
          return
        }

        if (disabled) {
          return
        }

        if (loading) {
          return
        }

        if (needApprove) {
          onApprove({
            contractAddress: fromToken.address,
            spender: approveSpender,
            amountWei: approveAmount,
            isCheckAllowance: true,
          });
          return;
        }

        onClick()
      }}
    >
      {text}
    </HexagonButton>
  );
}