import Bg from "./components/bg";
import Title from "./components/title";
import UserInfo from "./components/userInfo";
import Booster from "./components/booster";

export default function Ranking() {
    return (
        <div className="w-full h-full bg-black font-Oxanium">
            <Bg />
            <div className="relative z-[1] pt-[30px]">
                <Title />
                <div className="flex gap-[4%] mt-[35px] mx-auto max-w-[1400px] min-w-[1200px] px-4 relative z-[1]">
                    <div className="w-[33%]">
                        <UserInfo />
                        <Booster />
                    </div>
                    <div className="flex-1 bg-[#1B1B22] rounded-[8px] p-6">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}