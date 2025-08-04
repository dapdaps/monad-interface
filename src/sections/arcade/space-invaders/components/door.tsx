import { motion, useAnimate } from "framer-motion";
import { useSpaceInvadersContext } from "../context";
import { LayerStatus } from "../hooks";
import { useEffect } from "react";

const Door = (props: any) => {
  const { item, layer } = props;

  const { onOpen, openning } = useSpaceInvadersContext();

  const [leftRef, leftAnimate] = useAnimate();
  const [rightRef, rightAnimate] = useAnimate();

  const handleClick = async () => {
    if (openning || layer.status !== LayerStatus.Unlocked) {
      return;
    }

    const res: any = await onOpen?.(layer, item);

    if (!res?.isOpen) {
      return;
    }

    leftAnimate(leftRef.current, { x: "-2.8vw" });
    rightAnimate(rightRef.current, { x: "2.8vw" });
  };

  useEffect(() => {
    if (![LayerStatus.Succeed, LayerStatus.Failed].includes(layer.status)) {
      leftAnimate(leftRef.current, { x: "0" });
      rightAnimate(rightRef.current, { x: "0" });
    }
  }, [layer]);

  return (
    <motion.div
      className="relative w-[7.74vw] h-[8.02vw] shrink-0 overflow-hidden cursor-pointer pl-[0.75vw] pr-[0.75vw] pt-[0.48vw] pb-[0.9vw]"
      onClick={handleClick}
    >
      <motion.div
        className="relative flex justify-center items-center z-[1] w-full h-full overflow-hidden [clip-path:polygon(1vw_0,_calc(100%_-_1vw)_0,_100%_1vw,_100%_100%,_0_100%,_0_1vw)]"
        style={{
          backgroundColor: layer.status === LayerStatus.Succeed
            ? "#BFFF60"
            : (
              layer.status === LayerStatus.Failed
                ? "#EE4444"
                : "unset"
            ),
        }}
      >
        <motion.img
          ref={leftRef}
          src="/images/arcade/space-invaders/door-left.png"
          alt=""
          className="w-[3.70vw] h-[6.75vw] object-bottom absolute z-[2] left-[0.11vw] top-[0.02vw]"
        />
        <motion.img
          ref={rightRef}
          src="/images/arcade/space-invaders/door-right.png"
          alt=""
          className="w-[3.27vw] h-[6.75vw] object-bottom absolute z-[2] right-[0.06vw] top-[0.02vw]"
        />
        {
          item.isGhost && (
            <motion.img
              src="/images/arcade/space-invaders/ghost.png"
              alt=""
              className="w-[4.86vw] h-[4.86vw] object-center object-contain absolute"
              style={{
                zIndex: layer.status === LayerStatus.Succeed ? 3 : 1,
              }}
            />
          )
        }
      </motion.div>
      <img
        src="/images/arcade/space-invaders/door-frame.png"
        alt=""
        className="w-full h-full object-bottom absolute z-[2] left-0 bottom-0"
      />
    </motion.div>
  );
};


export default Door;
