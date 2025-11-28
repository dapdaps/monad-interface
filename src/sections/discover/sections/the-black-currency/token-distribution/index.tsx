const TokenDistribution = () => {
  return (
    <div className="w-full flex flex-col  mt-[20px]">
      <div className="text-[14px] text-[#A6A6DB] font-[500]">
        Token Distribution
      </div>

      <div className="w-full flex justify-between items-start mt-[10px]">
        <div className="flex flex-col">
          <div className="text-white text-[18px] font-[500]">
            10%
          </div>
          <div className="text-[#727D97] text-[12px] font-[400]">
            Sitting in marlock's public wallet
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-white text-[18px] font-[500]">
            90%
          </div>
          <div className="text-[#727D97] text-[12px] font-[400] text-right">
            Holding by the NADSA crew
          </div>
        </div>
      </div>

      <div className="w-full h-[8px] flex mt-[10px] gap-[10px]">
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

