"use client";

import ConnectWallet from "@/components/connect-wallet";
import Sound from "@/components/sound";
import useIsMobile from "@/hooks/use-isMobile";
import { useProgressRouter } from "@/hooks/use-progress-router";
import clsx from 'clsx';
import { usePathname } from "next/navigation";

const FIXED_HEADER_PATHNAME = [/^\/faucet$/, /^\/$/];

const MainLayoutHeader = (props: Props) => {
  const { className, style } = props;
  const router = useProgressRouter();
  const pathname = usePathname();
  const DONT_NEED_SHOW_BACK = ["/"];
  const isMobile = useIsMobile()
  const goHome = () => {
    router.replace("/");
  };
  return (
    <header
      className={clsx(
        "flex w-full lg:h-[60px] md:h-[40px] stroke-black font-CherryBomb top-0 z-50 bear-header",
        FIXED_HEADER_PATHNAME.some((reg) => reg.test(pathname))
          ? "fixed"
          : "sticky",
        className
      )}
      style={style}
    >
      <div className="min-w-[120px]">
        {DONT_NEED_SHOW_BACK.includes(pathname) ? (
          <div />
        ) : (
          <div
            className="cursor-pointer w-[120px]"
            onClick={() => {
              router.back();
            }}
          >
            {
              isMobile ? <img className="mt-[10px] ml-[10px]" src="/images/header/back_button_mobile.svg" alt="back_button" /> : <img src="/images/header/back_button.svg" alt="back_button" />
            }
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className={clsx(`bg-contain bg-no-repeat bg-center`, 
          isMobile ? "w-[160px] h-[40px] bg-[url('/images/mobile/logo.svg')]" : "w-[240px] h-[60px] bg-[url('/images/header/logo_bg.svg')]",
        )}>
        </div>
      </div>

      <div className="min-w-[120px] flex justify-end">
            {
              isMobile ? <div className="w-[40px] h-[40px] flex items-center"><Sound /></div> : <ConnectWallet />
            }
          </div>
    </header>
  );
};

export default MainLayoutHeader;

interface Props {
  className?: string;
  style?: React.CSSProperties;
}
