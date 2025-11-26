import clsx from "clsx";
import { motion } from "framer-motion";

const MonsterSelector = (props: any) => {
  const { className, selected, monster } = props;

  return (
    <motion.div
      className={clsx(
        "relative shrink-0 flex justify-center items-center",
        "bg-no-repeat bg-center bg-contain",
        className,
      )}
      style={{
        backgroundImage: selected ? `url("${monster.outline}")` : "unset",
        width: monster.outlineSize[0],
        height: monster.outlineSize[1],
      }}
      transition={{
        duration: 0.15,
      }}
    >
      <img
        src={monster.img}
        alt=""
        className="object-center object-contain shrink-0"
        style={{
          width: monster.size[0],
          height: monster.size[1],
        }}
      />
      <motion.img
        src={monster.shadow}
        alt=""
        className="absolute z-[1] object-center object-contain shrink-0"
        style={{
          opacity: selected ? 0 : 1,
          width: monster.size[0],
          height: monster.size[1],
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </motion.div>
  );
};

export default MonsterSelector;
