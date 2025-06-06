// Hooks
import { useEffect, useState } from "react";

// UI
import { Card } from "./ui/card";

type ScorecardProps = {
    score: number;
};

export default function Scorecard({ score }: ScorecardProps) {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        const targetScore = score;
        if (displayScore !== targetScore) {
            const duration = 150; // Total animation duration in ms
            const startTime = Date.now();
            const startScore = displayScore;

            const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;

                if (elapsed < duration) {
                    const progress = elapsed / duration;
                    const nextScore = Math.round(
                        startScore + (targetScore - startScore) * progress
                    );
                    setDisplayScore(nextScore);
                    requestAnimationFrame(animate);
                } else {
                    setDisplayScore(targetScore);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [score, displayScore]);

    return (
        <Card className="text-center justify-center font-Montserrat bg-black font-bold h-[70px] w-[175px] border-[#8184CC] border-[2px] rounded-[10px]">
            <div className="text-[16px] font-bold text-white">Score</div>
            <div className="text-[26px] font-bold-[700] text-[#A5FFFD] retro-number mt-[10px]">
                {displayScore}
            </div>
            <style>{`
                @keyframes flicker {
                0% { opacity: 1; }
                50% { opacity: 0.8; }
                100% { opacity: 1; }
                }
                .retro-number {
                animation: flicker 1s infinite alternate;
                }
            `}</style>
        </Card>
    );
}
