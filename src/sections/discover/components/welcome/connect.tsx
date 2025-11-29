import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";

const WelcomeConnect = (props: any) => {
  const {} = props;

  const { login } = useAuth();

  return (
    <div className="w-full px-[24px] mt-[190px]">
      <div className="w-full border-t border-b border-dashed border-[#6750FF] py-[10px]">
        <div className="w-full h-[222px] bg-black/50 border-t border-b border-dashed border-[#6750FF] flex justify-center items-center">
          <motion.button
            type="button"
            className="p-5 text-[#BFFF60] text-center font-[pixelmix] text-[14px] not-italic font-normal leading-[28px]"
            onClick={() => {
              login();
            }}
            animate={{
              opacity: [1, 0.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            [Connect wallet]
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeConnect;
