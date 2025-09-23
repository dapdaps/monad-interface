import HexagonButton from "@/components/button/hexagon";
import { useUserStore } from "@/stores/user";
import { formatLongText } from "@/utils/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useDebounceFn } from "ahooks";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useAccount } from "wagmi";

const LaptopHeader = (props: any) => {
  const { className } = props;

  return (
    <div className="fixed pr-[14px] pl-[19px] z-[10] left-0 top-0 w-full h-[65px] flex justify-between items-center">
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

  const connectModal = useConnectModal();
  const { address, isConnected, chainId, chain, isConnecting } = useAccount();
  const userInfo = useUserStore((store: any) => store.user);

  const [connecting, setConnecting] = useState<boolean>(isConnecting);

  const { run: closeConnecting, cancel: cancelCloseConnecting } = useDebounceFn(
    () => {
      setConnecting(false);
    },
    { wait: 10000 }
  );

  useEffect(() => {
    cancelCloseConnecting();
    if (!isConnecting) {
      setConnecting(false);
      return;
    }
    setConnecting(true);
    closeConnecting();
  }, [isConnecting]);

  const onConnect = () => {
    !address && connectModal.openConnectModal?.();
  };

  const [name, avatar] = useMemo(() => {
    const defaultAvatar = "conic-gradient(from 180deg at 50% 50%, #00D1FF 0deg, #FF008A 360deg)";

    if (!address) return ["", defaultAvatar];

    if (userInfo?.twitter) {
      return [
        formatLongText(userInfo?.twitter?.twitter_user_name, 10, 4),
        `url("${userInfo?.twitter?.twitter_avatar}")`
      ];
    }

    return [
      formatLongText(address, 5, 4),
      defaultAvatar,
    ];
  }, [userInfo, address]);

  return (
    <div className="flex items-center justify-end gap-[10px]">
      {
        connecting ? (
          <>
            <Skeleton
              width={95}
              height={24}
              borderRadius={4}
            />
            <Skeleton
              width={40}
              height={40}
              borderRadius={4}
            />
          </>
        ) : (
          isConnected ? (
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
              loading={isConnecting}
            >
              Connect Wallet
            </HexagonButton>
          )
        )
      }
    </div >
  );
};
