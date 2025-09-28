import clsx from "clsx";
import { Monster } from "../../config";
import MonsterEye1 from "./eye-1";
import MonsterEye2 from "./eye-2";
import MonsterEye3 from "./eye-3";

const Monsters = (props: any) => {
  const {
    betMonster,
    onSelectMonster,
    className,
    visibleMonsters,
  } = props;

  return (
    <div className={clsx("w-full flex justify-center items-end gap-[40px] text-[#A6A6DB]", className)}>
      {
        visibleMonsters?.includes(Monster.Eye1) && (
          <button
            type="button"
            className="flex flex-col justify-end items-center gap-[18px]"
            onClick={() => {
              onSelectMonster(Monster.Eye1);
            }}
          >
            <MonsterEye1
              selected={betMonster?.includes(Monster.Eye1)}
            />
            <div className={clsx("text-[16px]", betMonster?.includes(Monster.Eye1) && "text-white")}>
              One Eye
            </div>
          </button>
        )
      }
      {
        visibleMonsters?.includes(Monster.Eye2) && (
          <button
            type="button"
            className="flex flex-col justify-end items-center gap-[18px]"
            onClick={() => {
              onSelectMonster(Monster.Eye2);
            }}
          >
            <MonsterEye2
              selected={betMonster?.includes(Monster.Eye2)}
            />
            <div className={clsx("text-[16px]", betMonster?.includes(Monster.Eye2) && "text-white")}>
              Two Eyes
            </div>
          </button>
        )
      }
      {
        visibleMonsters?.includes(Monster.Eye3) && (
          <button
            type="button"
            className="flex flex-col justify-end items-center gap-[18px]"
            onClick={() => {
              onSelectMonster(Monster.Eye3);
            }}
          >
            <MonsterEye3
              selected={betMonster?.includes(Monster.Eye3)}
            />
            <div className={clsx("text-[16px]", betMonster?.includes(Monster.Eye3) && "text-white")}>
              Three Eyes
            </div>
          </button>
        )
      }
    </div>
  );
};

export default Monsters;
