import HexagonButton from "@/components/button/hexagon";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import { useProgressRouter } from "@/hooks/use-progress-router";
import { IconDiscover, IconArcade, IconMyWallet, IconBridge, IconSwap } from "./icons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LaptopSidebar = (props: any) => {
  const { } = props;

  const pathname = usePathname();
  const router = useProgressRouter();

  const [menuList, setMenuList] = useState([
    {
      name: "Discover",
      icon: (isActive?: boolean) => (
        <IconDiscover
          className={clsx(
            "w-[26px] h-[26px] group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/",
      reg: /^\/$/,
      isActive: false,
    },
    {
      name: "Arcade",
      icon: (isActive?: boolean) => (
        <IconArcade
          className={clsx(
            "w-[30px] h-[26px] group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/arcade",
      reg: /^\/arcade/,
      isActive: false,
    },
    {
      name: "Swap",
      icon: (isActive?: boolean) => (
        <IconSwap
          className={clsx(
            "w-[28px] h-[28px] group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/swap",
      reg: /^\/swap/,
      isActive: false,
    },
    {
      name: "Bridge",
      icon: (isActive?: boolean) => (
        <IconBridge
          className={clsx(
            "w-[28px] h-[19px] group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/bridge",
      reg: /^\/bridge/,
      isActive: false,
    },
    {
      name: "Wallet",
      icon: (isActive?: boolean) => (
        <IconMyWallet
          className={clsx(
            "w-[28px] h-[21px] group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/wallet",
      reg: /^\/wallet/,
      isActive: false,
    },
  ]);

  useEffect(() => {
    const _menuList = menuList.slice();
    for (const menu of _menuList) {
      menu.isActive = false;
      if (menu.reg.test(pathname)) {
        menu.isActive = true;
      }
    }
    setMenuList(_menuList);
  }, [pathname]);

  const onMenu = (menu: any) => {
    if (menu.path === pathname) {
      return;
    }
    router.push(menu.path);
  };

  const onMenuPrefetch = (menu: any) => {
    if (menu.path === pathname) {
      return;
    }
    router.prefetch(menu.path);
  };

  return (
    <div className="fixed z-[9] right-0 top-1/2 -translate-y-1/2 shrink-0 flex items-center justify-end">
      <ul className="relative w-full pl-[5px] flex flex-col gap-[4px]">
        {
          menuList.map((menu, index) => (
            <li
              key={index}
              className={clsx(
                "group relative overflow-hidden uppercase cursor-pointer w-[100px] h-[74px] hover:border-[#836EF9] hover:bg-[radial-gradient(50%_66%_at_46%_50%,_#553BE4_0%,_#221662_100%)] hover:backdrop-blur-[2px] rounded-[2px] border text-[#A1AECB] text-[15px] pl-[5px] flex flex-col items-center justify-center gap-[5px] transition-all duration-150",
                menu.isActive ? "border-[#836EF9] bg-[radial-gradient(50%_66%_at_46%_50%,_#553BE4_0%,_#221662_100%)] backdrop-blur-[2px]" : "border-[#383E4E] bg-balck/50 backdrop-blur-[10px]",
              )}
              onClick={() => onMenu(menu)}
              onMouseEnter={() => onMenuPrefetch(menu)}
            >
              <div
                className={clsx(
                  "group-hover:text-white group-hover:[text-shadow:_0_0_10px_rgba(191,255,96,0.60)] transition-all duration-150",
                  menu.isActive ? "text-white [text-shadow:_0_0_10px_rgba(191,255,96,0.60)]" : "",
                )}
              >
                {menu.name}
              </div>
              {menu.icon(menu.isActive)}
              <div
                className={clsx(
                  "absolute right-0 group-hover:opacity-[0.95] group-hover:translate-x-[0] top-1/2 -translate-y-1/2 w-[6px] h-[54px] bg-[#BFFF60] [clip-path:polygon(3px_0,100%_0,100%_100%,3px_100%,0_calc(100%_-_4px),0_4px)] transition-all duration-300",
                  menu.isActive ? "opacity-[0.95] translate-x-[0]" : "opacity-[0] translate-x-[100%]",
                )}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default LaptopSidebar;

const User = (props: any) => {
  const {
    connecting,
    connected,
    name,
    avatar,
    onConnect,
    balance,
  } = props;

  return (
    <div className="flex flex-col items-center gap-[10px] text-white text-[16px]">
      {
        connecting ? (
          <>
            <Skeleton width={83} height={83} borderRadius={4} />
            <Skeleton width={95} height={24} borderRadius={4} />
            <div className="flex justify-center items-center gap-[6px]">
              <Skeleton width={18} height={18} borderRadius={9} />
              <Skeleton width={40} height={30} borderRadius={4} />
            </div>
          </>
        ) : (
          <>
            <div
              className="w-[83px] h-[83px] rounded-[4px] border border-[#836EF9] shrink-0 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: avatar,
              }}
            />
            {
              connected ? (
                <div className="">
                  {name}
                </div>
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
            }
            <div className="flex justify-center items-center gap-[6px] text-[20px] font-[600]">
              <img
                src="/images/monad.svg"
                alt=""
                className="w-[18px] h-[18px] object-contain object-center shrink-0"
              />
              <div className="">{balance}</div>
            </div>
          </>
        )
      }

    </div>
  );
};
