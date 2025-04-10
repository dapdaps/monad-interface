import useIsMobile from "@/hooks/use-isMobile";
import Setting from "./Setting";
import Refresh from "@/components/icons/refresh";
import Image from "next/image";


const MobileHeader = ({
  dapp
}: any) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={dapp.logo} alt={dapp.name} width={33} height={30} />
      <div className="text-[18px] text-white leading-[18px] font-Unbounded font-semibold">{dapp.name}</div>
      <div className="p-[4px_6px] bg-[#3E347C99] bg-opacity-60 rounded text-[#A5FFFD] font-Unbounded text-[12px] leading-[12px]">Dex</div>
    </div>
  )
}

export default function Header({
  showSetting,
  className,
  style,
  title,
  loading,
  onQuoter,
  dapp,
  from
}: any) {

  const isMobile = useIsMobile()

  return (
    <div
      className={`h-[50px] flex justify-end items-center md:justify-between md:pt-[18px] md:pb-[12px] ${className}`}
      style={style}
    >
      {
        isMobile && from !== "marketplace" ? (
          <MobileHeader dapp={dapp} />
        ) : (
          <div className="text-[18px] font-bold	md:block text-white">
            {title || "Swap"}
          </div>
        )
      }
      <div className="flex items-center gap-[15px]">
        {showSetting && <Setting />}
        <button
          onClick={onQuoter}
          className="duration-500 hover:opacity-70 active:opacity-90 cursor-pointer"
        >
          <Refresh refreshing={loading} />
        </button>
      </div>
    </div>
  );
}
