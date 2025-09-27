import Eyes from "@/sections/arcade/guess-who/components/eyes";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function GuessWho() {
    return (
        <div className="w-[640px] h-[728px] absolute bottom-0 left-0 cursor-pointer bg-[url('/images/mainnet/game/guess_who.png')] bg-no-repeat bg-cover bg-center group">
            <img 
                src="/images/mainnet/game/guess_who_hover.png" 
                className="absolute top-[4px] left-[268px] w-[377px] h-[530px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />

            <div className="absolute top-[5px] left-[313px] -rotate-[12deg] rounded-full pointer-events-none">
                <Eyes size={38} />
            </div>
            {
                [1,2].map((item) => (
                    <div key={item} className={clsx("absolute pointer-events-none top-[68px] left-[310px] text-white text-[42px] font-[800] italic font-Oxanium uppercase -rotate-[12.5deg]", item === 1 ? "[-webkit-text-stroke:15px_#13AEAF]" : "[-webkit-text-stroke:5px_#fff]")}>
                        GuessWho
                    </div>
                ))
            }

            <motion.img
                src="/images/mainnet/game/guess-p-1.png"
                className="absolute top-[160px] left-[370px] w-[92px] pointer-events-none"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.img
                src="/images/mainnet/game/guess-p-2.png"
                className="absolute top-[240px] left-[440px] w-[97px] pointer-events-none"
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div>
                <img src="/images/mainnet/game/guess-p-3.png" className="absolute top-[320px] left-[340px] w-[100px] pointer-events-none" />
                <img src="/images/mainnet/game/guess-bullet.png" className="absolute top-[381px] left-[438px] w-[12px] pointer-events-none" />
            </div>
        </div>
    )
}