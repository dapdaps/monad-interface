import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Tip from "./tip";

export default function Space() {
    const router = useRouter();
    
    // /images/mainnet/game/space.png
    return (
        <div onClick={() => {
            // router.push("/arcade/space-invaders");
        }} className="w-[438px] h-[739px] absolute bottom-0 right-[calc(50%-500px)] bg-[url('/images/mainnet/e-3-3.png')] bg-no-repeat bg-center bg-[length:100%_100%] group">
            {/* <img 
                src="/images/mainnet/game/space_hover.png" 
                className="absolute top-[-10px] left-[8px] w-[320px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            /> */}

            {/* { [1,2].map((item) => (
                <motion.div
                    key={item}
                    className={clsx(
                        "absolute leading-[100%] pointer-events-none top-[28px] left-[50px] w-[170px] text-white text-[42px] font-[800] italic font-Oxanium uppercase -rotate-[8deg]",
                        item === 1 ? "[-webkit-text-stroke:15px_#5436FF]" : "[-webkit-text-stroke:5px_#fff]"
                    )}
                    // animate={item === 1 ? {
                    //     opacity: [0.2, 1, 0.2]
                    // } : {
                    //     opacity: [0.2, 1, 0.2]
                    // }}
                    // transition={{
                    //     duration: 0.2,
                    //     repeat: Infinity,
                    //     ease: "easeInOut"
                    // }}
                >
                    SPACE INVADERS
                </motion.div>
            ))} */}

            {/* <img src="/images/mainnet/game/space-icon.png" className="absolute top-[-14px] right-[125px] w-[85px] pointer-events-none" /> */}
            <div className="absolute top-[200px] left-[100px] text-white text-[20px] font-[600] font-Oxanium uppercase">coming soon</div>

            {/* <Tip content={<div>Up to <span className='font-bold text-[24px]'>30,000×</span> · Massive multipliers</div>} /> */}
        </div>
    )
}