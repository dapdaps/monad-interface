import { useNFT } from "@/hooks/use-nft";
import CircleLoading from "../circle-loading";
import { useMemo, useState } from "react";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import { useSwitchChain } from "wagmi";
import { monadTestnet } from "viem/chains";
import useBindTwitterAccount from "@/sections/terminal/hooks/use-bind-twitter-account";
import { motion } from "framer-motion";
import { useTwitterStore } from "@/stores/twitter";
import clsx from "clsx";
import useTokenBalance from "@/hooks/use-token-balance";
import { toast } from "react-toastify";
import Big from "big.js";
import useXFollow, { IS_REAL_FOLLOW } from "./use-x-follow";
import { shareToX } from "@/utils/utils";
import TimeLocked from "../time-locked";

const XWrqapper: any = IS_REAL_FOLLOW ? TimeLocked : ({ children }: any) => children
const IS_TEST = process.env.NEXT_PUBLIC_API?.includes('test')
export default function NadsaPassCard({ onLoginOut, className }: any) {
  const {
    nftMetadata,
    nftAddress,
    mintNFT,
    hasNFT,
    tokenIds,
    isLoading,
    address,
    checkAllowlistLoading
  } = useNFT({
    // nftAddress: "0x378d216463a2245bf4b70a1730579e4da175dd0f" 
    nftAddress: process.env.NEXT_PUBLIC_CHART_NFT || "0x2d298c1f3a52af45ab3d34637aa293cf8a988c71"
  });
  const { openConnectModal } = useConnectModal();
  const { tokenBalance, isLoading: isTokenBalanceLoading } = useTokenBalance(
    "native",
    18,
    monadTestnet.id
  );
  const twitterStore: any = useTwitterStore();
  const {
    buttonText,
    loading: isBindTwitterAccountLoading,
    handleBind
  } = useBindTwitterAccount({ withAuth: false });

  const { isFollow, isLoadingFollow, checkFollowX, setFollowX } = useXFollow();

  const status = useMemo(() => {
    if (!address || isLoadingFollow || !isFollow) {
      return 0;
    }

    if (hasNFT) {
      return 1;
    }

    if (
      nftMetadata?.totalSupply &&
      nftMetadata?.maxSupply &&
      Number(nftMetadata?.maxSupply) > 0 &&
      Number(nftMetadata?.totalSupply) === Number(nftMetadata?.maxSupply)
    ) {
      return 2;
    }

    return 0;
  }, [hasNFT, nftMetadata, address, isFollow, isLoadingFollow]);

  return (
    <div onClick={(e) => e.stopPropagation()} className={clsx("w-[308px] p-4 relative", className)}>
      <div className="absolute top-0 left-0 w-full h-full">
        <img src="/images/nft/bg.png" alt="bg" className="w-full h-full" />
      </div>
      <div className="relative pt-[65px] z-10 px-[10px]">
        <div className="absolute top-[0px] left-[38px] ">
          <img
            src="/images/nft/data-override.gif"
            className="w-[50px]"
          />
        </div>

        <div className="text-[#00FF11] text-[22px] font-HackerNoonV2 text-center  drop-shadow-[0px_0px_10px_#BFFF6099]">
          DATA OVERRIDE
        </div>

        <div className="mt-[15px] relative">
          <img
            src="/images/nft/token.png"
            alt="nadsa"
            className="w-[252px] h-[162px] mx-auto"
            style={{
              opacity: status > 0 ? 0.3 : 1
            }}
          />
          {status === 1 && (
            <div className="absolute top-0 left-0 w-full h-full">
              <img
                src="/images/nft/mint-successfully.svg"
                alt="nadsa"
                className="w-full"
              />
            </div>
          )}
          {status === 2 && (
            <div className="absolute top-0 left-0 w-full h-full">
              <img
                src="/images/nft/mint-out.svg"
                alt="nadsa"
                className="w-full"
              />
            </div>
          )}
        </div>

        <div className="mt-[20px] bg-[#212041] rounded-[6px] p-[10px] font-Pixelmix text-[12px]">
          <div className="text-[#8D7CFF] text-[16px]">
            NADSA_ADMISSION_TICKET
          </div>
          <div className="flex justify-between mt-[10px]">
            <div className="text-[#8D7CFF]">Type:</div>
            <div className={status === 2 ? "text-[#8D7CFF]" : "text-[#00FF11]"}>
              Non Fungible Token
            </div>
          </div>
          <div className="flex justify-between mt-[5px]">
            <div className="text-[#8D7CFF]">Editions minted:</div>
            <div className={status === 2 ? "text-[#8D7CFF]" : "text-[#00FF11]"}>
              {nftMetadata?.totalSupply} / {nftMetadata?.maxSupply}
            </div>
          </div>
          <div className="flex justify-between mt-[5px]">
            <div className="text-[#8D7CFF]">Mint cost:</div>
            <div className={status === 2 ? "text-[#8D7CFF]" : "text-[#00FF11]"}>
              1 MON
            </div>
          </div>
        </div>

        {status !== 2 && (
          <>
            {!buttonText ? (
              <div className="flex items-center justify-between mt-[10px] text-[12px] h-[40px] px-[10px] bg-[#212041] rounded-[2px] font-Pixelmix">
                <div className="text-[#FFFFFF]">
                  {address?.slice(0, 5)}...{address?.slice(-5)}
                </div>
                <div className="text-[#00FF00]">
                  <RightArrow />
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (buttonText === "Please switch X") {
                    onLoginOut?.();
                    return;
                  }
                  if (address && buttonText.includes("Bind X to")) {
                    handleBind();
                    return;
                  }
                  if (!address) openConnectModal?.();
                }}
                className="flex items-center justify-center mt-[10px] text-[12px] text-[#FFFFFF] w-full h-[40px] px-[10px] bg-[#7663F4] rounded-[2px] font-Pixelmix"
              >
                {buttonText}
              </button>
            )}

            <>
              {!isFollow || buttonText ? (
                <button
                  onClick={() => {
                    if (buttonText) return;
                    window.open(
                      "https://twitter.com/intent/follow?screen_name=0xNADSA",
                      "_blank"
                    );
                    setFollowX()
                  }}
                  className={clsx(
                    "flex relative items-center justify-center mt-[10px] text-[12px] w-full h-[40px] px-[10px] bg-[#7663F4] rounded-[2px] font-Pixelmix",
                    buttonText && "opacity-30 !cursor-not-allowed"
                  )}
                >
                  <div className="text-[#FFFFFF]">Follow 0xNADSA on X</div>
                  {
                    !buttonText && <div
                      className="absolute right-[10px] top-[50%] translate-y-[-50%]"
                      onClick={(e) => {
                        e.stopPropagation();

                      }}
                    >
                      <XWrqapper className="text-white">
                        <div className="" onClick={(e) => {
                          checkFollowX()
                      }}>
                        <div
                            className={`loader-arrow ${isLoadingFollow ? 'animate' : 'animate-none'}`}
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.200195 7.79231C0.200195 4.35144 3.12325 1.58462 6.7002 1.58462C7.69535 1.58462 8.63844 1.79947 9.48249 2.18189L9.01418 0.490781L10.9102 0L12.4169 5.43795L6.95411 6.85242L6.44628 5.02009L9.32319 4.27466C8.58308 3.77546 7.67892 3.48061 6.7002 3.48061C4.18094 3.48061 2.16205 5.42385 2.16205 7.79231C2.16228 10.1606 4.18108 12.1029 6.7002 12.1029C9.21931 12.1029 11.2381 10.1606 11.2383 7.79231H13.2002C13.2 11.233 10.277 14 6.7002 14C3.12339 14 0.200421 11.233 0.200195 7.79231Z" fill="#fff" />
                            </svg>
                          </div>
                      </div>
                      </XWrqapper>
                    </div>
                  }
                </button>
              ) : (
                <div className="flex items-center justify-between mt-[10px] text-[12px] h-[40px] px-[10px] bg-[#212041] rounded-[2px] font-Pixelmix">
                  <div className="text-[#FFFFFF]">Followed 0xNADSA</div>
                  <div className="text-[#00FF00]">
                    <RightArrow />
                  </div>
                </div>
              )}
            </>
          </>
        )}

        {status === 1 && (<div>
          <div className="flex items-center justify-center gap-[10px] text-[12px] h-[40px] mt-[10px] mb-[10px] text-[#00FF11] font-Pixelmix">
            <RightArrow /> Mint Successfully
          </div>
          <MainBtn
            disabled={false}
            onClick={() => {
              const tweetUrl = `https://${IS_TEST ? 'test.' : ''}nadsa.space/api/twitter?img=${encodeURIComponent(
                'https://gateway.pinata.cloud/ipfs/bafkreib7px3v7yrhapt5x6ivnz2mk74k32gnr47qjghyhbvic73r57w4fe'
              )}`;
              shareToX(`NADSA_ADMISSION_TICKET logged. %0A

Something’s brewing at @0xNADSA — I’m already in. %0A

See you on the inside. %0A`, tweetUrl)
            }}
            tokenBalance={tokenBalance}
          >
            Share on X
          </MainBtn>
        </div>
        )}
        {status === 0 && (
          <MainBtn
            disabled={!!buttonText || isLoadingFollow || !isFollow || checkAllowlistLoading}
            onClick={() => mintNFT()}
            tokenBalance={tokenBalance}
          >
            {isLoading || checkAllowlistLoading ? (
              <>
                <CircleLoading /> <span className="ml-[10px]">Mint NFT</span>
              </>
            ) : (
              "Mint NFT"
            )}
          </MainBtn>
        )}
        {status === 2 && (
          <div className="flex opacity-30 w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix">
            MINTED OUT
          </div>
        )}
      </div>
    </div>
  );
}

const RightArrow = () => {
  return (
    <svg
      width="17"
      height="12"
      viewBox="0 0 17 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 4.5L6.5 10L15.5 1" stroke="#00FF11" stroke-width="2" />
    </svg>
  );
};

const MainBtn = ({
  onClick,
  children,
  disabled,
  tokenBalance
}: {
  onClick: any;
  children: any;
  disabled: boolean;
  tokenBalance: string;
}) => {
  const { switchChain, isPending: switching } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!address) {
    return (
      <button
        onClick={() => openConnectModal?.()}
        className={clsx(
          "flex w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix opacity-30",
          "!cursor-not-allowed"
        )}
      >
        Mint NFT
      </button>
    );
  }

  if (chainId !== monadTestnet.id) {
    return (
      <button
        onClick={() => switchChain({ chainId: monadTestnet.id })}
        className="flex w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix"
      >
        Switch to Monad
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        if (disabled) {
          return;
        }


        if (Number(tokenBalance) <= 1.3) {
          toast.error('Insufficient balance');
          return;
        }

        onClick();
      }}
      disabled={disabled}
      className="flex w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix disabled:opacity-30 disabled:!cursor-not-allowed"
    >
      {children}
    </button>
  );
};
const ArrowIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2 A6 6 0 1 1 8.52 13.95"
        stroke="#00FF11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 3 L13 1 L15 3"
        stroke="#00FF11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 1 L13 5"
        stroke="#00FF11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EllipsisLoading = (props: any) => {
  const { size = 18, style, className } = props;

  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{
        width: size,
        height: size,
        ...style
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: 1
        }}
      >
        <circle
          opacity="0.2"
          cx="9"
          cy="9"
          r="8"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1"
          stroke="#00FF11"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
};
