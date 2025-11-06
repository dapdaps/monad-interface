import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ChartVoyager() {
    const router = useRouter();
    
    return (
        <div onClick={() => {
            router.push("/arcade/chart-voyager");
        }} className="w-[358px] h-[752px] absolute bottom-0 left-[calc(50%-320px)] cursor-pointer bg-[url('/images/moon-or-doom/chart-voyager.png')] bg-no-repeat bg-cover bg-center group">
            <img 
                src="/images/moon-or-doom/chart-voyager-hover-1.png" 
                className="absolute top-[-1px] left-[53px] w-[290px]  pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
        </div>
    )
}