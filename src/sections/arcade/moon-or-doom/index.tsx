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

        {/* AUDIT Button - Fixed at bottom left */}
        <a
            href="/images/mainnet/blocksec_dapdap_monad_game_v1.0-signed.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed left-[30px] bottom-[30px] z-50 inline-flex items-center gap-2 px-4 h-10 rounded-md border border-[#34304B] bg-[#1a1a1a] text-[#A1AECB] hover:bg-white/5 hover:border-white/25 transition-colors select-none"
        >
            <span className="text-[14px] font-[500]">AUDIT</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.36621 0.00292969C3.67886 0.0346964 3.92285 0.299083 3.92285 0.620117C3.92282 0.941128 3.67885 1.20555 3.36621 1.2373L3.30273 1.24023H2.48047C1.79557 1.24023 1.24023 1.79557 1.24023 2.48047V6.86328C1.24039 7.8905 2.07334 8.72363 3.10059 8.72363H7.4707C8.15549 8.72363 8.71075 8.16814 8.71094 7.4834V6.46387C8.71099 6.12157 8.98879 5.84393 9.33105 5.84375C9.67347 5.84375 9.95112 6.12146 9.95117 6.46387V7.4834C9.95099 8.85303 8.84038 9.96289 7.4707 9.96289H3.10059C1.38844 9.96289 0.000150721 8.57539 0 6.86328V2.48047C0 1.11068 1.11068 0 2.48047 0H3.30273L3.36621 0.00292969ZM8.86035 0.0419922C9.14153 0.0419271 9.41148 0.150963 9.61035 0.344727C9.80914 0.538409 9.92073 0.801232 9.9209 1.0752V3.91797C9.92093 4.10257 9.82022 4.27387 9.65625 4.36621C9.49232 4.45848 9.28995 4.45836 9.12598 4.36621C8.96195 4.27389 8.86032 4.1026 8.86035 3.91797V1.67676L4.61816 5.94238C4.42605 6.13567 4.11362 6.15241 3.90039 5.98145L3.86816 5.95312C3.76741 5.85781 3.70928 5.72767 3.70703 5.59082C3.70486 5.45376 3.75855 5.32105 3.85645 5.22266L7.98145 1.0752H5.94434C5.66637 1.07515 5.43596 0.86599 5.41602 0.595703L5.41406 0.558594C5.41433 0.273377 5.65196 0.042093 5.94434 0.0419922H8.86035Z" fill="#8592AB" />
            </svg>

        </a>

    </div>
}