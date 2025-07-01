import { useState } from "react";
import Modal from "./modal";

const LeaderBoard = () => {
    const [dappOpen, setDappOpen] = useState(false);
    const [nadsaOpen, setNadsaOpen] = useState(false);
    return <div className="absolute top-[38vh] right-[1vw] z-50">
        <div className="w-[164px] h-[96px] cursor-pointer bg-[url('/images/monad/leader-board/dapp.png')] bg-no-repeat bg-contain hover:bg-[url('/images/monad/leader-board/dapp-hover.png')] transition-all duration-300" onClick={() => {  
            setDappOpen(true);
        }}>
        </div>
        <div className="w-[164px] h-[96px] mt-[-30px] ml-[5px] cursor-pointer bg-[url('/images/monad/leader-board/nadsa.png')] bg-no-repeat bg-contain hover:bg-[url('/images/monad/leader-board/nadsa-hover.png')] transition-all duration-300" onClick={() => {
            setNadsaOpen(true);
        }}>
        </div>

        <Modal type="dapp" open={dappOpen} onClose={() => {
            setDappOpen(false);
        }} />

        <Modal type="nadsa" open={nadsaOpen} onClose={() => {
            setNadsaOpen(false);
        }} />
    </div>;
};

export default LeaderBoard;