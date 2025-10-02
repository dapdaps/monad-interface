import useGameUser from "../hooks/use-game-user";

export default function User() {
    const { gameUser, isLoading } = useGameUser();

    return (
        <div
            className="absolute bottom-[80px] left-[40px] w-[350px] border-b-2 border-t-2 text-[16px] font-[500] uppercase border-[#A5FFFD] font-Oxanium text-[#A5FFFD] [background:radial-gradient(50%_46.84%_at_50%_53.16%,rgba(0,0,0,0.15)_0%,rgba(165,255,253,0.15)_100%)]"
            style={{
                transform: "perspective(600px) skewX(-8deg) rotateZ(-8deg) rotateY(4deg) "
            }}
        >
            <div className="flex items-center justify-between h-[40px] px-[20px] border-b border-[#A5FFFD]">
                <div>PNL</div>
                <div>{gameUser.profit} MON</div>
            </div>
            <div className="flex items-center justify-between h-[40px] px-[20px] border-b border-[#A5FFFD]">
                <div>Total played</div>
                <div>{gameUser.total_play_times}</div>
            </div>

            <div className="flex items-center justify-between h-[40px] px-[20px] border-b border-[#A5FFFD]">
                <div>History</div>
                <div className="cursor-pointer transition-transform duration-200 hover:scale-125">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.6785 6.70314C14.2749 6.23541 14.1544 5.30017 13.459 4.99876L2.33382 0.176684C1.45594 -0.203821 0.59632 0.747294 1.06337 1.58235L4.45775 7.65124C4.63559 7.9692 4.62644 8.35873 4.43386 8.66798L1.00068 14.1813C0.409187 15.1311 1.58622 16.1873 2.46669 15.4967L13.6785 6.70314Z" fill="#A5FFFD" />
                    </svg>
                </div>
            </div>
        </div>
    )
}