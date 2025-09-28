import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Space() {
    const router = useRouter();
    
    return (
        <div onClick={() => {
            router.push("/arcade/space-invaders");
        }} className="w-[438px] h-[739px] absolute bottom-0 left-1/2 -translate-x-1/2 cursor-pointer bg-[url('/images/mainnet/game/space.png')] bg-no-repeat bg-cover bg-center group">
            <img 
                src="/images/mainnet/game/space_hover.png" 
                className="absolute top-[-10px] left-[8px] w-[320px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />

            { [1,2].map((item) => (
                <motion.div
                    key={item}
                    className={clsx(
                        "absolute leading-[100%] pointer-events-none top-[28px] left-[50px] w-[170px] text-white text-[42px] font-[800] italic font-Oxanium uppercase -rotate-[8deg]",
                        item === 1 ? "[-webkit-text-stroke:15px_#5436FF]" : "[-webkit-text-stroke:5px_#fff]"
                    )}
                    animate={item === 1 ? {
                        // textShadow: [
                        //     "0 0 16px #5436FF, 0 0 32px #5436FF, 0 0 48px #5436FF, 0 0 64px #5436FF",
                        //     "0 0 32px #5436FF, 0 0 64px #5436FF, 0 0 96px #5436FF, 0 0 128px #5436FF",
                        //     "0 0 16px #5436FF, 0 0 32px #5436FF, 0 0 48px #5436FF, 0 0 64px #5436FF"
                        // ],
                        opacity: [0.2, 1, 0.2]
                    } : {
                        // textShadow: [
                        //     "0 0 8px #fff, 0 0 16px #fff, 0 0 24px #fff",
                        //     "0 0 16px #fff, 0 0 32px #fff, 0 0 48px #fff",
                        //     "0 0 8px #fff, 0 0 16px #fff, 0 0 24px #fff"
                        // ],
                        opacity: [0.2, 1, 0.2]
                    }}
                    transition={{
                        duration: 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    SPACE INVADERS
                </motion.div>
            ))}

            <img src="/images/mainnet/game/space-icon.png" className="absolute top-[-14px] right-[125px] w-[85px] pointer-events-none" />
        </div>
    )
}