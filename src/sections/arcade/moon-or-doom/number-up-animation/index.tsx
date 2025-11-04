import { motion } from "framer-motion";
import { balanceFormated } from "@/utils/balance";

interface NumberUpAnimationProps {
    amount: number;
    id: string;
}

export default function NumberUpAnimation({ amount, id }: NumberUpAnimationProps) {
    return (
        <motion.div
            key={id}
            initial={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            animate={{
                opacity: [1, 1, 0.8, 0],
                y: -250,
                scale: [1, 1.1, 1.05, 1],
            }}
            exit={{
                opacity: 0,
                y: -250,
            }}
            transition={{
                duration: 2,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] font-Oxanium"
        >
            <div 
                className="text-[16px] font-bold text-[#BFFF60] leading-none whitespace-nowrap"
            >
                + {balanceFormated(amount, 2)} MON
            </div>
        </motion.div>
    );
}

