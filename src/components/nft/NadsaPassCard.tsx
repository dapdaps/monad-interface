import { useNFT } from "@/hooks/use-nft";
import CircleLoading from "../circle-loading";
import { useMemo, useState } from "react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { useSwitchChain } from "wagmi";
import { monadTestnet } from "@reown/appkit/networks";
import useBindTwitterAccount from "@/sections/terminal/hooks/use-bind-twitter-account";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/user";
import clsx from "clsx";

export default function NadsaPassCard({ onLoginOut }: any) {
  const {
    nftMetadata,
    nftAddress,
    mintNFT,
    hasNFT,
    tokenIds,
    isLoading,
    address
  } = useNFT({ nftAddress: "0x378d216463a2245bf4b70a1730579e4da175dd0f" });
  const { open } = useAppKit();
  const setUserInfo = useUserStore((store: any) => store.set);
  const isFollowedTwitter = useUserStore(
    (store: any) => store.isFollowedTwitter
  );
  const { buttonText, loading: isBindTwitterAccountLoading } =
    useBindTwitterAccount({ withAuth: false });

  const status = useMemo(() => {
    if (!address) {
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
  }, [hasNFT, nftMetadata, address]);

  return (
    <div className="w-[308px] p-4 relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <img src="/images/nft/bg.png" alt="bg" className="w-full h-full" />
      </div>
      <div className="relative pt-[65px] z-10 px-[10px]">
        <div className="absolute top-[0px] left-[38px] ">
          <img
            src="/images/nft/title.svg"
            alt="bg"
            className="w-[50px] h-[50px]"
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
                  open();
                }}
                className="flex items-center justify-center mt-[10px] text-[12px] text-[#FFFFFF] w-full h-[40px] px-[10px] bg-[#7663F4] rounded-[2px] font-Pixelmix"
              >
                {buttonText}
              </button>
            )}

            <>
              {!isFollowedTwitter || buttonText ? (
                <button
                  onClick={() => {
                    window.open(
                      "https://twitter.com/intent/follow?screen_name=0xNADSA",
                      "_blank"
                    );
                    setTimeout(() => {
                      setUserInfo({ isFollowedTwitter: true });
                    }, 3000);
                  }}
                  className={clsx(
                    "flex relative items-center justify-center mt-[10px] text-[12px] w-full h-[40px] px-[10px] bg-[#7663F4] rounded-[2px] font-Pixelmix",
                    buttonText && "opacity-30"
                  )}
                >
                  <div className="text-[#FFFFFF]">Follow 0xNADSA on X</div>
                  <div
                    className="absolute right-[10px] top-[10px]"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {isBindTwitterAccountLoading && <EllipsisLoading />}
                  </div>
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

        {status === 1 && (
          <div className="flex items-center justify-center gap-[10px] text-[12px] h-[40px] mt-[10px] mb-[10px] text-[#00FF11] font-Pixelmix">
            <RightArrow /> Mint Successfully
          </div>
        )}
        {status === 0 && (
          <MainBtn
            disabled={!!buttonText || !isFollowedTwitter}
            onClick={() => mintNFT()}
          >
            {isLoading ? (
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
  disabled
}: {
  onClick: any;
  children: any;
  disabled: boolean;
}) => {
  const { switchChain, isPending: switching } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { open } = useAppKit();

  if (!address) {
    return (
      <button
        onClick={() => open()}
        className={clsx(
          "flex w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix opacity-30"
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

        onClick();
      }}
      disabled={disabled}
      className="flex w-full items-center justify-center text-[12px] h-[40px] mt-[10px] mb-[10px] bg-[#7663F4] text-[#fff] rounded-[2px] font-Pixelmix disabled:opacity-30"
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
