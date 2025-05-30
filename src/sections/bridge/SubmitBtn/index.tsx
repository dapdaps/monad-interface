import Loading from "@/components/loading";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useSwitchChain, useConnect } from "wagmi";


const cls = 'w-full h-[60px] flex items-center justify-center rounded-[6px] text-[#fff] bg-[#8B87FF] text-[18px] font-[600] mt-[16px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'

export default function SubmitBtn(props: any) {
  const { comingSoon, onClick, isLoading, disabled, fromChainId } = props;
  const { switchChain } = useSwitchChain()
  const { address, chainId } = useAccount()
  const { open } = useAppKit();

  if (!address) {
    return <button
    type="button"
    className={cls}
    onClick={() => {
      open()
    }}  
    >
      Connect Wallet
    </button>
  }

  
  return (
    <button
      data-click-sound
      type="button"
      className={cls}
      disabled={comingSoon || (chainId === fromChainId && disabled)}
      onClick={() => {
        if (chainId !== fromChainId) {
          switchChain({ chainId: fromChainId })
          return
        } 

        if (disabled) {
          return
        }

        if (isLoading) {
          return
        }

        

        onClick()
      }}
    >
        {comingSoon ? 'Coming soon...' : isLoading ? <Loading size={20}/> : chainId !== fromChainId ? 'Switch Chain' : 'Send'}
    </button>
  );
}