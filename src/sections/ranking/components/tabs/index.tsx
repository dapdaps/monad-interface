import { MilitaryRank, RankingTabs } from "../../config";

const RankingTabsView = () => {
  console.log("RankingTabs");
  console.log("RankingTabs: %o", RankingTabs);

  return (
    <div className="w-full text-white">
      <h1>
      {JSON.stringify(RankingTabs)}
      </h1>
      <img
          src={MilitaryRank.General.icon}
          alt=""
          className="w-[33px] h-[52px] object-center object-contain shrink-0"
        />
    </div>
  )
}

export default RankingTabsView;
