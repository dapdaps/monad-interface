import clsx from "clsx";
import { useState, useEffect } from "react";

const Pending = (props: any) => {
  const { className } = props;
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") {
          return "";
        } else {
          return prev + ".";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={clsx("flex flex-col justify-start items-center mt-[70px]", className)}>
      <img
        src="/images/mainnet/arcade/guess-who/avatar-monster-pending.png"
        alt=""
        className="w-[201px] h-[150px] object-center object-contain shrink-0"
      />
      <div className="text-[#FFF] text-[32px] mt-[20px] text-center">
        Guess Who{dots}
      </div>
    </div>
  );
};

export default Pending;
