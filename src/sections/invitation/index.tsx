import { motion } from "framer-motion";
import Rules from "./components/rules";
import Code from "./components/code";
import { useInvitationContext } from "@/context/invitation";
import { useRef, useEffect, useState } from "react";

const DEFAULT_DOOR_STYLES = {
  width: "33.89vw",
  minWidth: "633px",
  height: "33.19vw",
  minHeight: "620px",
  bottom: "6.7vw",
};
const DEFAULT_DOOR_STYLES_V = {
  width: "61vh",
  minWidth: "633px",
  height: "61vh",
  minHeight: "620px",
  bottom: "11.2vh",
};

const InvitationView = (props: any) => {
  const { } = props;

  const gateRef = useRef<any>();
  const [doorLeftStyles, setDoorLeftStyles] = useState({
    ...DEFAULT_DOOR_STYLES,
    left: `calc(50% - 31.80vw)`,
  });
  const [doorRightStyles, setDoorRightStyles] = useState({
    ...DEFAULT_DOOR_STYLES,
    right: `calc(50% - 31.80vw)`,
  });

  const {
    scopeLeftDoor,
    scopeRightDoor,
    scopeCodePad,
    scopeInvitation,
    finalValid,
  } = useInvitationContext();

  useEffect(() => {
    const updateDoorStyles = () => {
      if (gateRef.current) {
        const { offsetWidth, offsetHeight } = gateRef.current;
        const aspectRatio = offsetWidth / offsetHeight;
        const targetRatio = 1772 / 1070;

        if (offsetWidth <= 1772 && offsetHeight <= 1070) {
          setDoorLeftStyles({
            ...DEFAULT_DOOR_STYLES,
            minWidth: "640px",
            minHeight: "630px",
            bottom: "124px",
            left: `calc(50% - 598px)`,
          });
          setDoorRightStyles({
            ...DEFAULT_DOOR_STYLES,
            minWidth: "640px",
            minHeight: "630px",
            bottom: "124px",
            right: `calc(50% - 598px)`,
          });
          return;
        }

        if (aspectRatio < targetRatio) {
          setDoorLeftStyles({
            ...DEFAULT_DOOR_STYLES_V,
            left: `calc(50% - 57vh)`,
          });
          setDoorRightStyles({
            ...DEFAULT_DOOR_STYLES_V,
            right: `calc(50% - 57vh)`,
          });
        } else {
          setDoorLeftStyles({
            ...DEFAULT_DOOR_STYLES,
            left: `calc(50% - 31.80vw)`,
          });
          setDoorRightStyles({
            ...DEFAULT_DOOR_STYLES,
            right: `calc(50% - 31.80vw)`,
          });
        }
      }
    };

    updateDoorStyles();

    const handleResize = () => {
      updateDoorStyles();
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      updateDoorStyles();
    });

    if (gateRef.current) {
      resizeObserver.observe(gateRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  if (finalValid) {
    return null;
  }

  return (
    <motion.div ref={scopeInvitation} className="fixed top-0 left-0 w-screen h-screen z-[100]">
      <div className="relative z-[2] w-full h-full flex justify-center items-stretch">
        <div className="flex-1 h-full bg-black bg-[url('/images/invitation/bg-wall.png')] bg-no-repeat bg-cover bg-bottom"></div>
        <motion.div ref={gateRef} className="w-[94.45vw] min-w-[1772px] h-full shrink-0 bg-[url('/images/invitation/bg-gate-full.png')] bg-no-repeat bg-cover bg-bottom">
          <motion.div ref={scopeCodePad} className="flex flex-col justify-end items-center gap-[14px] w-full h-full">
            <Rules />
            <Code />
          </motion.div>
        </motion.div>
        <div className="flex-1 h-full bg-black bg-[url('/images/invitation/bg-wall.png')] bg-no-repeat bg-cover bg-bottom"></div>
      </div>
      <motion.img
        ref={scopeLeftDoor}
        src="/images/invitation/bg-door-left.png"
        alt=""
        className="invitation-bg-door invitation-bg-door-left absolute z-[1] object-contain object-right"
        style={doorLeftStyles}
      />
      <motion.img
        ref={scopeRightDoor}
        src="/images/invitation/bg-door-right.png"
        alt=""
        className="invitation-bg-door invitation-bg-door-right absolute z-[1] object-contain object-left"
        style={doorRightStyles}
      />
    </motion.div>
  );
};

export default InvitationView;
