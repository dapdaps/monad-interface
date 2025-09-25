import clsx from "clsx";
import { SocialList } from "./icons";
import Link from "next/link";

const LaptopFooter = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("fixed text-white text-[26px] font-[300] leading-[24px] z-[10] left-0 bottom-0 w-full p-[10px_20px_10px_30px] flex justify-between items-end", className)}>
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
      <div className="flex justify-end items-end gap-[9px]">
        {
          SocialList.map((social, index) => (
            <Link
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:opacity-80 transition-all duration-300 flex justify-center items-center w-[36px] h-[36px] border border-[#2F3543] bg-[rgba(25,25,26,0.60)] backdrop-blur-[15px] rounded-[6px]"
              data-bp={social.bp}
            >
              <img
                src={social.icon}
                alt={social.name}
                className="object-contain object-center shrink-0"
                style={{
                  width: social.iconSize[0],
                  height: social.iconSize[1],
                }}
              />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default LaptopFooter;
