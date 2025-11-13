import Bg from "./components/bg";
import RankingTabsView from "./components/tabs";
import Title from "./components/title";
import UserInfo from "./components/userInfo";
import Booster from "./components/booster";

export default function Ranking() {
    return (
        <div className="w-full h-full bg-black overflow-y-auto pb-[70px]">
            <Bg />
            <div className="relative z-[1] pt-[30px]">
                <Title />
                <div className="flex items-stretch gap-[5%] mt-[35px] mx-auto max-w-[1400px] min-w-[1200px] relative z-1">
                    <div className="w-[33%] text-white shrink-0">
                        <UserInfo />
                        <Booster />
                    </div>
                    <div className="flex-1 text-white">
                        <RankingTabsView />
                    </div>
                </div>
            </div>
        </div>
    )
}