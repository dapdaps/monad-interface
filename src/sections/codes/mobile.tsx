import RuleModal from "./components/rule-modal";
import CodesDescription from "./components/description";
import { useMission } from "./hooks/use-mission";
import CurrentMission from "./components/mission/current";
import CodesNextDrop from "./components/mission/next-drop";
import Codes from "./components/codes";
import Records from "./components/records";
import RulesButton from "./components/rules-button";

const CodesMobile = () => {
  const { missionData, missionLoading, getMissionData, lastTime, currentRountCodes } = useMission();

  return (
    <div className="w-full pt-[60px] flex flex-col items-center overflow-y-auto h-screen bg-[url('/images/faucet/bg.png')] bg-no-repeat bg-[position:-800px_-100px] bg-[length:1313px]">
      <div className="w-full h-[20px] relative px-[15px] flex justify-center items-center">
        <img src="/images/codes/mobile/title.png" alt="Codes" className="w-[90px] h-[20px] object-center object-contain" />
        <RulesButton className="absolute right-[15px] !mb-[unset]" />
      </div>
      <CodesDescription titleClassName="mt-[20px]" className="!mt-[10px] !mb-[unset]" />
      <RuleModal />
      <div className="w-full px-[15px]">
        <CurrentMission
          className="mt-[10px] !bg-[#836EF9] !border-[#26274B] flex-col gap-[11px] line-clamp-2"
          codesClassName="bg-[rgba(0,0,0,0.44)] h-[32px] rounded-[16px] px-[28px]"
          missionData={missionData}
          missionLoading={missionLoading}
          currentRountCodes={currentRountCodes}
        />
      </div>
      <CodesNextDrop
        className="mt-[8px]"
        screenClassName="!h-[44px]"
        lastTime={lastTime}
        getMissionData={getMissionData}
        missionLoading={missionLoading}
      />
      <div className="w-full px-[15px] mt-[26px]">
        <Codes
          className="!w-full"
          listClassName="!p-[11px_12px] !gap-[12px_8px] !text-[14px]"
        />
      </div>
      <Records className="mt-[30px]" />
    </div>
  );
};

export default CodesMobile;
