// "use client";

import ConnectWallet from "@/components/connect-wallet";
import Sound from "@/components/sound";
import useIsMobile from "@/hooks/use-isMobile";
import { useProgressRouter } from "@/hooks/use-progress-router";
import { useSafeBack } from "@/hooks/useSafeBack";
import clsx from 'clsx';
import { usePathname } from "next/navigation";


const FIXED_HEADER_PATHNAME = [/^\/faucet$/, /^\/$/];

export async function getServerSideProps({ res }) {
  const is404 = res.statusCode === 404
  console.log("====is404", is404)
  return { props: { is404 } }
}

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
            data-click-sound="/audios/back-click-sound.mp3"
            className="cursor-pointer w-[120px]"
            onClick={goHome}
          >
            {
              isMobile ? <img className="mt-[10px] ml-[10px]" src="/images/header/back_button_mobile.svg" alt="back_button" /> : <img src="/images/header/back_button.svg" alt="back_button" />
            }
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div onClick={() => router.push('/')} className={clsx(`bg-contain bg-no-repeat bg-center hover:cursor-pointer`,
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
