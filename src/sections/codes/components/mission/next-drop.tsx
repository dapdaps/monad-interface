import clsx from "clsx";
import { motion } from "framer-motion";
import { MissionScreen } from ".";

const CodesNextDrop = (props: any) => {
  const { className, lastTime, getMissionData, missionLoading, screenClassName } = props;

  const notZeroLastTime = /^\d+/.test(lastTime);

  return (
    <div className={clsx("m-[24px_0_0px] flex flex-col items-center gap-[9px] text-[12px] font-Unbounded font-light", className)}>
      <div className="text-[#A6A6DB] flex items-center gap-[4px]">
        <div>Next code drop in</div>
        <div>
          {
            !notZeroLastTime && (
              <button
                type="button"
                className="w-[16px] h-[16px] flex items-center justify-center"
                onClick={() => getMissionData()}
                disabled={missionLoading}
              >
                <motion.img
                  src="/images/icon-refresh.svg"
                  alt="refresh"
                  className="w-[12px] h-[12px] object-center object-contain"
                  animate={missionLoading ? {
                    rotate: [0, 360],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                    }
                  } : void 0}
                />
              </button>
            )
          }
        </div>
      </div>
      <MissionScreen className={screenClassName}>
        {lastTime}
      </MissionScreen>
    </div>
  );
};

export default CodesNextDrop;
