import React from "react";
import Modal from "@/components/modal";

const IconClose = () => (
    <div className="mt-[15px] mr-[15px]">
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3.375L8 0H10L6 4.5L10 9H8L5 5.625L2 9H0L4 4.5L0 0H2L5 3.375Z" fill="#A6A6DB" />
        </svg>
    </div>
);

interface RulesModalProps {
    open: boolean;
    onClose: () => void;
}

const RulesModal = ({ open, onClose }: RulesModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            className=""
            closeIcon={<IconClose />}
            innerClassName="font-Unbounded"
        >
            <div className="relative p-[30px] pt-0">
                <img src="/images/lucky777/modal-bg.png" alt="LUCKY 777" className="absolute z-1 top-0 left-0 w-full h-full" />
                <div className="flex flex-col items-center w-[692px] pb-[30px] px-[20px] max-w-full z-10 relative text-[12px]">
                    <div className="text-center mt-[-16px]">
                        <img src="/images/lucky777/buy-777-title.svg" alt="LUCKY 777" className="w-[183px] mx-auto" />
                    </div>

                    <div className="w-full mt-[20px] text-white">
                        <div className="text-center text-[16px] font-bold mb-[20px]">
                        🎰 Lucky 777 — Game Rules
                        </div>
                        
                        <div className="space-y-[16px]">
                            <div className="flex items-center gap-2">
                                <span className="text-[#BFFF60]">•</span>
                                <span className="font-bold">1 free spin per day</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <span className="text-[#BFFF60]">•</span>
                                <span>After that, each spin costs <span className="font-bold">0.1 MON</span></span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[#BFFF60]">•</span>
                                <span className="font-bold">Match symbols to win points:</span>
                            </div>

                            <div className="ml-[20px] space-y-[12px]">
                                <div className="flex items-center gap-2">
                                    <span>🎯 <span className="font-bold">3 of a kind</span> = big win</span>
                                </div>
                                <div className="ml-[20px] space-y-[8px]">
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-2"><img src="/images/lucky777/logo/madas.svg" alt="NASDA" className="w-[20px] h-[20px]" /> NASDA: 5000 pts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-2"><img src="/images/lucky777/logo/monad.svg" alt="Monad" className="w-[20px] h-[20px]" /> Monad: 2500 pts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-2"><img src="/images/lucky777/logo/molandak.svg" alt="Molandak" className="w-[20px] h-[20px]" /> Molandak / Moyaki / Chong: 1000 pts</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-[8px]">
                                    <span>🎁 <span className="font-bold">2 of a kind</span> = mini win</span>
                                </div>
                                <div className="ml-[20px] space-y-[8px]">
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-2"><img src="/images/lucky777/logo/madas.svg" alt="NASDA" className="w-[20px] h-[20px]" /> NASDA: 1000 pts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-2"><img src="/images/lucky777/logo/monad.svg" alt="Monad" className="w-[20px] h-[20px]" /> Monad: 500 pts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-2"><img src="/images/lucky777/logo/molandak.svg" alt="Molandak" className="w-[20px] h-[20px]" /> Molandak / Moyaki / Chong: 250 pts</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[#BFFF60]">•</span>
                                <span className="font-bold">Reach 10,000 pts = Auto-redeem 1 MON (repeatable)</span>
                            </div>

                            <div className="flex items-center gap-2 mt-[20px] text-[#A6A6DB]">
                                📌
                                <span>Points stack automatically. Rewards auto-claim once you hit the threshold.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RulesModal;
