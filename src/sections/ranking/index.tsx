import Bg from "./components/bg";
import RankingTabsView from "./components/tabs";
import Title from "./components/title";

export default function Ranking() {
    return (
        <div className="w-full h-full bg-black">
            <Bg />
            <div className="relative z-[1] pt-[30px]">
                <Title />
                <div className="flex gap-[5%] mt-[35px] mx-auto max-w-[1200px]">
                    <div className="w-[33%] bg-[#1B1B22] text-white">left</div>
                    <div className="flex-1 bg-[#1B1B22] text-white">
                        <RankingTabsView />
                    </div>
                </div>
            </div>
        </div>
    )
}