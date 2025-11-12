import Bg from "./components/bg";
import Title from "./components/title";

export default function Ranking() {
    return (
        <div className="w-full h-full bg-black">
            <Bg />
            <div className="relative z-[1] pt-[30px]">
                <Title />
            </div>
        </div>
    )
}