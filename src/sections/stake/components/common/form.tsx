import clsx from "clsx";
import { useStakeContext } from "../../context";
import StakeInput from "../input";
import Button from "@/components/button";
import { useAccount, useSwitchChain } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { monadTestnet } from "viem/chains";

const CommonForm = (props: any) => {
  const { className, foot } = props;

  const {
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    setInputAmount,
    inputTokenBalance,
    inputTokenBalanceLoading,
    outputTokenBalance,
    outputTokenBalanceLoading,
    buttonValid,
    onStake,
    currentTab,
  } = useStakeContext();

  return (
    <div className={clsx("w-full px-[37px] md:px-[10px] pt-8 md:pt-4", className)}>
      <div className="text-[18px] text-white mb-2">
        {currentTab.value === "stake" ? "Stake" : "Unstake"} {currentTab.value === "stake" ? inputToken?.symbol : outputToken?.symbol}
      </div>
      <StakeInput
        className=""
        title={`${inputToken?.symbol} amount`}
        token={inputToken}
        amount={inputAmount}
        onAmountChange={setInputAmount}
        balance={inputTokenBalance}
        balanceLoading={inputTokenBalanceLoading}
        balanceLabel="balance"
        type="input"
      />
      <StakeInput
        className=""
        title="Receive"
        disabled
        token={outputToken}
        amount={outputAmount}
        balance={outputTokenBalance}
        balanceLoading={outputTokenBalanceLoading}
        balanceLabel="balance"
        type="output"
        isPrice={false}
      />
      {foot}
      {/* <Button
        type="primary"
        className="w-full mt-2 !h-[60px]"
        loading={buttonValid.loading}
        disabled={!buttonValid.valid || buttonValid.loading}
        onClick={onStake}
      >
        {buttonValid.text}
      </Button> */}
      <Actiontn buttonValid={buttonValid} onStake={onStake} />
    </div>
  );
};

export default CommonForm;

export const Actiontn = ({
  buttonValid,
  onStake,
}: {
  buttonValid: any;
  onStake: () => void;
}) => {
  const { address, chainId } = useAccount()
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain()

  if (!address) {
    return <Button
      type="primary"
      className="w-full mt-2 !h-[60px]"
      onClick={() => {
        openConnectModal?.()
      }}
    >
      Connect Wallet
    </Button>
  }

  if (chainId !== monadTestnet.id) {
    return <Button
      type="primary"
      className="w-full mt-2 !h-[60px]"
      onClick={() => {
        switchChain({ chainId: monadTestnet.id })
      }}
    >Switch Chain</Button>
  }


  return (
    <Button
      type="primary"
      className="w-full mt-2 !h-[60px]"
      loading={buttonValid.loading}
      disabled={!buttonValid.valid || buttonValid.loading}
      onClick={onStake}
    >
      {buttonValid.text}
    </Button>
  )
}