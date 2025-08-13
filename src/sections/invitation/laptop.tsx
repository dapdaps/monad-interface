import { motion } from "framer-motion";
import Rules from "./components/rules";
import Code from "./components/code";
import { useInvitationContext } from "@/context/invitation";
import { useRef, useEffect, useState } from "react";
import Footer from "@/layouts/main/footer";

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

const InvitationViewLaptop = (props: any) => {
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
  const [wallStyles, setWallStyles] = useState({
    backgroundSize: "cover",
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
          setWallStyles({
            backgroundSize: "cover",
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
          setWallStyles({
            backgroundSize: "cover",
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
          const widthScale = 60.8 * aspectRatio - 0.9;
          setWallStyles({
            backgroundSize: `${widthScale}% ${widthScale}%`,
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
    <motion.div ref={scopeInvitation} className="fixed top-0 left-0 w-screen h-screen z-[101]">
      <motion.img
        ref={gateRef}
        src="/images/invitation/bg-gate-full2.png"
        alt=""
        className="w-[100vw] h-[100vh] absolute z-[2] left-0 top-0"
      />
      <motion.img
        ref={scopeLeftDoor}
        src="/images/invitation/bg-door-left.png"
        alt=""
        className="w-[43.8326vw] h-[68.8844vh] absolute z-[1] left-[8.89vw] top-[17.5vh]"
      />
      <motion.img
        ref={scopeRightDoor}
        src="/images/invitation/bg-door-right.png"
        alt=""
        className="w-[43.9569vw] h-[68.7922vh] absolute z-[1] right-[8.76vw] top-[17.5vh]"
      />
      <motion.div ref={scopeCodePad} className="flex flex-col justify-end items-center gap-[14px] w-full h-full relative z-[3]">
        <Rules />
        <Code />
        <Footer 
          className=""
          isWallet={false}
        />
      </motion.div>
    </motion.div>
  );
};

export default InvitationViewLaptop;
