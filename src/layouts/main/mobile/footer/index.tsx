import ConnectWallet from "@/components/connect-wallet";
import Rpc from "@/components/rpc";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full h-[53px] bg-[url(/images/mobile/footer-container.svg)] bg-cover bg-no-repeat flex items-center">
      <div className="w-full flex justify-between items-center mb-2 px-[6px] relative">
        <div className="flex items-center gap-[10px]">
          <Link
            className="ease-in-out duration-300 w-[24px] h-[24px] cursor-pointer"
            href="https://x.com/DapDapMeUp"
            target="_blank"
            data-bp="1001-010"
          >
            <img src="/images/mobile/x.svg" alt="" />
          </Link>
          <Link
            className="hover:scale-110 ease-in-out duration-300 w-[24px] h-[24px] cursor-pointer"
            href="https://t.me/DapDapDiscussion"
            target="_blank"
            data-bp="1001-011"
          >
            <img src="/images/mobile/tg.svg" alt="" />
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
