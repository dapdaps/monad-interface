import { CSSProperties, useEffect, useMemo } from "react";
import styles from "./index.module.css";

const COLORS = ["#FFD700", "#FF69B4", "#00CED1", "#ADFF2F", "#FF4500", "#7C5CFC", "#FF964F"];
const PIECES_COUNT = 200;

interface ConfettiPiece {
    left: number;
    delay: number;
    duration: number;
    size: number;
    height: number;
    horizontal: number;
    rotation: number;
    color: string;
}

interface ConfettiProps {
    id: string;
    duration?: number;
    onComplete?: (id: string) => void;
}

function generatePieces(): ConfettiPiece[] {
    return Array.from({ length: PIECES_COUNT }).map(() => {
        const duration = 2.4 + Math.random() * 1.6;

        return {
            left: Math.random() * 100,
            delay: Math.random() * 0.4,
            duration,
            size: 6 + Math.random() * 6,
            height: 8 + Math.random() * 8,
            horizontal: (Math.random() - 0.5) * 40,
            rotation: (Math.random() - 0.5) * 720,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
    });
}

export default function Confetti({ id, duration = 4, onComplete }: ConfettiProps) {
    const pieces = useMemo(() => generatePieces(), []);

    useEffect(() => {
        if (!onComplete || typeof window === "undefined") {
            return;
        }

        const timer = window.setTimeout(() => {
            onComplete(id);
        }, duration * 1000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [duration, id, onComplete]);

    return (
        <div className={styles.wrapper}>
            {pieces.map((piece, index) => {
                const pieceStyle: CSSProperties & Record<string, string> = {
                    left: `${piece.left}%`,
                    animationDelay: `${piece.delay}s`,
                    animationDuration: `${piece.duration}s`,
                    backgroundColor: piece.color,
                    width: `${piece.size}px`,
                    height: `${piece.height}px`,
                    "--horizontal": `${piece.horizontal}vw`,
                    "--rotation": `${piece.rotation}deg`,
                };

                return (
                    <span
                        key={`${id}-${index}`}
                        className={styles.piece}
                        style={pieceStyle}
                    />
                );
            })}
        </div>
    );
}

