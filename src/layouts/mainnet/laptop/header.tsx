import HexagonButton from "@/components/button/hexagon";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import clsx from "clsx";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const LaptopHeader = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("fixed pr-[14px] pl-[19px] z-[10] left-0 top-0 w-full h-[65px] flex justify-between items-center", className)}>
      <Link
        href="/"
        className="block"
      >
        <img
          src="/images/mainnet/logo.svg"
          alt=""
          className="w-[111px] h-[45px] object-center object-contain shrink-0"
        />
      </Link>
      <Account />
    </div>
  );
};

export default LaptopHeader;

const Account = (props: any) => {
  const { } = props;

  const {
    connecting,
    connected,
    name,
    avatar,
    onConnect,
  } = useConnectWallet();

  return (
    <div className="flex items-center justify-end gap-[10px]">
      {
        connecting ? (
          <>
            <Skeleton width={95} height={24} borderRadius={4} />
            <Skeleton width={40} height={40} borderRadius={4} />
          </>
        ) : (
          connected ? (
            <>
              <div className="text-white text-[16px] font-[600]">
                {name}
              </div>
              <div
                className="w-[40px] h-[40px] rounded-[4px] border border-[#836EF9] shrink-0"
                style={{
                  backgroundImage: avatar,
                }}
              />
            </>
          ) : (
            <HexagonButton
              onClick={onConnect}
              loading={connecting}
              height={40}
              className="!text-[16px]"
            >
              Connect Wallet
            </HexagonButton>
          )
        )
      }
    </div >
  );
};
