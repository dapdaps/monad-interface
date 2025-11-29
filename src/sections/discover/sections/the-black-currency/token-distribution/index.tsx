const TokenDistribution = () => {
  return (
    <div className="w-full flex flex-col  mt-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))]">
      <div className="text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] text-[#A6A6DB] font-[500]">
        Token Distribution
      </div>

      <div className="w-full flex justify-between items-start mt-[clamp(1px,_0.26vw,_calc(var(--pc-1512)*0.0026))]">
        <div className="flex flex-col">
          <div className="text-white text-[clamp(1px,_1.19vw,_calc(var(--pc-1512)*0.0119))] font-[500]">
            10%
          </div>
          <div className="text-[#727D97] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] font-[400]">
            Sitting in marlock's public wallet
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-white text-[clamp(1px,_1.19vw,_calc(var(--pc-1512)*0.0119))] font-[500]">
            90%
          </div>
          <div className="text-[#727D97] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] font-[400] text-right">
            Holding by the NADSA crew
          </div>
        </div>
      </div>

      <div className="w-full h-[8px] flex mt-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))]">
        <div 
          className="h-full bg-[#727D97] rounded-full"
          style={{ width: '10%' }}
        />
        <div 
          className="h-full bg-[#836EF9] rounded-full"
          style={{ width: '90%' }}
        />
      </div>
    </div>
  );
};

export default TokenDistribution;

