import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const Eyes = (props: any) => {
  const { className, size = 64, border = 3, eyeClassName } = props;

  const clipOffset = 1;

  return (
    <div className={clsx("flex items-center gap-[0px] p-10 bg-white", className)}>
      <Eye
        size={size}
        border={border}
        className={eyeClassName}
        clipDirection="right"
        clipOffset={clipOffset}
        style={{
          transform: `translateX(${border * 2 + clipOffset * 2}px)`,
        }}
      />
      <Eye
        size={size}
        border={border}
        className={eyeClassName}
        clipDirection="both"
        clipOffset={clipOffset}
      />
      <Eye
        size={size}
        border={border}
        className={eyeClassName}
        clipDirection="left"
        clipOffset={clipOffset}
        style={{
          transform: `translateX(-${border * 2 + clipOffset * 2}px)`,
        }}
      />
    </div>
  );
};

export default Eyes;

const Eye = (props: any) => {
  const { className, style, size = 64, border = 3, clipDirection, clipOffset } = props;
  const shadowSize = 3;
  const clipBorder = useMemo(() => {
    return border + clipOffset;
  }, [border, clipOffset]);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Generate random position within circular boundary
  const generateRandomPosition = () => {
    // Calculate max radius based on size parameter
    // Eye radius = (size - border) / 2, pupil radius = size * 0.15625 (31.25% / 2)
    // So pupil center can move within: (eye radius - pupil radius)
    const eyeRadius = (size - border) / 2; // {border}px border
    const pupilRadius = size * 0.15625; // 31.25% of size
    const maxRadius = eyeRadius - pupilRadius;

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * maxRadius;

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  useEffect(() => {
    // Set initial position
    setPosition(generateRandomPosition());

    // Set random movement interval
    const moveInterval = setInterval(() => {
      setPosition(generateRandomPosition());
    }, Math.random() * 1500 + 1000); // Random interval

    return () => clearInterval(moveInterval);
  }, [size, clipBorder]);

  const clipPath = useMemo(() => {
    if (clipDirection === "both") {
      return `polygon(${clipBorder}px 0, ${size - clipBorder}px 0, ${size - clipBorder}px ${size + shadowSize}px, ${clipBorder}px ${size + shadowSize}px)`;
    }
    if (clipDirection === "left") {
      return `polygon(${clipBorder}px 0, ${size}px 0, ${size}px ${size + shadowSize}px, ${clipBorder}px ${size + shadowSize}px)`;
    }
    if (clipDirection === "right") {
      return `polygon(0 0, ${size - clipBorder}px 0, ${size - clipBorder}px ${size + shadowSize}px, 0 ${size + shadowSize}px)`;
    }
    return "";
  }, [clipDirection]);

  return (
    <div
      className={clsx("flex justify-center items-center rounded-full border-[#000] bg-[linear-gradient(to_top,_rgba(0,0,0,0.15),_rgba(0,0,0,0)_50%)] bg-[#FFF] shadow-[0_3px_0_0_rgba(0,0,0,0.25)] relative overflow-hidden", className)}
      style={{
        ...style,
        width: size,
        height: size,
        borderWidth: border,
        clipPath,
      }}
    >
      <motion.div
        className="w-[31.25%] h-[31.25%] rounded-full bg-[#000] flex items-center justify-center shrink-0"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
      >
        <div className="w-[25%] h-[25%] rounded-full bg-[#FFF] shrink-0 translate-x-[-50%]" />
      </motion.div>
    </div>
  );
};
