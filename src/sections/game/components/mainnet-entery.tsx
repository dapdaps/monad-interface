import GuessWho from "./guess-who";
import Space from "./space";
import Lucky777 from "./lucky777";
import { useEffect, useState } from "react";
export default function MainnetEntry() {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const scale = Math.min(window.innerWidth / 1440, 1);
            setScale(scale);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="w-full h-full bg-[url('/images/mainnet/game/game_home_bg.jpg')] bg-no-repeat bg-cover bg-center">
            <div className="w-full h-full" style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
            }}>
                <GuessWho />
                <Space />
                <Lucky777 />
            </div>
        </div>
    )
}