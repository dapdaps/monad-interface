import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChartDemo from "./chart/index-demo";
import Leaderboard from "./leaderboard";
import Back from "./back";
import DoomButton from "./button";
import TokenPrice from "./price";
import Bet from "./bet";
import Balance from "./balance";
import useWallet from "./hooks/useWallet";
import useBet from "./hooks/useBet";
import usePriceAndBetsDemo from "./hooks/usePriceAndBetsDemo";
import InsufficientBalanceModal from "./insufficient-balance-modal";
import NumberUpAnimation from "./number-up-animation";
import WalletModal from "./wallet";
import HistoryModal from "./history";
import RulesModal from "./rule";
import Confetti from "./confetti";
import { cleanupAudio, playSound1, playSound2, playSound7, preloadAudio } from "./lib/sound";

export default function MoonOrDoom() {

    const {
        tokenBalance,
        gameBalance,
        deposit,
        depositLoading,
        withdraw,
        withdrawLoading,
        refreshUserInfo,
    } = useWallet();


    const { bet, setBet, handleBet, betLoading, userBet, setInsufficientBalance, insufficientBalance } = useBet({
        gameBalance: gameBalance || 0,
    });

    const { list, betList, winObj, disconnect, animationNumbers, allTimePrice } = usePriceAndBetsDemo({
        userBet
    })

    const [walletModalOpen, setWalletModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [rulesModalOpen, setRulesModalOpen] = useState(false);

    useEffect(() => {
        let playAttempted = false;
        let playSucceeded = false;
        let cleanupClick: (() => void) | null = null;

        preloadAudio().then(() => {
            playAttempted = true;
            playSound7()
                .then(() => {
                    playSucceeded = true;
                })
                .catch(() => {
                    playSucceeded = false;
                });

            const handleUserInteraction = () => {
                if (!playSucceeded && playAttempted) {
                    playSound7().finally(() => {
                        playSucceeded = true;
                    });
                }
                if (cleanupClick) {
                    cleanupClick();
                }
            }
            document.addEventListener('click', handleUserInteraction, { once: true });
            cleanupClick = () => {
                document.removeEventListener('click', handleUserInteraction);
            };
        });

        return () => {
            cleanupAudio();
            if (cleanupClick) cleanupClick();
        };
    }, []);



    return <div className="w-full h-full bg-black pt-[100px] pb-[90px] overflow-hidden px-[30px] text-white bg-[url('/images/moon-or-doom/moon-or-doom-bg.png')] bg-no-repeat bg-[length:100%_100%] bg-center">
        <div className="w-full h-full flex justify-center items-center gap-[10px]">
            <div className="mt-[10px] h-[calc(100%-40px)] w-full">
                <ChartDemo
                    list={list}
                    betList={betList}
                    handleBet={handleBet}
                    winObj={winObj}
                    betLoading={betLoading}
                    bet={bet}
                    userBet={userBet}
                    allTimePrice={allTimePrice}
                />
            </div>
        </div>
    </div>
}