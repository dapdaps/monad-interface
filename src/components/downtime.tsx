import Footer from "@/layouts/main/footer";

const systemMaintenanceDowntimeExpected = process.env.NEXT_PUBLIC_SYSTEM_MAINTENANCE_DOWNTIME_EXPECTED || "July 9, 2025 at 14:00 UTC";

const Downtime = () => {
  return (
    <div className="relative flex flex-col items-center w-screen h-screen bg-[#0E0F29] bg-[url('/images/downtime/bg.png')] bg-cover bg-center bg-no-repeat">
      <img src="/images/header/logo_bg.svg" alt="" className="w-[240px] md:w-[180px] h-[60px] md:h-[40px] object-center object-contain shrink-0" />
      <div className="mt-[218px] md:mt-[80px] w-[606px] md:w-[calc(100%_-_20px)] h-[270px] md:h-[unset] p-[39px_15px_40px] flex-shrink-0 border border-[#836EF9] bg-[rgba(30,29,34,0.80)] shadow-[0px_0px_20px_0px_rgba(131,110,249,0.50)] backdrop-blur-[10px] text-white text-center font-montserrat text-lg md:text-[14px] font-medium md:font-[400] leading-[150%]">
        <div className="text-[26px] md:text-[22px] font-bold [text-shadow:0px_0px_30px_rgba(255,255,255,0.60)]">
          Under Maintenance
        </div>
        <div className="mt-[47px] md:mt-[20px]">
          We're currently performing scheduled maintenance to improve your experience. Please check back soon.
        </div>
        <div className="text-[#836EF9] mt-[23px] md:mt-[10px]">
          Expected to be back online: {systemMaintenanceDowntimeExpected}
        </div>
      </div>
      <img
        src="/images/downtime/icon-traffic-cone.png"
        alt=""
        className="w-[125px] md:w-[100px] h-[219px] md:h-[180px] object-center object-contain shrink-0 absolute bottom-[7.44vh] md:bottom-[5vh] right-[22vw] md:right-[3vw]"
      />
      <Footer isSound={false} isRpc={false} isWallet={false} />
    </div>
  );
};

export default Downtime;
