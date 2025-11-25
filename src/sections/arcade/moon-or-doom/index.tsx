import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Chart from "./chart";
import ChartDemo from "./chart/index-demo";
import Leaderboard from "./leaderboard";
import Back from "./back";
import DoomButton from "./button";
import TokenPrice from "./price";
import Bet from "./bet";
import Balance from "./balance";
import useWallet from "./hooks/useWallet";
import useBet from "./hooks/useBet";
import usePriceAndBets from "./hooks/usePriceAndBets";
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

    const { list, betList, winObj, disconnect, animationNumbers, allTimePrice } = usePriceAndBets({
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
            <div className="w-[20%] h-full flex flex-col justify-between">
                <div>
                    <Back />
                </div>

                <div className="relative">
                    <div className="absolute top-[-100px] left-0 right-0 pointer-events-none">
                        <img src="/images/moon-or-doom/slogan-new.png" alt="moon-or-doom-logo" className="h-[81px] mx-auto" />
                    </div>
                    <div className="flex justify-end mb-[10px] gap-[10px] items-center">
                      
                        <DoomButton
                            label="Rules"
                            onClick={() => {
                                playSound1(); // play sound when open rules modal
                                setRulesModalOpen(true);
                            }}
                        />
                        <DoomButton
                            label="History"
                            onClick={() => {
                                playSound1(); // play sound when open history modal
                                setHistoryModalOpen(true);
                            }}
                        />
                    </div>
                    <Leaderboard />
                </div>
            </div>
            <div className="flex-1 h-full">
                <div className="h-[40px] flex items-center justify-between pr-[80px]">
                    <TokenPrice price={list && list.length > 0 ? list[list.length - 1].price : 0} />
                    <div className="flex items-center gap-[50px]">
                        <Bet bet={bet} onChange={(betNum) => {
                            setBet(betNum)
                        }} />
                        <Balance
                            gameBalance={gameBalance}
                            onOpenWalletModal={() => {
                                playSound1();
                                setWalletModalOpen(true)
                            }}
                        />
                    </div>
                </div>
                <div className="mt-[10px] h-[calc(100%-40px)]">
                    <Chart
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

        {
            insufficientBalance && (
                <InsufficientBalanceModal
                    open={true}
                    onClose={() => setInsufficientBalance(false)}
                    gameBalance={gameBalance}
                    onRecharge={() => {
                        setWalletModalOpen(true);
                    }}
                />
            )
        }

        <WalletModal
            deposit={deposit}
            depositLoading={depositLoading}
            withdraw={withdraw}
            withdrawLoading={withdrawLoading}
            tokenBalance={tokenBalance}
            gameBalance={gameBalance}
            open={walletModalOpen}
            onSuccess={() => {
                refreshUserInfo?.();
                setWalletModalOpen(false);
                playSound2(); // play sound when deposit success
            }}
            onClose={() => setWalletModalOpen(false)} />

        <HistoryModal
            deposit={deposit}
            depositLoading={depositLoading}
            withdraw={withdraw}
            withdrawLoading={withdrawLoading}
            tokenBalance={tokenBalance}
            gameBalance={gameBalance}
            open={historyModalOpen}
            onSuccess={() => {
                refreshUserInfo?.();
            }}
            onClose={() => setHistoryModalOpen(false)} />

        <RulesModal
            open={rulesModalOpen}
            onClose={() => setRulesModalOpen(false)}
        />

        <AnimatePresence>
            {animationNumbers.length > 0 && animationNumbers.map((item) => (
                <NumberUpAnimation key={item.id} amount={item.amount} id={item.id} />
            ))}
        </AnimatePresence>

        {animationNumbers.map((item) => (
            <Confetti key={`confetti-${item.id}`} id={item.id} />
        ))}
    </div>
}