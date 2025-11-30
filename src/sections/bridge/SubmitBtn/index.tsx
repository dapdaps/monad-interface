import HexagonButton from "@/components/button/hexagon";
import Loading from "@/components/loading";
import { useAccount, useSwitchChain, useConnect } from "wagmi";
import { useOneclickWallet } from "../lib/bridges/oneclick/wallet";
import { useRequest } from "ahooks";
import { useMemo } from "react";
import Big from "big.js";
import useToast from "@/hooks/use-toast";
import { ZeroAddress } from "@/hooks/use-add-action";
import { useAuth } from "@/context/auth";

const cls =
  "w-full flex items-center justify-center rounded-[6px] text-[#fff] bg-[#8B87FF] text-[20px] font-[600] mt-[16px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed";

export default function SubmitBtn(props: any) {
  const {
    fromToken,
    comingSoon,
    onClick,
    isLoading,
    disabled,
    fromChainId,
    selectedRoute,
    amount
  } = props;
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { login, isLogin } = useAuth();
  const wallet = useOneclickWallet();
  const toast = useToast();

  const { runAsync: onApprove, loading: approving } = useRequest(
    async (params: any) => {
      const res = await wallet.approve(params);
      checkAllowance();
      toast.success({
        title: "Approve Successful!"
      });
      return res;
    },
    {
      manual: true
    }
  );

  const [approveSpender, isNeedApprove] = useMemo(() => {
    const _approveSpender = selectedRoute?.quote?.approveSpender;
    const _isNeedApprove =
      ["Oneclick"].includes(selectedRoute?.bridgeType) &&
      fromToken?.address &&
      fromToken.address !== ZeroAddress;
    return [_approveSpender, _isNeedApprove];
  }, [selectedRoute, fromToken?.address]);

  const {
    runAsync: checkAllowance,
    loading: checkingAllowance,
    data: needApprove
  } = useRequest(
    async () => {
      if (
        !fromToken?.address ||
        !approveSpender ||
        !address ||
        !amount ||
        Big(amount).lte(0) ||
        !isNeedApprove
      ) {
        return false;
      }
      const _allowance = await wallet.allowance({
        contractAddress: fromToken?.address,
        spender: approveSpender,
        address,
        amountWei: Big(amount || 0)
          .times(10 ** fromToken?.decimals)
          .toFixed(0, 0)
      });
      return _allowance.needApprove;
    },
    {
      debounceWait: 500,
      refreshDeps: [
        fromToken?.address,
        approveSpender,
        amount,
        address,
        isNeedApprove
      ]
    }
  );

  const [loading, text] = useMemo(() => {
    let _loading = isLoading || approving || checkingAllowance;
    let _text = () => {
      if (comingSoon) {
        return "Coming soon...";
      }
      if (_loading) {
        return <Loading size={20} />;
      }
      if (chainId !== fromChainId) {
        return "Switch Chain";
      }
      if (needApprove) {
        return "Approve";
      }
      return "Send";
    };

    return [_loading, _text()];
  }, [
    isLoading,
    approving,
    comingSoon,
    chainId,
    fromChainId,
    needApprove,
    checkingAllowance
  ]);

  if (!isLogin) {
    return (
      <HexagonButton
        type="button"
        className={cls}
        onClick={() => {
          login();
        }}
      >
        Connect Wallet
      </HexagonButton>
    );
  }

  return (
    <HexagonButton
      data-click-sound
      type="button"
      className={cls}
      disabled={comingSoon || (chainId === fromChainId && disabled)}
      onClick={() => {
        if (chainId !== fromChainId) {
          switchChain(
            {
              chainId: fromChainId
            },
            {
              onSuccess: () => {},
              onError: (e) => {
                console.log(e);
              },
              onSettled: () => {
                console.log("settled");
              }
            }
          );
          return;
        }

        if (disabled) {
          return;
        }

        if (loading) {
          return;
        }

        if (needApprove) {
          onApprove({
            contractAddress: fromToken.address,
            spender: approveSpender,
            amountWei: Big(amount || 0)
              .times(10 ** fromToken?.decimals)
              .toFixed(0, 0)
          });
          return;
        }

        onClick();
      }}
    >
      {text}
    </HexagonButton>
  );
}
