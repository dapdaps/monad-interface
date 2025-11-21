import { BoosterItems } from "@/sections/ranking/config";
import clsx from "clsx";
import { motion } from "framer-motion";

const WelcomeNft = (props: any) => {
  const { bonus } = props;

  return (
    <>
      <div className="w-full px-[24px] mt-[170px]">
        <div className="w-full border-t border-b border-dashed border-[#6750FF] py-[10px]">
          <div className="w-full h-[200px] p-[14px_23px_12px] border-t border-b border-dashed border-[#6750FF] flex justify-center items-center">
            <div className="w-full grid grid-cols-3 gap-[0px]">
              {
                BoosterItems.map((item, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "w-full h-full justify-center flex flex-col items-center gap-[10px]",
                      index !== 0 ? "border-l border-dashed border-[#BFFF60]" : "",
                    )}
                  >
                    <div className="relative flex justify-center items-center">
                      <motion.img
                        src={item.icon}
                        alt=""
                        className="w-[150px] h-[112px] object-center object-contain shrink-0"
                        animate={{
                          opacity: [1, 0.1, 1, 0.1, 1, 0.1, 0.3],
                        }}
                        transition={{
                          duration: 5,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute text-[32px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          delay: 5,
                          duration: 0.3,
                        }}
                      >
                        {bonus?.[`${item.key}_rp`]} RP
                      </motion.div>
                    </div>
                    <div className="">
                      {item.label}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeNft;
