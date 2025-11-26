import clsx from "clsx";
import { motion } from "framer-motion";
import { Monster, MONSTERS } from "../../config";

const MonsterEye1 = (props: any) => {
  const { className, selected } = props;

  return (
    <motion.div
      className={clsx(
        "relative shrink-0 flex justify-center items-center",
        "bg-no-repeat bg-center bg-contain",
        className,
      )}
      style={{
        backgroundImage: selected ? `url("${MONSTERS[Monster.Eye1].outline}")` : "unset",
        width: MONSTERS[Monster.Eye1].outlineSize[0],
        height: MONSTERS[Monster.Eye1].outlineSize[1],
      }}
      transition={{
        duration: 0.15,
      }}
    >
      <img
        src={MONSTERS[Monster.Eye1].img}
        alt=""
        className="object-center object-contain shrink-0"
        style={{
          width: MONSTERS[Monster.Eye1].size[0],
          height: MONSTERS[Monster.Eye1].size[1],
        }}
      />
      <motion.img
        src={MONSTERS[Monster.Eye1].shadow}
        alt=""
        className="absolute z-[1] object-center object-contain shrink-0"
        style={{
          opacity: selected ? 0 : 1,
          width: MONSTERS[Monster.Eye1].size[0],
          height: MONSTERS[Monster.Eye1].size[1],
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </motion.div>
  );
};

export default MonsterEye1;
