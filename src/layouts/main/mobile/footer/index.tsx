import ConnectWallet from "@/components/connect-wallet";
import Rpc from "@/components/rpc";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="z-[50] fixed bottom-0 w-full h-[53px] bg-[url(/images/mobile/footer-container.svg)] bg-cover bg-no-repeat flex items-center">
      <div className="w-full flex justify-between items-center mb-2 px-[6px] relative">
        <div className="flex items-center gap-[10px]">
          <Link
            className="ease-in-out duration-300 w-[24px] h-[24px] cursor-pointer"
            href="https://x.com/0xNADSA"
            target="_blank"
            data-bp="1001-010"
          >
            <img src="/images/footer/x.svg" alt="x" className="w-[24px] cursor-pointer" />
          </Link>
          <Link
            className="hover:scale-110 ease-in-out duration-300 w-[24px] h-[24px] cursor-pointer"
            href="https://mirror.xyz/0xBd6E844F7DaCAF6339C26D5114F83986914803ef"
            target="_blank"
            data-bp="1001-011"
          >
            <img src="/images/footer/mirror.svg" alt="mirror" className="w-[24px] cursor-pointer" />
          </Link>
          <Link
            className="group  ease-in-out duration-300 w-[24px] cursor-pointer relative"
            href="/terminal"
            target="_blank"
            data-bp="1001-012"
          >
            <img src="/images/footer/terminal.svg" alt="ternimal" className="w-[24px] cursor-pointer" />
          </Link>
        </div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2">
          <ConnectWallet />
        </div>
        <Rpc />
      </div>
    </div>
  );
};

export default Footer;
