import clsx from "clsx";

const LaptopFooter = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("fixed text-white text-[26px] font-[300] leading-[24px] z-[10] left-0 bottom-0 w-full p-[10px_20px_10px_30px] flex justify-between items-center", className)}>
      <div className="flex flex-col gap-[17px]">
        <div className="flex items-end gap-[30px]">
          <div className="flex flex-col gap-[15px]">
            <div className="text-[#727D97] text-[14px] font-[400] leading-[15px] uppercase">
              total rewards
            </div>
            <div className="flex items-end gap-[12px]">
              <div className="">
                134,125.264
              </div>
              <div className="text-[#333947] font-[400] text-[16px] leading-[24px]">
                MON
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[15px]">
            <div className="text-[#727D97] text-[14px] font-[400] leading-[15px] uppercase">
              TVL
            </div>
            <div className="flex items-end gap-[12px]">
              <div className="">
                $1,534,125.264
              </div>
            </div>
          </div>
        </div>
        <img
          src="/images/mainnet/layout/footer-line.png"
          alt=""
          className="w-[435px] h-[6px] object-contain object-center shrink-0"
        />
      </div>
    </div>
  );
};

export default LaptopFooter;
