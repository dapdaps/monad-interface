import HexagonButton from "@/components/button/hexagon";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import Skeleton from "react-loading-skeleton";

import { IconLogOut, IconDiscover, IconArcade, IconMyWallet, IconBridge, IconSwap, IconMenuArrow } from "./icons";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Rpc from "@/components/rpc";

const LaptopSidebar = (props: any) => {
  const { className } = props;

  const {
    connecting,
    connected,
    name,
    avatar,
    onConnect,
    onDisconnect,
    balance,
  } = useConnectWallet();
  const pathname = usePathname();
  const router = useRouter();

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
      isActive: pathname === "/",
    },
    {
      name: "Arcade",
      icon: (isActive?: boolean) => (
        <IconArcade
          className={clsx(
            "group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/arcade",
      isActive: pathname === "/arcade",
    },
    {
      name: "Swap",
      icon: (isActive?: boolean) => (
        <IconSwap
          className={clsx(
            "group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/swap",
      isActive: pathname === "/swap",
    },
    {
      name: "Bridge",
      icon: (isActive?: boolean) => (
        <IconBridge
          className={clsx(
            "group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/bridge",
      isActive: pathname === "/bridge",
    },
    {
      name: "Wallet",
      icon: (isActive?: boolean) => (
        <IconMyWallet
          className={clsx(
            "group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150",
            isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.60)]" : "text-[#A1AECB]",
          )}
        />
      ),
      path: "/wallet",
      isActive: pathname === "/wallet",
    },
  ]);

  useEffect(() => {
    const _menuList = menuList.slice();
    for (const menu of _menuList) {
      menu.isActive = false;
      if (menu.path === pathname) {
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
    <div className="fixed z-[9] left-0 top-0 w-[226px] h-full bg-black/30 backdrop-blur-[10px] shrink-0 pt-[138px]">
      <User
        connecting={connecting}
        connected={connected}
        name={name}
        avatar={avatar}
        onConnect={onConnect}
        balance={balance}
      />
      <ul className="relative w-full mt-[28px] px-[25px] flex flex-col gap-[0px]">
        {
          menuList.map((menu, index) => (
            <li
              key={index}
              className="group relative cursor-pointer w-[100px] h-[74px] rounded-[2px] border border-[#383E4E] bg-balck/50 backdrop-blur-[10px] text-[#A1AECB] text-[15px] pl-[5px] flex flex-col items-center justify-center gap-[8px]"
              onClick={() => onMenu(menu)}
              onMouseEnter={() => onMenuPrefetch(menu)}
            >
              <div
                className={clsx(
                  "group-hover:text-[#BFFF60] group-hover:[text-shadow:_0_0_10px_rgba(191,255,96,0.60)] transition-all duration-150",
                  menu.isActive ? "text-[#BFFF60] [text-shadow:_0_0_10px_rgba(191,255,96,0.60)]" : "",
                )}
              >
                {menu.name}
              </div>
              {menu.icon(menu.isActive)}
            </li>
          ))
        }
      </ul>
      {
        connected && (
          <button
            type="button"
            className="group hover:text-[#BFFF60] hover:[text-shadow:0_0_10px_rgba(191,_255,_96,_0.60)] transition-all duration-150 absolute left-[30px] bottom-[25px] flex items-center gap-[15px] text-[16px] font-[400] text-white"
            onClick={() => onDisconnect()}
          >
            <IconLogOut
              className="w-[15px] h-[15px] object-contain object-center shrink-0 group-hover:drop-shadow-[0_0_10px_rgba(191,255,96,0.60)] transition-all duration-150"
            />
            <div className="">Log out</div>
          </button>
        )
      }
      <Rpc className="absolute right-[10px] bottom-[25px]" />
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
