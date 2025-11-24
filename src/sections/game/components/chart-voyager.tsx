import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Tip from "./tip";

export default function ChartVoyager() {
    const router = useRouter();
    
    // /images/moon-or-doom/chart-voyager.png
    return (
        <div onClick={() => {
            // router.push("/arcade/chart-voyager");
        }} className="w-[358px] h-[752px] absolute bottom-0 left-[calc(50%-320px)] bg-[url('/images/mainnet/e-2.png')] bg-no-repeat bg-cover bg-center group">
            {/* <img 
                src="/images/moon-or-doom/chart-voyager-hover-1.png" 
                className="absolute top-[-1px] left-[53px] w-[290px]  pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            /> */}
            <div className="absolute top-[200px] left-[130px] text-white text-[20px] font-[600] font-Oxanium uppercase">coming soon</div>
            <Tip className="right-[-20px]" content={<div>Updates every second · Ultra-fast pace</div>} />

        </div>
    )
}