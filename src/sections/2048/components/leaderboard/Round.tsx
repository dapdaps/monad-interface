import React, { useState } from "react";
import Modal from "@/components/modal";
import RoundDetail, { Icon } from "./RoundDetail";
import { AnimatePresence, motion } from "framer-motion";

const IconClose = () => (
    <div className="mt-4 mr-4 cursor-pointer">
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3.375L8 0H10L6 4.5L10 9H8L5 5.625L2 9H0L4 4.5L0 0H2L5 3.375Z" fill="#A6A6DB" />
        </svg>
    </div>
);

interface RoundProps {
    open: boolean;
    onClose: () => void;
}

const Round: React.FC<RoundProps> = ({ open, onClose }) => {
    const [rounds, setRounds] = useState([
        {
            round: '1',
            prize: 100,
            time: '2021-01-01 12:00:00'
        }
    ]);

    const [showRoundDetail, setShowRoundDetail] = useState(false);

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeIcon={<IconClose />}
            innerClassName="font-Montserrat"
        >
            <div className="relative p-[30px] pt-0 min-h-[800px]">
                <img src="/images/lucky777/modal-bg.png" alt="LUCKY 777" className="absolute z-1 top-0 left-0 w-full h-full" />
                <div className="flex flex-col items-center w-[562px] pb-[30px] px-[20px] max-w-full z-10 relative text-[12px]">
                    <div className="text-center mt-[-16px]">
                        <img src="/images/2048/leaderboard-title.svg" alt="leaderboard 2048" className="w-[295px] mx-auto max-w-full" />
                    </div>

                    {
                        !showRoundDetail && <div className="w-full mt-[20px]">
                            <div className="grid grid-cols-3 text-[#A6A6DB] text-[14px] px-6 py-2">
                                <div>Round</div>
                                <div>Prize</div>
                                <div>Time</div>
                            </div>
                            <div>
                                {rounds.map((item, idx) => (
                                    <div
                                        key={item.round}
                                        onClick={() => setShowRoundDetail(true)}
                                        className={`grid grid-cols-3 items-center px-6 py-2 my-2 cursor-pointer transition-all bg-[#0000001A] text-white hover:bg-[#836EF933] hover:rounded-md`}
                                    >
                                        <div>{item.round}</div>
                                        <div className="flex items-center gap-2">
                                            <Icon />
                                            {item.prize}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {item.time}
                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 11L5 6L1 1" stroke="white" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }


                    <AnimatePresence>
                        {showRoundDetail && (
                            <motion.div
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '100%', opacity: 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 40, duration: 0.2 }}
                                style={{ position: 'absolute', top: 40, left: 0, width: '100%' }}
                            >
                                <RoundDetail onBack={() => setShowRoundDetail(false)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Modal>
    );
};

export default Round;