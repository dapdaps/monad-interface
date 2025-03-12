"use client";

import ConnectWallet from "@/components/connect-wallet";
import { useProgressRouter } from "@/hooks/use-progress-router";
import { usePathname } from "next/navigation";


const MainLayoutHeader = (props: Props) => {
  const { className, style } = props;
  const router = useProgressRouter();
  const pathname = usePathname()
  const DONT_NEED_SHOW_BACK = [
    "/"
  ]
  const goHome = () => {
    router.replace("/");
  };
  return (
    <header
      className={`flex w-full h-[60px] stroke-black sticky font-CherryBomb top-0 z-50 ${className} bear-header`}
      style={style}
    >
      <div className="min-w-[120px]">
        {
          DONT_NEED_SHOW_BACK.includes(pathname) ? (
            <div />
          ) : (
            <div className="cursor-pointer w-[120px]" onClick={() => {
              router.back()
            }}>
              <img src="/images/header/back_button.svg" alt="back_button" />
            </div>
          )
        }
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center justify-center w-[300px] h-[60px] bg-[url('/images/header/logo_bg.svg')]">
          <div className="w-[169px]">
            <img src="/images/header/logo.svg" alt="logo" />
          </div>
        </div>
      </div>

      <div className="min-w-[120px] flex justify-end">
        <ConnectWallet />
      </div>
      <ConnectWallet />
    </header>
  );
};

export default MainLayoutHeader;

interface Props {
  className?: string;
  style?: React.CSSProperties;
}
