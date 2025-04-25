"use client";

import MobileNetworks from "@/components/connect-wallet/networks";
import MobileUser from "@/components/connect-wallet/user";
import Popover, {
  PopoverPlacement,
  PopoverTrigger
} from "@/components/popover";
import allTokens from "@/configs/allTokens";
import useIsMobile from "@/hooks/use-isMobile";
import useToast from "@/hooks/use-toast";
import useUser from "@/hooks/use-user";
import { useWalletName } from "@/hooks/use-wallet-name";
import { useAppKit } from "@reown/appkit/react";
import { useDebounceFn } from "ahooks";
import Big from "big.js";
import { utils } from "ethers";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useAccount, useBalance, useDisconnect, useConfig } from "wagmi";
import MobileChain from "./chain/mobile";
import { monadTestnet } from "@reown/appkit/networks";
import useAudioPlay from "@/hooks/use-audio";
import { DEFAULT_CHAIN_ID } from "@/configs";

const dropdownAnimations = {
  active: {
    opacity: [0, 1],
    y: [10, 0],
    display: "block"
  },
  default: {
    opacity: [1, 0],
    y: [0, 10],
    display: "none"
  }
};

const ConnectWallet = ({ className }: { className?: string }) => {
  const modal = useAppKit();
  const [_, setUpdater] = useState({});

  const pathname = usePathname();
  const isMobile = useIsMobile();
  const total = useToast();
  const { address, isConnected, chainId, chain, isConnecting } = useAccount();
  const balance = useBalance({
    address,
    chainId: DEFAULT_CHAIN_ID
  });
  const { userInfo } = useUser();
  const walletInfo = useWalletName();
  const config = useConfig();
  const { play } = useAudioPlay()

  const handlePlay = () => {
    play('/audios/press_button.mp3')
  }

  const [connecting, setConnecting] = useState<boolean>(isConnecting);
  const [mobileUserInfoVisible, setMobileUserInfoVisible] =
    useState<boolean>(false);
  const [mobileNetworksVisible, setMobileNetworksVisible] =
    useState<boolean>(false);

  const currentChainInfo = config.chains.find((c) => c.id === chainId);

  const handleConnect = function () {
    if (isMobile && isConnected) {
      setMobileUserInfoVisible(true);
      return;
    }

    !address && modal.open();
  };

  const addressShown = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  }, [address, isMobile]);

  const handleCopy = () => {
    handlePlay()
    navigator.clipboard.writeText(address as string);
    total.success({
      title: `Copied address ${address}`
    });
  };

  const balanceShown = useMemo(() => {
    if (balance?.data?.value) {
      return Big(
        utils.formatUnits(balance.data.value.toString(), balance.data.decimals)
      ).toFixed(3, 0);
    }
    return "0.000";
  }, [balance]);

  const tokenSymbolShown = useMemo(() => {
    if (balance?.data?.symbol) {
      return balance?.data?.symbol;
    }
    if (chain) {
      return chain.nativeCurrency?.symbol;
    }
    return "";
  }, [balance, chain]);

  const tokenLogoShown = useMemo(() => {
    const defaultLogo = "/images/monad.svg";
    if (!chainId) {
      return defaultLogo;
    }
    const currChainTokens = allTokens[chainId];
    if (!currChainTokens) {
      return defaultLogo;
    }
    const currChainToken = currChainTokens.find(
      (it: any) => it.symbol === tokenSymbolShown
    );
    if (!currChainToken) {
      return defaultLogo;
    }
    return currChainToken.icon;
  }, [chainId, tokenSymbolShown]);

  const handleChainDropdown = () => {
    if (isMobile) {
      setMobileNetworksVisible(true);
      return;
    }
  };

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

  return (
    <>
      {connecting ? (
        <Skeleton
          width={isMobile ? 128 : 125}
          height={isMobile ? 36 : 50}
          borderRadius={21}
          style={{ transform: "translateY(-4px)" }}
        />
      ) : isConnected ? (
        <div className="flex items-center justify-center w-[165px] lg:h-[43px] md:h-[36px] lg:bg-[url('/images/header/user_bg.svg')] bg-no-repeat bg-center">
          <User
            handleConnect={handleConnect}
            isMobile={isMobile}
            address={address}
            userInfo={userInfo}
            walletInfo={walletInfo}
            handleCopy={handleCopy}
            tokenLogoShown={tokenLogoShown}
            chainId={chainId}
            balanceShown={balanceShown}
            tokenSymbolShown={tokenSymbolShown}
            addressShown={addressShown}
            setMobileUserInfoVisible={setMobileUserInfoVisible}
            currentChainInfo={currentChainInfo}
            handlePlay={handlePlay}
          />
        </div>
      ) : (
        <ConnectLayout onConnect={handleConnect} />
      )}
      <MobileUser
        visible={mobileUserInfoVisible}
        setMobileUserInfoVisible={setMobileUserInfoVisible}
        onClose={() => {
          setMobileUserInfoVisible(false);
        }}
        walletInfo={walletInfo}
        addressShown={addressShown}
        address={address}
        tokenLogoShown={tokenLogoShown}
        balanceShown={balanceShown}
        tokenSymbolShown={tokenSymbolShown}
        chainId={chainId}
        handleDisconnect={() => void 0}
        handleCopy={handleCopy}
        userInfo={userInfo}
        currentChainInfo={currentChainInfo}
      />
    </>
  );
};

const ConnectLayout = ({
  onConnect
}: {
  onConnect: () => void;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div 
        onClick={onConnect}
        data-click-sound
        data-bp="1001-001"
        className="w-[128px] h-[36px] bg-no-repeat bg-[url(/images/mobile/connect.svg)]"></div>
    )
  }

  return (
    <div className="flex items-center justify-center h-[50px] w-[158px]  bg-[url('/images/header/right_bg.svg')] bg-left bg-contain">
      <button
        data-click-sound
        data-bp="1001-001"
        className="w-[122px] h-[34px] bg-[url('/images/header/button_bg.svg')] cursor-pointer font-Unbounded text-[12px] text-[#090909] font-semibold"
        onClick={onConnect}
      >
        Connect
      </button>
  </div>
  )
}

export default memo(ConnectWallet);

const User = (props: any) => {
  const {
    handleConnect,
    isMobile,
    address,
    userInfo,
    walletInfo,
    handleCopy,
    tokenLogoShown,
    chainId,
    balanceShown,
    tokenSymbolShown,
    addressShown,
    setMobileUserInfoVisible,
    currentChainInfo,
    handlePlay
  } = props;

  const router = useRouter();

  const content = (
    <div className="bg-[url(/images/header/wallet-popover-bg.svg)] w-[205px] h-[218px] overflow-hidden">
      <div className="px-2.5 mt-[28px]">
        <div className="flex justify-between mb-5">
          <div className="flex gap-2">
            <div className="w-[30px] h-[30px] rounded-[50%] border-2 border-black bg-[conic-gradient(from_180deg_at_50%_50%,#00D1FF_0deg,#FF008A_360deg)]" />
            <div className="flex flex-col gap-[6px]">
              <div className="text-white text-[12px] font-[400] leading-[1] font-Unbounded">
                {addressShown}
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={walletInfo.icon}
                  className="w-4 object-contain"
                  alt=""
                />
                <div className="text-[#A6A6DB] font-Unbounded text-[10px] font-[300] leading-[10px] max-w-[50px] truncate">
                  {currentChainInfo?.id === monadTestnet.id
                    ? "Monad"
                    : currentChainInfo?.name || ""}
                </div>
                <div className="bg-white bg-opacity-20 p-[1px] rounded-[4px] text-[8px] text-[#A6A6DB] font-Unbounded">
                  {currentChainInfo?.testnet ? "Testnet" : "Mainnet"}
                </div>
              </div>
            </div>
          </div>
          <img
            className="cursor-pointer"
            src="/images/header/copy.svg"
            onClick={handleCopy}
            alt=""
          />
        </div>
        <div className="flex px-[6px] h-[40px] items-center justify-between w-full bg-white bg-opacity-20 rounded-[6px]">
          <div className="flex items-center gap-1">
            <img src={tokenLogoShown} className="w-5 h-5" alt="" />
            <div className="text-white text-[12px] font-Unbounded font-[400]">
              {tokenSymbolShown}
            </div>
          </div>
          <div className="text-white text-[12px] font-Unbounded font-[400]">
            {balanceShown}
          </div>
        </div>
        <div className="flex items-center gap-1 mt-2 ml-[4px]">
          <img src="/images/icon-faucet.svg" alt="" />
          <div
            onClick={() => {
              handlePlay()
              router.push("/faucet")
            }}
            className="text-[12px] font-[300] leading-[1] font-Unbounded text-[#A6A6DB] underline hover:text-white cursor-pointer"
          >
            Faucet
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#A6A6DB] bg-opacity-10 mt-3"></div>
      <DisconnectButton handlePlay={handlePlay} setMobileUserInfoVisible={setMobileUserInfoVisible} />
    </div>
  );

  const BalanceDisplay = ({ className = "" }) => (
    <div className={`flex items-center gap-1 ${className}`}>
      <img 
        src='/images/monad.svg'
        className="w-5 h-5" 
        alt="" 
      />
      <div className="text-[12px] text-white font-[400] font-Unbounded">
        {balanceShown || "-"}
      </div>
    </div>
  );

  const AvatarDisplay = ({ hasAvatar = false }) => (
    hasAvatar ? (
      <img
        src={userInfo?.avatar}
        alt=""
        className="w-[28px] h-[28px] rounded-full"
      />
    ) : (
      <div className="w-[28px] h-[28px] rounded-[50%] border-[2px] border-black bg-[conic-gradient(from_180deg_at_50%_50%,#00D1FF_0deg,#FF008A_360deg)]" />
    )
  );

  return (
    <motion.div
      className="relative flex justify-center items-center cursor-pointer transition-all duration-300"
      onClick={handleConnect}
      whileHover="active"
      animate="default"
      initial="default"
    >
      <Popover
        trigger={PopoverTrigger.Hover}
        placement={PopoverPlacement.Bottom}
        content={isMobile ? null : content}
        contentStyle={{
          zIndex: 100
        }}
      >
      {isMobile ? (
            <div className="flex items-center gap-1" onClick={handleConnect}>
              <AvatarDisplay hasAvatar={address && !!userInfo?.avatar} />
              <div className="w-[1px] h-[23px] bg-[#A6A6DB] bg-opacity-30 mx-[14px]"></div>
              <BalanceDisplay />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <BalanceDisplay />
              <AvatarDisplay hasAvatar={address && !!userInfo?.avatar} />
            </div>
          )}
      </Popover>
    </motion.div>
  );
};

const DisconnectButton = ({ setMobileUserInfoVisible, handlePlay }: any) => {
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    handlePlay()
    disconnect();
    setMobileUserInfoVisible(false);
  };

  return (
    <div
      className="cursor-pointer pl-[22px] pr-[26px] flex justify-between items-center click mt-[10px] pt-[10px] pb-[10px] transition-all duration-300 hover:opacity-50"
      data-click-sound
      onClick={handleDisconnect}
    >
      <div className="text-white font-Unbounded text-[12px] font-[400] leading-[1]">
        Disconnect
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.91613 16H10.5731C11.0656 16 11.4652 15.57 11.4652 15.04C11.4652 14.51 11.0656 14.08 10.5731 14.08H2.00906C1.92728 13.974 1.78417 13.662 1.78417 13.164V2.83802C1.78417 2.34002 1.92728 2.02802 2.00906 1.92002H10.5731C11.0656 1.92002 11.4652 1.49002 11.4652 0.960015C11.4652 0.430015 11.0656 1.52588e-05 10.5731 1.52588e-05H1.91613C0.823322 1.52588e-05 0 1.22002 0 2.83802V13.162C0 14.78 0.823322 16 1.91613 16ZM12.3929 12.2771L15.7266 8.69158L15.7383 8.67942C15.913 8.49137 16.0004 8.2458 16.0003 8.00024C16.0003 7.75469 15.913 7.50912 15.7383 7.32108L15.7237 7.30576L12.3948 3.72342C12.0454 3.34742 11.4823 3.34742 11.1329 3.72342C10.7835 4.09942 10.7835 4.70542 11.1329 5.08142L12.953 7.03908H6.83918C6.34667 7.03908 5.94709 7.46908 5.94709 7.99908C5.94709 8.52908 6.34667 8.95908 6.83918 8.95908H12.9542L11.1329 10.9191C10.7835 11.2951 10.7835 11.9011 11.1329 12.2771C11.3057 12.4651 11.5343 12.5591 11.7629 12.5591C11.9915 12.5591 12.2201 12.4651 12.3929 12.2771Z"
            fill="#836EF9"
          />
        </svg>
      </div>
    </div>
  );
};
