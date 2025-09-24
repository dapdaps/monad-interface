import HexagonButton from "@/components/button/hexagon";
import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import { numberFormatter } from "@/utils/number-formatter";
import Big from "big.js";
import clsx from "clsx";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const LaptopHeader = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("fixed pr-[0px] pl-[31px] z-[10] left-0 top-0 w-full h-[65px] flex justify-between items-center", className)}>
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
    onDisconnect,
    balance,
  } = useConnectWallet();

  return (
    <div className="flex h-full items-start justify-end gap-[10px]">
      {
        connecting ? (
          <div className="h-[64px] flex justify-center items-center gap-[8px] pl-[29px] pr-[12px] shrink-0 text-[18px] leading-[100%] text-white bg-[url('/images/mainnet/layout/corner-connected.svg')] bg-no-repeat bg-left-bottom bg-cover">
            <div className="flex flex-col items-end justify-center gap-[6px]">
              <Skeleton width={85} height={18} borderRadius={4} />
              <div className="flex justify-end items-center gap-[6px]">
                <Skeleton width={18} height={18} borderRadius={9} />
                <Skeleton width={50} height={18} borderRadius={4} />
              </div>
            </div>
            <Skeleton width={40} height={40} borderRadius={4} />
          </div>
        ) : (
          connected ? (
            <Popover
              placement={PopoverPlacement.BottomRight}
              trigger={PopoverTrigger.Hover}
              content={(
                <AccountMenu
                  name={name}
                  avatar={avatar}
                  balance={balance}
                  onDisconnect={onDisconnect}
                />
              )}
            >
              <div className="h-[64px] backdrop-blur-[10px] [clip-path:polygon(0_0,100%_0,100%_100%,15%_100%,0_0)] flex justify-center items-center gap-[8px] pl-[29px] pr-[12px] shrink-0 text-[18px] leading-[100%] text-white bg-[url('/images/mainnet/layout/corner-connected.svg')] bg-no-repeat bg-left-bottom bg-cover">
                <div className="flex flex-col items-end justify-center gap-[6px]">
                  <div className="text-[#8E97AD] text-[14px]">
                    {name}
                  </div>
                  <div className="flex justify-end items-center gap-[6px]">
                    <img
                      src="/images/monad.svg"
                      alt=""
                      className="w-[18px] h-[18px] object-contain object-center shrink-0"
                    />
                    <div className="">
                      {numberFormatter(balance, 2, true, {
                        isShort: true,
                        isShortUppercase: true,
                        isZeroPrecision: true,
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className="w-[40px] h-[40px] rounded-[4px] border border-[#727D97] shrink-0"
                  style={{
                    backgroundImage: avatar,
                  }}
                />
              </div>
            </Popover>
          ) : (
            <button
              type="button"
              className="shrink-0 text-[16px] flex justify-center items-center text-white font-[600] font-[Oxanium] [text-shadow:0_0_10px_rgba(255,255,255,0.60)] h-[50px] pl-[42px] pr-[31px] bg-[url('/images/mainnet/layout/corner-connect.svg')] bg-no-repeat bg-left-bottom bg-cover"
              onClick={onConnect}
            >
              Connect
            </button>
          )
        )
      }
    </div >
  );
};

const AccountMenu = (props: any) => {
  const {
    name,
    avatar,
    balance,
    onDisconnect,
  } = props;

  return (
    <div className="w-[200px] h-[205px] text-white leading-[100%] p-[1px] backdrop-blur-[10px] [clip-path:polygon(0_0,100%_0,100%_100%,10%_100%,0_90%,0_0)] bg-[linear-gradient(230deg,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)]">
      <div className="w-full h-full bg-[radial-gradient(51.76%_59.52%_at_50.44%_40.48%,_rgba(77,_65,_147,_0.00)_0%,_rgba(131,_110,_249,_0.10)_100%)] bg-[rgba(0,0,0,1)] [clip-path:polygon(0_0,100%_0,100%_100%,10%_100%,0_90%,0_0)]">
        <div className="flex items-center gap-[5px] px-[10px] pt-[20px]">
          <div
            className="w-[30px] h-[30px] rounded-full border border-[#727D97] shrink-0"
            style={{
              backgroundImage: avatar,
            }}
          />
          <div className="text-[14px]">
            {name}
          </div>
        </div>
        <div className="mt-[20px] px-[10px]">
          <div className="flex justify-between items-center bg-[rgba(255,255,255,0.2)] rounded-[4px] p-[10px_5px]">
            <div className="flex items-center gap-[5px]">
              <img
                src="/images/monad.svg"
                alt=""
                className="w-[18px] h-[18px] object-contain object-center shrink-0"
              />
              <div className="">
                MON
              </div>
            </div>
            <div className="">
              {numberFormatter(balance, 4, true, {
                isShort: Big(balance || 0).gt(999999.9999),
                isShortUppercase: true,
                isZeroPrecision: true,
              })}
            </div>
          </div>
        </div>
        <Link
          href="/faucet"
          prefetch
          className="mt-[10px] px-[10px] flex items-center gap-[5px]"
        >
          <img
            src="/images/icon-faucet.svg"
            alt=""
            className="w-[11px] h-[11px] object-contain object-center shrink-0"
          />
          <div className="text-[#8E97AD] text-[14px] underline underline-offset-1 translate-y-[1px]">
            Faucet
          </div>
        </Link>
        <div className="w-full h-[1px] my-[10px] bg-[rgba(255,255,255,0.1)]"></div>
        <div className="w-full px-[10px]">
          <button
            type="button"
            className="w-full flex justify-between items-center gap-[5px] px-[10px] py-[10px] hover:bg-[rgba(255,255,255,0.2)] transition-all duration-150 rounded-[4px]"
            onClick={onDisconnect}
          >
            <div className="">Disconnect</div>
            <img
              src="/images/mainnet/layout/icon-log-out.svg"
              alt=""
              className="w-[14px] h-[14px] object-contain object-center shrink-0"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
