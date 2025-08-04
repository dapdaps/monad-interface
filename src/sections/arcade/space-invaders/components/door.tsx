import { motion, useAnimate } from "framer-motion";
import { useSpaceInvadersContext } from "../context";
import { LayerStatus } from "../hooks";
import { useEffect } from "react";

const Door = (props: any) => {
  const { item, layer } = props;

  const { onOpen, openning } = useSpaceInvadersContext();

  const [leftRef, leftAnimate] = useAnimate();
  const [rightRef, rightAnimate] = useAnimate();

  const handleClick = async (e: any) => {
    if (openning || layer.status !== LayerStatus.Unlocked) {
      return;
    }

    const res: any = await onOpen?.(layer, item, { ev: e });

    if (!res?.isOpen) {
      return;
    }

    leftAnimate(leftRef.current, { x: "clamp(calc(var(--nadsa-laptop-width) * -0.028), -2.8vw, 1px)" });
    rightAnimate(rightRef.current, { x: "clamp(1px, 2.8vw, calc(var(--nadsa-laptop-width)*0.028))" });
  };

  useEffect(() => {
    if (![LayerStatus.Succeed, LayerStatus.Failed].includes(layer.status)) {
      leftAnimate(leftRef.current, { x: "0" });
      rightAnimate(rightRef.current, { x: "0" });
    }
  }, [layer]);

  return (
    <motion.div
      className="relative w-[clamp(1px,_7.74vw,_calc(var(--nadsa-laptop-width)*0.0774))] h-[clamp(1px,_8.02vw,_calc(var(--nadsa-laptop-width)*0.0802))] shrink-0 overflow-hidden cursor-pointer pl-[clamp(1px,_0.75vw,_calc(var(--nadsa-laptop-width)*0.0075))] pr-[clamp(1px,_0.75vw,_calc(var(--nadsa-laptop-width)*0.0075))] pt-[clamp(1px,_0.48vw,_calc(var(--nadsa-laptop-width)*0.0048))] pb-[clamp(1px,_0.9vw,_calc(var(--nadsa-laptop-width)*0.009))]"
      onClick={handleClick}
    >
      <motion.div
        className="relative flex justify-center items-center z-[1] w-full h-full overflow-hidden [clip-path:polygon(clamp(1px,_1vw,_calc(var(--nadsa-laptop-width)*0.01))_0,_calc(100%_-_clamp(1px,_1vw,_calc(var(--nadsa-laptop-width)*0.01)))_0,_100%_clamp(1px,_1vw,_calc(var(--nadsa-laptop-width)*0.01)),_100%_100%,_0_100%,_0_clamp(1px,_1vw,_calc(var(--nadsa-laptop-width)*0.01)))]"
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
          className="w-[clamp(1px,_3.70vw,_calc(var(--nadsa-laptop-width)*0.037))] h-[clamp(1px,_6.75vw,_calc(var(--nadsa-laptop-width)*0.0675))] object-bottom absolute z-[2] left-[clamp(1px,_0.11vw,_calc(var(--nadsa-laptop-width)*0.0011))] top-[clamp(1px,_0.02vw,_calc(var(--nadsa-laptop-width)*0.0002))]"
        />
        <motion.img
          ref={rightRef}
          src="/images/arcade/space-invaders/door-right.png"
          alt=""
          className="w-[clamp(1px,_3.27vw,_calc(var(--nadsa-laptop-width)*0.0327))] h-[clamp(1px,_6.75vw,_calc(var(--nadsa-laptop-width)*0.0675))] object-bottom absolute z-[2] right-[clamp(1px,_0.06vw,_calc(var(--nadsa-laptop-width)*0.0006))] top-[clamp(1px,_0.02vw,_calc(var(--nadsa-laptop-width)*0.0002))]"
        />
        {
          item.isGhost && (
            <motion.img
              src="/images/arcade/space-invaders/ghost.png"
              alt=""
              className="w-[clamp(1px,_4.86vw,_calc(var(--nadsa-laptop-width)*0.0486))] h-[clamp(1px,_4.86vw,_calc(var(--nadsa-laptop-width)*0.0486))] object-center object-contain absolute"
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
