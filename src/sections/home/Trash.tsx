import { motion, useAnimation } from "framer-motion";
import { memo, useEffect } from "react";
export default memo(function Trash() {
  const TrashCapControls = useAnimation();
  const FliesControls = useAnimation();

  const TrashCapVariants = {
    initial: { top: -2 },
    stage1: { top: -40 },
    stage2: { top: -13, left: 4, transform: "rotate(10deg)" },
    stage3: { top: -2, left: 0, transform: "rotate(0)" },
  };
  const FliesVariants = {
    initial: { transform: "rotateY(180deg)", zIndex: 0, left: 0, top: 0 },
    stage1: { transform: "rotateY(180deg)", zIndex: 20, left: 0, top: -20 },
    stage2: { transform: "rotateY(180deg)", zIndex: 20, left: [0, -20, -40, -60, -80, -100], top: [-20, -40, -60, -80, -100] },
    stage3: { transform: "rotateY(0)", zIndex: 20, },
    stage4: { transform: "rotateY(0)", zIndex: 0, left: [-100, -80, -60, -40, -20, 0], top: [-100, -80, -60, -40, -20, 0] },
    stage5: { transform: "rotateY(180deg)", zIndex: 0, }
  }
  const TrashCapSequence = async () => {
    await TrashCapControls.start("stage1", {
      duration: 0.3,
      ease: "linear",
    });
    await TrashCapControls.start("stage2", {
      duration: 0.5,
      ease: "linear"
    });
    await TrashCapControls.start("stage3", {
      duration: 0.3,
      ease: "linear",
      delay: 3
    })
  };
  const FliesSequence = async () => {
    await FliesControls.start("stage1", {
      duration: 0.1,
      delay: 0.2,
      ease: "linear",
    });
    await FliesControls.start("stage2", {
      duration: 1.5,
      ease: "linear"
    });
    await FliesControls.start("stage3", {
      duration: 0.5,
      ease: "linear"
    });
    await FliesControls.start("stage4", {
      duration: 1.5,
      ease: "linear"
    });
    await FliesControls.start("stage5", {
      duration: 0.3,
      ease: "linear"
    });
  }
  function play() {
    TrashCapSequence()
    FliesSequence()
  }

  return (
    <div className="absolute z-[120] right-0 top-[25%] cursor-pointer">
      <div className="relative w-[83px] z-10">
        <motion.img
          initial="initial"
          variants={TrashCapVariants}
          animate={TrashCapControls}
          src="/images/trash_cap.svg"
          className="absolute"
        />
        <motion.img
          src="/images/trash_body.svg"
          onClick={play}
        />
      </div>
      <motion.img
        initial="initial"
        variants={FliesVariants}
        animate={FliesControls}
        className="absolute w-[75px] z-0"
        src="/images/flies.gif"
      />
    </div>
  )
})
