import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Tip from "./tip";
import VideoAd from "./video-ad";

export default function ChartVoyager() {
    const router = useRouter();
    const [showVideoAd, setShowVideoAd] = useState(false);
    const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        return () => {
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
            }
        };
    }, []);

    const clearHideTimer = () => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    const scheduleHide = () => {
        clearHideTimer();
        hideTimerRef.current = setTimeout(() => {
            setShowVideoAd(false);
            hideTimerRef.current = null;
        }, 300); 
    };

    // /images/moon-or-doom/chart-voyager.png
    // /images/mainnet/e-2-2.png
    return (
        <>
        <div 
            onClick={() => {
                router.push("/arcade/chart-voyager");
            }} 
            onMouseEnter={() => {
                clearHideTimer();
                setShowVideoAd(true);
            }}
            onMouseLeave={scheduleHide}
            className="w-[358px] h-[752px] absolute bottom-0 left-[calc(50%-320px)] bg-[url('/images/moon-or-doom/chart-voyager.png')] bg-no-repeat bg-cover bg-center group cursor-pointer">
            <img 
                src="/images/moon-or-doom/chart-voyager-hover-1.png" 
                className="absolute top-[-1px] left-[53px] w-[290px]  pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
            {/* <div className="absolute top-[200px] left-[130px] text-white text-[20px] font-[600] font-Oxanium uppercase">coming soon</div> */}
            {/* <Tip className="right-[-20px]" content={<div>Updates every second · Ultra-fast pace</div>} /> */}

        </div>
        <motion.div
            animate={{ 
                y: showVideoAd ? 0 : 400,
                opacity: showVideoAd ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute w-[260px] bottom-[-40px] left-[50%] z-50"
            onMouseEnter={() => {
                clearHideTimer();
                setShowVideoAd(true);
            }}
            onMouseLeave={scheduleHide}
        >
            <VideoAd src="/images/mainnet/chart-voyager-demo-1.mp4" tipContent={<div>Updates every second · Ultra-fast pace</div>} />
        </motion.div>
        </>
    )
}