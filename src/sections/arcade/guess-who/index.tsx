import clsx from "clsx";
import Eyes from "./components/eyes";
import MonsterEye1 from "./components/monsters/eye-1";
import MonsterEye2 from "./components/monsters/eye-2";
import MonsterEye3 from "./components/monsters/eye-3";
import { Monster } from "./config";
import { useCreate } from "./hooks/use-create";
import Monsters from "./components/monsters";
import { motion } from "framer-motion";
import BetInput from "./components/bet-input";
import { useGuessWho } from "./hooks";

const GuessWho = () => {

  const guessWho = useGuessWho();
  const create = useCreate(guessWho);

  return (
    <div className="mainnet-content !pb-0 overflow-auto text-white">
      <div className="flex justify-center gap-[9px] w-[1413px] mx-auto bg-[url('/images/mainnet/arcade/guess-who/bg-star-sky.png')] bg-no-repeat bg-[position:top_center] bg-contain">
        <div className="shrink-0">
          <div className="flex flex-col items-center">
            <div className="relative flex items-end justify-center w-[390px] h-[235px] bg-[url('/images/mainnet/arcade/guess-who/ufo.png')] bg-no-repeat bg-bottom bg-contain">
              <img
                src="/images/mainnet/arcade/guess-who/guess-who.png"
                alt=""
                className="relative z-[2] w-[299px] h-[100px] object-center object-contain translate-y-[-58px]"
              />
              <Eyes className="absolute top-[46px] rotate-[-10deg]" />
            </div>
            <div className="relative flex items-end justify-center z-[2] w-[480px] h-[452px] ml-[50px] mt-[-80px]">
              <Monsters
                betMonster={create.betMonster}
                onSelectMonster={create.onSelectMonster}
                className="absolute z-[1] bottom-[46px]"
              />
              <motion.img
                src="/images/mainnet/arcade/guess-who/ufo-light.png"
                alt=""
                className="w-full h-full object-top object-contain"
                initial={{
                  opacity: 1,
                }}
                animate={create.betMonster?.length > 0 ? {
                  opacity: 1,
                } : {
                  opacity: [
                    1, 0.3, 0.8, 0.1, 0.9, 0.2, 0.7, 0.4, 1, 0.6, 0.3, 0.8, 0.1, 0.9, 0.2, 0.7, 0.4, 1
                  ],
                }}
                transition={create.betMonster?.length > 0 ? void 0 : {
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear",
                  times: [
                    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 1
                  ]
                }}
              />
              <BetInput
                className="absolute z-[1] bottom-[-30px] w-[422px] mx-auto"
                betToken={guessWho.betToken}
                betAmount={create.betAmount}
                setBetAmount={create.setBetAmount}
              />
            </div>
          </div>
          <div className="relative w-[480px] h-[166px] flex justify-center items-center mx-auto mt-[60px] bg-[url('/images/mainnet/arcade/guess-who/create-game-base.png')] bg-no-repeat bg-center bg-contain">
            <motion.button
              type="button"
              className="w-[218px] h-[86px] shrink-0 bg-[url('/images/mainnet/arcade/guess-who/create-game-button.png')] bg-no-repeat bg-center bg-contain"
              onClick={() => {

              }}
              initial={{
                transform: "translateY(-30px)",
              }}
              animate={{
                transform: ["translateY(-30px)", "translateY(-25px)", "translateY(-35px)", "translateY(-30px)"],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "linear",
              }}
              whileHover={{
                transform: "translateY(-30px)",
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                }
              }}
              whileTap={{
                transform: "translateY(-25px)",
                transition: {
                  duration: 0.1,
                  ease: "easeOut",
                }
              }}
            />
            <img
              src="/images/mainnet/arcade/guess-who/create-game-base-right.png"
              alt=""
              className="w-[171px] h-[112px] object-center object-contain pointer-events-none absolute bottom-0 right-[-213px]"
            />
          </div>
        </div>
        <div className="shrink-0">
          <div className="w-[874px] h-[101px] flex justify-between items-center bg-[url('/images/mainnet/arcade/guess-who/bg-room-item.png')] bg-no-repeat bg-center bg-contain">
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessWho;
