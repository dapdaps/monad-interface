import clsx from "clsx";
import MonsterSelector from "./monster";

const Monsters = (props: any) => {
  const {
    betMonster,
    onSelectMonster,
    className,
    visibleMonsters,
    monsters,
  } = props;

  return (
    <div className={clsx("w-full flex justify-center items-end gap-[40px] text-[#A6A6DB]", className)}>
      {
        monsters?.filter?.((monster: any) => visibleMonsters?.includes(monster.value))?.map?.((monster: any, index: number) => (
          <button
            key={index}
            type="button"
            className="flex flex-col justify-end items-center gap-[18px]"
            onClick={() => {
              onSelectMonster(monster.value);
            }}
          >
            <MonsterSelector
              monster={monster}
              selected={betMonster?.includes(monster.value)}
            />
            <div className={clsx("text-[16px]", betMonster?.includes(monster.value) && "text-white")}>
              {monster.name}
            </div>
          </button>
        ))
      }
    </div>
  );
};

export default Monsters;
