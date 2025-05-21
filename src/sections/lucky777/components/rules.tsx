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
                <div className="flex flex-col items-center w-[562px] pb-[30px] px-[20px] max-w-full z-10 relative text-[12px]">
                    <div className="text-center mt-[-16px]">
                        <img src="/images/lucky777/buy-777-title.svg" alt="LUCKY 777" className="w-[183px] mx-auto" />
                    </div>

                    <div className="w-full mt-[20px] text-white">
                        <div className="text-center flex items-center gap-2 justify-center text-[16px] font-bold mb-[20px]">
                            <span className="text-[28px]">🎰</span>
                            <span>Lucky 777 — Game Rules</span>
                        </div>

                        <div className="space-y-[12px]">
                            <div className="flex items-center gap-2">
                                <span className="w-[6px] h-[6px] rounded-1 bg-[#BFFF60]"></span>
                                <span>1 free spin per day</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-[6px] h-[6px] rounded-1 bg-[#BFFF60]"></span>
                                <span>After that, each spin costs 0.1 MON</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-[6px] h-[6px] rounded-1 bg-[#BFFF60]"></span>
                                <span>Match symbols to win MON:</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-[6px] h-[6px] rounded-1 bg-[#BFFF60]"></span>
                                <span>🎯 3 of a kind = Big Win</span>
                            </div>

                            <div className="ml-[20px] space-y-[8px]">
                                <div className="flex items-center gap-2 relative">
                                    <img src="/images/lucky777/logo/madas.svg" alt="NASDA" className="w-[20px] mr-[5px]" />
                                    {X3Icon}
                                    <span>NASDA: 8 MON</span>
                                </div>
                                <div className="flex items-center gap-2 relative">
                                    <img src="/images/lucky777/logo/monad.svg" alt="Monad" className="w-[20px] mr-[5px]" />
                                    {X3Icon}
                                    <span>Monad: 4 MON</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src="/images/lucky777/logo/molandak.svg" alt="Molandak" className="w-[20px]" />
                                    <img src="/images/lucky777/logo/moyaki.svg" alt="Molandak" className="w-[20px]" />
                                    <div className="relative">
                                        <img src="/images/lucky777/logo/chog.svg" alt="Molandak" className="w-[20px] mr-[5px]" />
                                        {X3Icon}
                                    </div>

                                    <span>Molandak / Moyaki / Chog: 2 MON</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-[6px] h-[6px] rounded-1 bg-[#BFFF60]"></span>
                                <span>🎁 2 of a kind = Mini Win</span>
                            </div>

                            <div className="ml-[20px] space-y-[8px]">
                                <div className="flex items-center gap-2 relative">
                                    <img src="/images/lucky777/logo/madas.svg" alt="NASDA" className="w-[24px] mr-[5px]" />
                                    {X3Icon}
                                    <span>NASDA: 1 MON</span>
                                </div>
                                <div className="flex items-center gap-2 relative">
                                    <img src="/images/lucky777/logo/monad.svg" alt="Monad" className="w-[24px] mr-[5px]" />
                                    {X3Icon}
                                    <span>Monad: 0.5 MON</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src="/images/lucky777/logo/molandak.svg" alt="Molandak" className="w-[20px]" />
                                    <img src="/images/lucky777/logo/moyaki.svg" alt="Molandak" className="w-[20px]" />
                                    <div className="relative">
                                        <img src="/images/lucky777/logo/chog.svg" alt="Molandak" className="w-[20px] mr-[5px]" />
                                        {X3Icon}
                                    </div>
                                    <span>Molandak / Moyaki / Chog: 0.3 MON</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="w-[6px] h-[6px] rounded-1 bg-[#BFFF60]"></span>
                                <span> 🌀 Multiplier Mode</span>
                            </div>

                            <div className="ml-[20px] space-y-[8px]">
                                <div>Want to go bigger?</div>
                                <div>You can select 10x or 50x mode before spinning:</div>
                                <div>• Spin cost: 10x or 50x spins</div>
                                <div>• Rewards: 10x or 50x base prizes</div>
                                <div>Example: Hit 3 NASDA on 10x mode = 80 MON</div>
                            </div>

                            <div className="flex items-center gap-2 mt-[20px] text-[#A6A6DB] italic">
                                <span>📌 Rewards will be automatically sent shortly after each spin.</span>
                            </div>
                            <div className="flex items-center gap-2 pl-[20px] text-[#A6A6DB] ">
                                <span className="italic">Spin hard, win big, Degen style </span>
                                🎲 🚀
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RulesModal;


const X3Icon = <div className="absolute bottom-[-5px] left-[10px]">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="1.8335" width="20.3333" height="12.3333" rx="6.16667" fill="#BFFF60" stroke="black" />
            <path d="M4.09 11L6.44 7.94L6.42 8.61L4.18 5.66H5.57L7.14 7.76H6.61L8.19 5.66H9.54L7.28 8.61L7.29 7.94L9.63 11H8.22L6.57 8.77L7.09 8.84L5.47 11H4.09ZM12.3724 11.1C11.8791 11.1 11.3958 11.03 10.9224 10.89C10.4558 10.7433 10.0624 10.5433 9.74242 10.29L10.3024 9.28C10.5558 9.48667 10.8624 9.65333 11.2224 9.78C11.5824 9.90667 11.9591 9.97 12.3524 9.97C12.8191 9.97 13.1824 9.87667 13.4424 9.69C13.7024 9.49667 13.8324 9.23667 13.8324 8.91C13.8324 8.59 13.7124 8.33667 13.4724 8.15C13.2324 7.96333 12.8458 7.87 12.3124 7.87H11.6724V6.98L13.6724 4.6L13.8424 5.09H10.0824V4H14.8524V4.87L12.8524 7.25L12.1724 6.85H12.5624C13.4224 6.85 14.0658 7.04333 14.4924 7.43C14.9258 7.81 15.1424 8.3 15.1424 8.9C15.1424 9.29333 15.0424 9.65667 14.8424 9.99C14.6424 10.3233 14.3358 10.5933 13.9224 10.8C13.5158 11 12.9991 11.1 12.3724 11.1Z" fill="black" />
        </svg>
    </div>