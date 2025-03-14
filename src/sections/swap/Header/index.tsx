import Setting from "./Setting";
import Refresh from "@/components/icons/refresh";

export default function Header({
  showSetting,
  className,
  style,
  title,
  loading,
  onQuoter
}: any) {
  return (
    <div
      className={`h-[50px] flex justify-end items-center md:justify-between md:pt-[18px] md:pb-[12px] ${className}`}
      style={style}
    >
      <div className="text-[18px] font-bold	md:block text-white">
        {title || "Swap"}
      </div>
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
