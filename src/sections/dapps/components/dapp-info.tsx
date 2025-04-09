import Modal from "@/components/modal";
import useIsMobile from "@/hooks/use-isMobile";
import { capitalize } from "lodash";

const DappInfo: React.FC<any> = ({
  name,
  category,
  icon,
  tvl,
  volume24h,
  liquidity,
  isAudited = true,
  left,
  desc,
  onMouseEnter,
  onMouseLeave
}) => {
  const isMobile = useIsMobile()
  return isMobile ? (
    <Modal open={name} onClose={onMouseLeave}>
      <div className="h-[370px] w-full bg-top bg-[url('/images/dapps/mobile/modal_top.svg')] bg-contain bg-no-repeat bg-[#2B294A]">
    
      </div>
    </Modal>
  ) : (
    <div
      style={{ left }}
      onMouseEnter={onMouseEnter}
      className="absolute top-[78px] bg-[#1A1843CC] rounded-[6px] p-[20px] left-[178px] z-[10] w-[352px] border border-[#3E347C] backdrop-filter-[10px]"
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
          <p className="text-white text-[12px] font-light mt-[8px]">
            {capitalize(category)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-[20px] text-[12px] font-light">
        <div>
          <p className="text-white/60">TVL</p>
          <p className="text-white">{tvl || "-"}</p>
        </div>
        <div>
          <p className="text-white/60">Volume 24h</p>
          <p className="text-white">{volume24h || "-"}</p>
        </div>
        <div>
          <p className="text-white/60">Liquidity</p>
          <p className="text-white">{liquidity || "-"}</p>
        </div>
      </div>

      <p className="text-[12px] font-light text-white/60 mt-[12px]">
        {desc || "-"}
      </p>

      {
        isAudited && (
          <div className="flex items-center gap-[4px] text-[12px] font-light text-white/60 mt-[14px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
            >
              <path
                d="M6.5 0.0746004L11.5 2.46181C11.8 2.66075 12 2.95915 12 3.35702V6.24156C12 7.13677 11.8 7.9325 11.5 8.82771C11.2 9.62345 10.8 10.4192 10.3 11.1155C9.8 11.8117 9.1 12.508 8.4 13.0053C7.7 13.5027 6.9 13.8011 6 14C5.1 13.8011 4.3 13.5027 3.6 13.0053C2.9 12.508 2.2 11.8117 1.7 11.1155C1.2 10.4192 0.8 9.72291 0.5 8.82771C0.2 7.9325 0 7.0373 0 6.1421V3.35702C0 2.95915 0.2 2.66075 0.5 2.46181L5.5 0.0746004C5.8 -0.0248668 6.2 -0.0248668 6.5 0.0746004ZM6 1.16874L1 3.45648V6.1421C1 6.93783 1.1 7.6341 1.4 8.42984C1.7 9.12611 2 9.82238 2.5 10.4192C3.1 11.2149 3.6 11.7123 4.2 12.1101C4.7 12.4085 5.3 12.7069 6 12.9059C6.7 12.7069 7.3 12.4085 7.8 12.1101C8.3 11.7123 8.9 11.2149 9.5 10.4192C10 9.82238 10.3 9.22558 10.6 8.42984C10.9 7.6341 11 6.93783 11 6.1421V3.45648L6 1.16874ZM8.8 4.25222L9.5 4.94849L5.3 9.02664L2.5 6.24156L3.2 5.54529L5.3 7.6341L8.8 4.25222Z"
                fill="#BFFF60"
              />
            </svg>
            <span>Audit</span>
          </div>
        )
      }
    </div >
  );
};

export default DappInfo;
