import HexagonButton from "@/components/button/hexagon";
import useCustomAccount from "@/hooks/use-account";
import { useSwitchChain } from "wagmi";
import { monadTestnet } from "viem/chains";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import Loading from "@/components/loading";
import { playSound1 } from "../lib/sound";

type ActionButtonProps = {
    onAction: () => void;
    isLoading?: boolean;
    actionDisabled: boolean;
    text: string;
};

export default function ActionButton({
    onAction,
    isLoading,
    actionDisabled,
    text,
}: ActionButtonProps) {
    const { account, chainId } = useCustomAccount();
    const { switchChain } = useSwitchChain();
    const { onConnect } = useConnectWallet();

    if (!account) {
        return (
            <HexagonButton className="w-full" onClick={() => {
                playSound1();
                onConnect();
            }} >
                Connect Wallet
            </HexagonButton>
        );
    }

    if (chainId !== 143) {
        return (
            <HexagonButton className="w-full" onClick={() => {
                playSound1();
                switchChain({ chainId: 143 });
            }} >
                Switch to Monad
            </HexagonButton>
        );
    }

    if (isLoading) {
        return (
            <HexagonButton className="w-full" onClick={() => {}} disabled={true}>
                <Loading />
            </HexagonButton>
        );
    }


    if (actionDisabled) {
        return (
            <HexagonButton className="w-full" onClick={() => {}} disabled={true}>
                {text}
            </HexagonButton>
        );
    }

    return (
        <HexagonButton className="w-full" onClick={() => {
            playSound1();
            onAction();
        }} disabled={actionDisabled}>
            {text}
        </HexagonButton>
    );
}