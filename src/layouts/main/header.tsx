"use client";

import ConnectWallet from "@/components/connect-wallet";
import { useProgressRouter } from "@/hooks/use-progress-router";


const MainLayoutHeader = (props: Props) => {
  const { className, style } = props;
  const router = useProgressRouter();
  const goHome = () => {
    router.replace("/");
  };

  return (
    <header
      className={`w-full h-[68px] stroke-black sticky font-CherryBomb top-0 z-50 ${className} bear-header`}
      style={style}
    >
      <div>
        <ConnectWallet />
      </div>
    </header>
  );
};

export default MainLayoutHeader;

interface Props {
  className?: string;
  style?: React.CSSProperties;
}
