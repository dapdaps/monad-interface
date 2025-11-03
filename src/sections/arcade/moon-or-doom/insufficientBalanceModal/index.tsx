import Modal from "@/components/modal";

type InsufficientBalanceModalProps = {
    open: boolean;
    onClose: () => void;
    gameBalance?: number;
    onRecharge: () => void;
};

export default function InsufficientBalanceModal({
    open,
    onClose,
    gameBalance = 0,
    onRecharge,
}: InsufficientBalanceModalProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            innerClassName="rounded-[10px] bg-[linear-gradient(180deg,_#1D1A2E_0%,_#252532_100%)] "
            isShowCloseIcon={false}
        >
            <div className="px-[20px] py-[30px] w-[260px] md:w-full">
                <div className="text-white text-[16px] font-[400] text-center mb-[20px]">
                    Insufficient balance in your game account
                </div>

                <div className="flex items-center justify-center gap-[8px] text-[16px] mb-[20px]">
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3535 0C18.026 4.1649e-05 19.3818 1.35583 19.3818 3.02832V13.6279C19.3818 15.3004 18.026 16.6562 16.3535 16.6562H3.02832C1.35583 16.6562 3.3033e-05 15.3004 0 13.6279V3.02832C5.20369e-05 1.35584 1.35584 5.0926e-05 3.02832 0H16.3535ZM3.02832 1.51465C2.19346 1.5147 1.5147 2.19346 1.51465 3.02832V13.6279C1.51468 14.4628 2.19345 15.1416 3.02832 15.1416H16.3535C17.1884 15.1416 17.8672 14.4628 17.8672 13.6279V11.8867H11.9619C10.7077 11.8865 9.69155 10.8694 9.69141 9.61523V7.04102C9.69141 5.78671 10.7077 4.7697 11.9619 4.76953H17.8672V3.02832C17.8671 2.19346 17.1884 1.51469 16.3535 1.51465H3.02832ZM11.9619 6.28418C11.5446 6.28435 11.2051 6.62365 11.2051 7.04102V9.61523C11.2052 10.0325 11.5447 10.3719 11.9619 10.3721H17.8672V6.28418H11.9619ZM16.3535 7.57129C16.5033 7.57129 16.6499 7.61603 16.7744 7.69922C16.8988 7.7824 16.9955 7.90083 17.0527 8.03906C17.11 8.17735 17.1249 8.32977 17.0957 8.47656C17.0664 8.62324 16.9944 8.75849 16.8887 8.86426C16.7828 8.96995 16.6477 9.04211 16.501 9.07129C16.3542 9.10042 16.2017 9.08558 16.0635 9.02832C15.9252 8.97101 15.8068 8.87348 15.7236 8.74902C15.6405 8.62456 15.5967 8.47778 15.5967 8.32812C15.5968 8.12744 15.6764 7.93488 15.8184 7.79297C15.9603 7.65108 16.1528 7.5713 16.3535 7.57129Z" fill="#A1AECB" />
                    </svg>
                    <span className="text-white font-[600]">{Number(gameBalance).toFixed(2)} MON</span>
                </div>

                <button
                    onClick={() => {
                        onClose();
                        onRecharge();
                    }}
                    className="w-full py-[8px] rounded-[10px] border border-[#31FFA6] bg-[#31FFA61A] text-[#31FFA6] text-[16px] font-[500] hover:bg-[#32CD32]/10 transition-colors select-none"
                >
                    Recharge
                </button>
            </div>
        </Modal>
    );
}