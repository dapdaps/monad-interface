import { MilitaryRank } from "../../config";

const RankingTabs = () => {
  return (
    <div>
      <h1>
        <img
          src={MilitaryRank.General.icon}
          alt=""
          className="w-[33px] h-[52px] object-center object-contain shrink-0"
        />
      </h1>
    </div>
  )
}

export default RankingTabs;
