import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Tip from "./tip";
import VideoAd from "./video-ad";

export default function Lucky777() {
    const router = useRouter();
    const [showVideoAd, setShowVideoAd] = useState(false);

    return (
        <>
        <div 
            onClick={() => {
                router.push("/arcade/lucky777");
            }} 
            onMouseEnter={() => setShowVideoAd(true)}
            onMouseLeave={() => setShowVideoAd(false)}
            className="w-[577px] h-[754px] absolute bottom-0 right-[calc(50%-1020px)] cursor-pointer bg-[url('/images/mainnet/game/lucky777.png')] bg-no-repeat bg-cover bg-center group cu">
            <img src="/images/mainnet/game/lucky777_hover.png" className="absolute top-[-10px] left-[-10px] w-[330px] h-[594px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            
            <div
                className="absolute top-[24px] left-[-60px] w-[340px] h-[65px]"
                style={{
                    transform: "perspective(600px) rotateY(-55deg) rotateX(2deg) rotateZ(-6deg) skewX(-6deg)",
                }}
            >
                {
                    lights.map((item, index) => (
                        <motion.div
                            key={index}
                            style={{ left: item.left, top: item.top }}
                            className="absolute rounded-full w-[14px] h-[14px]"
                            initial={{ backgroundColor: "rgba(255,255,255,0)", boxShadow: "0 0 0px 0px #fff" }}
                            animate={{
                                backgroundColor: [
                                    "rgba(255,255,255,0.2)",
                                    "rgba(255,255,255,1)",
                                    "rgba(255,255,255,0.2)"
                                ],
                                boxShadow: [
                                    "0 0 0px 0px #fff",
                                    "0 0 20px 1px #fff",
                                    "0 0 0px 0px #fff"
                                ]
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatDelay: 0.2 * (lights.length - 1),
                                delay: index * 0.2
                            }}
                        />
                    ))
                }
            </div>

            {/* <Tip content={<div>Pure luck · Win MON instantly</div>} /> */}

        </div>
        <motion.div
            animate={{ 
                y: showVideoAd ? 0 : 400,
                opacity: showVideoAd ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute w-[520px] bottom-[-40px] left-1/2 z-50"
        >
            <VideoAd src="/images/mainnet/777-demo-1.mp4" tipContent={<div>Pure luck · Win MON instantly</div>} />
        </motion.div>
        </>
    )
}

const lights = [
    {
        left: -24,
        top: 48,
    },
    {
        left: -24,
        top: 24,
    },
    {
        left: -24,
        top: 0,
    },
    {
        left: 20,
        top: -6,
    },
    {
        left: 70,
        top: -6,
    },
    {
        left: 120,
        top: -6,
    },
    {
        left: 190,
        top: -6,
    },
    {
        left: 250,
        top: -4,
    },
    {
        left: 300,
        top: -2,
    },
    {
        left: 330,
        top: 20,
    },
    {
        left: 330,
        top: 45,
    },
]