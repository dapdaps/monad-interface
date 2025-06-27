import Modal from "./modal";

const LeaderBoard = () => {
    return <div className="absolute top-[38vh] right-[5vw] z-50">
        <div className="w-[94px] h-[66px] cursor-pointer bg-[url('/images/monad/leader-board/dapp.png')] bg-no-repeat bg-contain hover:bg-[url('/images/monad/leader-board/dapp-hover.png')] transition-all duration-300">
        </div>
        <div className="w-[94px] h-[66px] mt-[-20px] ml-[5px] cursor-pointer bg-[url('/images/monad/leader-board/nadsa.png')] bg-no-repeat bg-contain hover:bg-[url('/images/monad/leader-board/nadsa-hover.png')] transition-all duration-300">
        </div>

        <Modal open={true} onClose={() => {}} />
    </div>;
};

export default LeaderBoard;