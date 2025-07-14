import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import Rpc from "@/components/rpc";
import Sound from "@/components/sound";
import useIsMobile from "@/hooks/use-isMobile";
import FooterMobile from './mobile/footer'

export default memo(function Footer(props: any) {
  const { isSound = true, isRpc = true, isWallet = true } = props;

  const isMobile = useIsMobile();

  if (isMobile && isWallet) return <FooterMobile {...props} />;

  return (
    <div className="z-[99] fixed bottom-0 left-0 flex items-center gap-[10px] pl-[12px] w-[164px] h-[38px]">
      <Link
        className="group ease-in-out duration-300 w-[24px] cursor-pointer relative"
        href="https://x.com/0xNADSA"
        target="_blank"
        data-bp="1001-010"
      >
        <img src="/images/footer/x.svg" alt="x" className="w-[24px] cursor-pointer" />
        <Tip text="X · @0xNADSA" offset={40} />
      </Link>
      <Link
        className="group ease-in-out duration-300 w-[24px] cursor-pointer relative"
        href="https://mirror.xyz/0xBd6E844F7DaCAF6339C26D5114F83986914803ef"
        target="_blank"
        data-bp="1001-011"
      >
        <img src="/images/footer/mirror.svg" alt="mirror" className="w-[24px] cursor-pointer" />
        <Tip text="Mirror" />
      </Link>
      <Link
        className="group  ease-in-out duration-300 w-[24px] cursor-pointer relative"
        href="/terminal"
        target="_blank"
        data-bp="1001-012"
      >
        <img src="/images/footer/terminal.svg" alt="ternimal" className="w-[24px] cursor-pointer" />
        <Tip text="NADSA Terminal" />
      </Link>

      <Link
        className="group  ease-in-out duration-300 w-[24px] cursor-pointer relative"
        href="https://www.dapdap.net/"
        target="_blank"
      >
        <img src="/images/footer/dapdap.svg" alt="dapp" className="w-[24px] cursor-pointer" />
        <Tip text="Powered by DapDap" />
      </Link>

      <Link
        className="group  ease-in-out duration-300 w-[24px] cursor-pointer relative"
        href="https://www.discord.gg/dapdap"
        target="_blank"
      >
        <img src="/images/footer/discord.svg" alt="discord" className="w-[24px] cursor-pointer" />
        <Tip text="discord.gg/dapdap" />
      </Link>


      <div className="fixed right-[10px] bottom-[6px] z-50 flex items-center gap-[8px]">
        {
          !isMobile && isSound && <Sound />
        }
        {
          isRpc && (
            <Rpc />
          )
        }
      </div>
    </div>
  );
});


const Tip = ({ text, offset = 0 }: { text: string, offset?: number }) => {
  return (
    <div style={{ marginLeft: offset }} className="absolute group-hover:opacity-100 opacity-0 transition-all duration-300 left-1/2 -translate-x-1/2 bottom-[110%] z-50">
      <div className="relative flex flex-col items-center">
        <div className="px-4 py-2 rounded-lg bg-[#1A1843CC] text-white font-bold-[300] text-[10px] shadow-lg font-Unbounded whitespace-nowrap">
          {text}
        </div>
        <div style={{ marginLeft: -offset * 2 }} className="w-0 h-0 border-x-8 border-x-transparent border-t-[10px] mt-[-1px] border-t-[#1A1843CC]"></div>
      </div>
    </div>
  )
}