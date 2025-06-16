import { motion } from "framer-motion";
import Point from "./point";
import useCustomAccount from "@/hooks/use-account";
import Link from "next/link";
import { useInvitationContext } from "@/context/invitation";
import Keyboards from "./keyboards";
import ConnectButton from "./connect-button";

const Code = (props: any) => {
  const { account } = useCustomAccount();

  const {
    loading,
    validUser,
  } = useInvitationContext();

  return (
    <div className="w-[765px] h-[390px] overflow-hidden shrink-0">
      <div className="w-full h-[431px] pt-[37px] flex justify-center items-start gap-[87px] bg-[url('/images/invitation/bg-code.png')] bg-no-repeat bg-contain bg-center">
        <div className="w-[258px] shrink-0 flex flex-col justify-center items-center gap-[20px] [transform-style:preserve-3d] [transform:perspective(1000px)_rotate3d(1,_0,_0,_25deg)_scale(1.1,_1.2)_skewX(-4.2deg)_translateX(-10px)] [transform-origin:bottom] [perspective-origin:60%_35%]">
          <div className="w-full">
            <ConnectButton />
          </div>
          <div className="relative w-full h-[186px] flex justify-center items-center bg-black [background-image:linear-gradient(to_right,_rgba(120,254,255,0.1)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(120,254,255,0.1)_1px,_transparent_1px)] bg-[length:25px_25px] bg-[position:-1px_-1px] rounded-[6px]">
            <Point delay={0} className="absolute top-[24px] left-[24px]" />
            <Point delay={1} className="absolute top-[24px] left-[174px]" />
            <Point delay={2} className="absolute top-[98px] left-[248px]" />
            <Point delay={1} className="absolute top-[173px] left-[24px]" />
            <Point delay={0} className="absolute top-[173px] left-[224px]" />
            <motion.div
              className="w-[218px] h-[135px] shrink-0 bg-[url('/images/invitation/bg-ticket.png')] bg-no-repeat bg-contain bg-center"
              style={{ x: 8 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            />
            {
              !validUser && !loading && !!account && (
                <div className="w-full h-full absolute overflow-hidden">
                  <motion.div
                    className="w-full h-full flex justify-center items-center flex-col gap-[20px] left-0 top-0 bg-[rgba(0,0,0,0.5)] rounded-[6px]"
                    style={{ x: 8 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15, delay: 0.5 }}
                  >
                    <div className="w-[198px] h-[61px] flex justify-center items-center shrink-0 bg-[rgba(0,0,0,0.6)] border border-[#78FEFF] text-[#A5FFFD] text-center font-Unbounded text-[14px] font-[400] leading-[120%]">
                      No Pass found in<br /> this wallet
                    </div>
                    <div className="text-[#A5FFFD] font-Unbounded text-[12px] font-[400] leading-[120%]">
                      Try to <Link prefetch href="/terminal?from=invitation" className="underline underline-offset-2 cursor-pointer">get a ticket</Link> or<br /> input an invite code
                    </div>
                  </motion.div>
                </div>
              )
            }
          </div>
        </div>
        <Keyboards />
      </div>
    </div>
  );
};

export default Code;
