import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Face() {
    const triggerRef = useRef<HTMLDivElement>(null)
    const [isInArea, setIsInArea] = useState(false)

    useEffect(() => {
        if (triggerRef.current) {
            let isInArea = false;

            const handleMouseMove = (e: MouseEvent) => {
                const node = triggerRef.current;
                if (!node) return;
                const rect = node.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                if (
                    x >= rect.left &&
                    x <= rect.right &&
                    y >= rect.top &&
                    y <= rect.bottom
                ) {
                    if (!isInArea) {
                        isInArea = true;
                        setIsInArea(true)
                    }
                } else {
                    if (isInArea) {
                        isInArea = false;
                        setIsInArea(false)
                    }
                }
            };

            const handleClick = (e: MouseEvent) => {
                const node = triggerRef.current;
                if (!node) return;
                const rect = node.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                if (
                    x >= rect.left &&
                    x <= rect.right &&
                    y >= rect.top &&
                    y <= rect.bottom
                ) {
                    window.open('https://lilchogstars.com/', '_blank')
                }
            };

            const handleMouseOut = (e: MouseEvent) => {
                const node = triggerRef.current;
                if (!node) return;
                const rect = node.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                if (
                    x < rect.left ||
                    x > rect.right ||
                    y < rect.top ||
                    y > rect.bottom
                ) {
                    if (isInArea) {
                        isInArea = false;
                        setIsInArea(false)
                    }
                }
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('click', handleClick);
            document.addEventListener('mouseout', handleMouseOut);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('click', handleClick);
                document.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, []);

    return (
        <div className="absolute left-[18%] top-[10%] ">
            <div ref={triggerRef} className="absolute top-0 left-0 w-[130px] h-[70px]">
                <motion.img
                    src="/images/monad/background/face.png"
                    className="w-[130px] max-w-[156px]"
                    alt="face"
                    animate={{
                        y: [0, -10, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                {
                    isInArea && <Tip text="A Chogstar is born" offset={0} />
                }
            </div>

            <motion.img
                src="/images/monad/background/star-1.png"
                className="w-[50px] absolute top-0 left-[136px] max-w-[50px]"
                alt="face"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5
                    }
                }}
            />

            <motion.img
                src="/images/monad/background/star-2.png"
                className="w-[50px] absolute top-[70px] left-[106px] max-w-[50px]"
                alt="face"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1
                    }
                }}
            />

            <motion.img
                src="/images/monad/background/star-3.png"
                className="w-[50px] absolute top-[-70px] left-[30px] max-w-[50px]"
                alt="face"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5
                    }
                }}
            />
        </div>
    )
}

const Tip = ({ text, offset = 0 }: { text: string, offset?: number }) => {
    return (
        <div style={{ marginLeft: offset }} className="absolute transition-all duration-300 left-1/2 -translate-x-1/2 bottom-[95%] z-50">
            <div className="relative flex flex-col items-center">
                <div className="px-4 py-2 rounded-lg bg-[#1A1843CC] text-white font-bold-[300] text-[10px] shadow-lg font-Unbounded whitespace-nowrap">
                    {text}
                </div>
                <div style={{ marginLeft: -offset * 2 }} className="w-0 h-0 border-x-8 border-x-transparent border-t-[10px] mt-[-1px] border-t-[#1A1843CC]"></div>
            </div>
        </div>
    )
}