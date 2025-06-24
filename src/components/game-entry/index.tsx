import { motion } from "framer-motion";
import Modal from "../modal";

export default function GameEntry({ onClose }: { onClose: () => void }) {
    return (
        <Modal open={true}>
            <div className="relative pt-[30px] pb-[50px]">
                <img src="/images/game/mobile-bg.png" className="w-full h-full absolute top-0 left-0" />
                <svg className="absolute top-[30px] right-[20px] cursor-pointer z-30" onClick={() => {
                    onClose()
                }} width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.66602 4.5L10.666 0H13.333L7.99902 6L13.333 12H10.666L6.66602 7.49902L2.66602 12H0L5.33301 6L0 0H2.66602L6.66602 4.5Z" fill="#A6A6DB" />
                </svg>
                <div className="relative z-20">
                    <div className="text-[20px] font-HackerNoonV2 text-[#E7E2FF] text-center">arcade</div>
                    <div className="text-[14px] font-Unbounded text-[#E7E2FF] font-[300] mx-[20px] my-[20px]">
                        Arcade is currently available on PC for the optimal experience. <br />
                        Mobile version coming soon!</div>
                    <img src="/images/game/mobile-front.png" className="w-full" />
                    <div onClick={() => {
                        onClose()
                    }} className="text-[14px] text-center underline cursor-pointer font-Unbounded text-white font-[300] mx-[20px] my-[20px]">I see</div>
                </div>
            </div>
        </Modal>
    );
}