import { useInvitation } from "@/hooks/use-invitation";
import { motion } from "framer-motion";
import Link from "next/link";
import Rules from "./components/rules";
import Code from "./components/code";
import { useInvitationContext } from "@/context/invitation";

const InvitationView = (props: any) => {
  const { } = props;

  const {
    scopeLeftDoor,
    scopeRightDoor,
    scopeCodePad,
    scopeInvitation,
  } = useInvitationContext();

  return (
    <motion.div ref={scopeInvitation} className="fixed top-0 left-0 w-screen h-screen z-[100]">
      <div className="relative z-[2] w-full h-full flex justify-center items-stretch">
        <div className="flex-1 h-full bg-black"></div>
        <motion.div className="w-[1770px] h-full shrink-0 bg-[url('/images/invitation/bg-gate-full.png')] bg-no-repeat bg-cover bg-bottom">
          <motion.div ref={scopeCodePad} className="flex flex-col justify-end items-center gap-[14px] w-full h-full">
            <Rules />
            <Code />
          </motion.div>
        </motion.div>
        <div className="flex-1 h-full bg-black"></div>
      </div>
      <motion.img
        ref={scopeLeftDoor}
        src="/images/invitation/bg-door-left.png"
        alt=""
        className="absolute z-[1] bottom-[126px] left-[calc(50%-31.80vw)] w-[33.89vw] h-[33.19vw] object-contain object-right"
      />
      <motion.img
        ref={scopeRightDoor}
        src="/images/invitation/bg-door-right.png"
        alt=""
        className="absolute z-[1] bottom-[126px] right-[calc(50%-31.80vw)] w-[33.89vw] h-[33.19vw] object-contain object-left"
      />
    </motion.div>
  );
};

export default InvitationView;
