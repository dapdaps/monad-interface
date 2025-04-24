import clsx from "clsx";
import { capitalize } from "lodash";

const DappInfo: React.FC<any> = ({
  name,
  category,
  icon,
  tvl,
  volume24h,
  liquidity,
  link,
  left,
  top,
  desc,
  className
}) => {
  return (
    <div
      style={{ left, top }}
      className={clsx("absolute bg-[#1A1843CC] rounded-[6px] p-[20px] left-[178px] z-[10] w-[352px] border border-[#3E347C] backdrop-filter-[10px]", className)}
    >
      <div className="flex items-center gap-[16px]">
        <div className="rounded-[10px] border border-[#836EF9]">
          <img
            src={icon}
            alt={`${name} icon`}
            width={48}
            height={48}
            className="rounded-xl"
          />
        </div>
        <div>
          <h2 className="text-white text-[16px] font-medium">{name}</h2>
          <p className="text-white text-[12px] font-light mt-[8px] uppercase">
            {category}
          </p>
        </div>
      </div>


      <p className="text-[12px] font-light text-white/60 mt-[12px]">
        {desc || "-"}
      </p>

    </div >
  );
};

export default DappInfo;
