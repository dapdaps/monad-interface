import HexagonButton from "@/components/button/hexagon";
import Loading from "@/components/loading";
import { useAccount, useSwitchChain } from "wagmi";
import { useMemo } from "react";
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
    amount
  } = props;
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { login, isLogin } = useAuth();

  const [loading, text] = useMemo(() => {
    let _loading = isLoading;
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
      return "Send";
    };

    return [_loading, _text()];
  }, [
    isLoading,
    comingSoon,
    chainId,
    fromChainId,
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

        onClick();
      }}
    >
      {text}
    </HexagonButton>
  );
}
