import React, { useCallback, useMemo, useRef, useState } from "react";
import Modal from "@/components/modal";
import { useNFT } from "@/hooks/use-nft";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import CircleLoading from "../circle-loading";
import { useAccount } from "wagmi";
import { useSwitchChain } from "wagmi";
import useBindTwitterHome from "@/sections/terminal/hooks/use-bind-twitter-home";
import { monadTestnet } from "viem/chains";
import { useTwitterStore } from "@/stores/twitter";
import { motion } from "framer-motion";
import domtoimage from "dom-to-image";
import { base64ToBlob, shareToX, uploadFile } from "@/utils/utils";
import TypingText from "../typing-text";
import clsx from "clsx";
import { sleep } from "@/sections/bridge/lib/util";
import useTokenBalance from "@/hooks/use-token-balance";
import { toast } from "react-toastify";
import { useNftStore } from "@/stores/nft";

const slides = [
  {
    img: "/images/nft/home/main-1.svg",
    title: "WELCOME ABOARDING NADSA",
    desc: `In the vast, uncharted Monad Galaxy, chaos reigned. DApps launched at light speed. Yield hubs blinked into existence. Degens floated untethered, with no map to guide them. Monad's hyperspeed finality was revolutionary – but explorers lacked direction.`,
    descTitle: "FROM THE FAR FAR AWAY..."
  },
  {
    img: "/images/nft/home/main-2.svg",
    title: "WELCOME ABOARDING NADSA",
    desc: `NADSA One is a command station in low-Monad orbit, curating the galaxy's top protocols into a single interface. Your mission control for navigating the Monadverse.`,
    descTitle:
      "ENTER NADSA \\_ \n NATIONAL AGENCY FOR DECENTRALISED SPACE APPS."
  },
  {
    img: "/images/nft/home/main-3.svg",
    title: "WELCOME ABOARDING NADSA",
    desc: `A purpose-built command center for seamless exploration of the Monad ecosystem. NADSA One brings together all the bluechip protocols across Monad – from DEXs and lending markets to bridges and beyond – all in one streamlined, in-app experience.`,
    descTitle: "WELCOME ONBOARD TO THE NADSA ONE STATION!"
  },
  {
    img: "/images/nft/home/main-4.svg",
    title: "WELCOME ABOARDING NADSA",
    desc: `Complete your onboarding by minting a unique Sequence Number—your proof of how early you arrived at NADSA. Limited mint window.`,
    descTitle: "Mint yourself a Sequence Number NFT \\_"
  }
];

export default function Aboarding({
  isOpen,
  isMint,
  closeModal,
  setVisitedIndex,
  getVisitedIndex,
  className
}: {
  isOpen: boolean;
  isMint: boolean;
  closeModal: () => void;
  getVisitedIndex: (account: string) => number;
  setVisitedIndex: (account: string, index: number) => void;
  className?: string;
}) {
  // const { nftMetadata, nftAddress, mintNFT, hasNFT, tokenIds, isLoading, address } = useNFT({ nftAddress: '0x378d216463a2245bf4b70a1730579e4da175dd0f' });
  const { nftMetadata, nftAddress, mintNFT, hasNFT, tokenIds, isLoading } =
    useNFT({
      // nftAddress: "0xbe0a1db63a34aa64f24decaf3f34e71fcb3c323a"
      // nftAddress: "0x8645f70452fd8bbefa9606aebd2ce03ea0c4e330"
      nftAddress: '0x0d83faa6fdb847c445b350078b030de3bb08cc49'
    });
  const { address } = useAccount();
  const twitterStore: any = useTwitterStore();
  const nftCardRef = useRef<HTMLDivElement>(null);
  const { loading: binding, buttonText } = useBindTwitterHome();
  const [isSharing, setIsSharing] = useState(false);
  const closeNFTModal = useNftStore((store: any) => store.closeNFTModal);
  const setNftStore = useNftStore((store: any) => store.set);
  const index = address ? getVisitedIndex(address) : 0;
  const { tokenBalance, isLoading: isTokenBalanceLoading } = useTokenBalance(
    "native",
    18,
    monadTestnet.id
  );

  const handlePrev = () => {
    if (!address) return;
    const _i = getVisitedIndex(address);
    const i = _i > 0 ? _i - 1 : _i;
    setVisitedIndex(address, i);
  };

  const handleNext = () => {
    if (!address) return;
    const _i = getVisitedIndex(address);
    const i = _i < slides.length - 1 ? _i + 1 : _i;
    setVisitedIndex(address, i);
  };

  const handleStart = () => {
    closeModal();
    setNftStore({ closeNFTModal: true });
  };

  const { img, title, desc, descTitle } = useMemo(
    () => slides[index] || {},
    [index]
  );
  
  const isLast = useMemo(
    () => isMint || index === slides.length - 1,
    [index, isMint]
  );

  const handleTwitterShare = useCallback(async () => {
    try {
      const node = nftCardRef.current;
      if (node) {
        setIsSharing(true);
        await sleep(1000);
        const dataUrl = await domtoimage.toPng(node);
        const [blob, type] = base64ToBlob(dataUrl);
        const url = await uploadFile(blob, "/upload");
        const tweetUrl = `https://test.nadsa.space/api/twitter?img=${encodeURIComponent(
          url
        )}`;
        const tweetText = `> mint --sequence NFT %0A

> sequence number minted %0A

> onboarding complete to One // nadsa.space %0A

>> welcome to @0xNADSA %0A%0A


"In the beginning, there were only a few. The Monadverse is vast, but I was here first.”`;

        shareToX(tweetText, tweetUrl);
        setIsSharing(false);
      }
    } catch (error) {
      console.error("Twitter failed:", error);
    }
  }, [nftCardRef.current]);

  if (closeNFTModal && !isMint) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      isMaskClose={false}
      onClose={() => {
        setNftStore({ closeNFTModal: true });
        closeModal();
      }}
      className={className}
      closeIconClassName="top-[60px] right-[30px]"
      closeIcon={
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.33301 4.5L11.333 0H14L8.66602 6L14 12H11.333L7.33301 7.49902L3.33301 12H0.666992L6 6L0.666992 0H3.33301L7.33301 4.5Z"
            fill="#A6A6DB"
          />
        </svg>
      }
    >
      <div className="relative w-[714px] h-[721px]">
        <div className="absolute left-0 top-0 w-full h-full">
          <img
            src="/images/nft/home/bg.png"
            alt="main-1"
            className="w-full h-full"
          />
        </div>
        <div className="w-full h-full relative">
          {!isLast && (
            <div>
              <div className="w-full text-center pt-[70px] text-[24px] text-[#E7E2FF] uppercase font-HackerNoonV2 drop-shadow-[0px_0px_10px_#836EF9]">
                {title}
              </div>

              <div className="flex-1 flex items-center justify-center w-full mt-[30px]">
                <img
                  src={img}
                  alt={`main-${index + 1}`}
                  className="object-contain max-h-[340px] max-w-[90%] mx-auto"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              <div className="w-full px-8 mt-[30px]">
                <div className="text-[#00FF00] text-[18px] whitespace-pre-wrap font-HackerNoonV2 drop-shadow-[0px_0px_10px_#00FF0080]">
                  {descTitle}
                </div>
                <div className="text-[#00FF00] text-[16px] mt-[10px] font-Pixelmix">
                  <TypingText text={desc} />
                </div>
              </div>
            </div>
          )}

          {isLast && (
            <div className="pt-[100px]">
              <div className="mx-[50px]">
                <div
                  className="flex-1 flex items-center justify-center relative"
                  ref={nftCardRef}
                >
                  {
                    !isSharing && <div className="absolute top-0 left-0 w-full h-full">
                      <img
                        src="/images/nft/home/nft-bg.png"
                        alt="main-1"
                        className="w-full h-full"
                      />
                    </div>
                  }

                  {
                    !isSharing && <div className="w-full h-full flex relative justify-between">
                      <div className="py-[10px]">
                        <motion.div
                          key={hasNFT ? "minted" : "unminted"}
                          initial={{ rotateY: 0 }}
                          animate={{ rotateY: hasNFT ? 180 : 0 }}
                          transition={{ duration: 1.6 }}
                          className="relative w-[280px] h-[340px]"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div
                            className="absolute w-full h-full"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(0deg)"
                            }}
                          >
                            <img
                              src="/images/nft/home/un-mint.svg"
                              alt="nft-card"
                              className="w-full h-full object-contain"
                              style={{ imageRendering: "pixelated" }}
                            />
                          </div>

                          {hasNFT && (
                            <div
                              className="absolute w-full h-full"
                              style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)"
                              }}
                            >
                              <img
                                src="/images/nft/home/0.png"
                                alt="nft-card"
                                className="w-full h-full object-contain"
                                style={{ imageRendering: "pixelated" }}
                              />
                              <div className="absolute font-HackerNoonV2 top-[84px] left-0 w-full h-[24px] text-[#000] text-[18px] flex items-center justify-center">
                                NO.{tokenIds[0]}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </div>

                      <div className="flex-1 flex justify-center ">
                        {!isSharing && (
                          <div className="pt-[40px]">
                            <div className="text-[#E7E2FF] text-center text-[18px] font-HackerNoonV2 drop-shadow-[0px_0px_10px_#836EF9]">
                              SEQUENCE NUMBER NFT
                            </div>


                            {!hasNFT && (<>
                              <div className="font-Pixelmix text-[12px] py-[10px] rounded-[4px] flex gap-[10px] justify-center items-end mt-[10px]">
                                <div className="text-center">
                                  <div className="text-[#8D7CFF] text-[12px]">
                                    Total Minted
                                  </div>
                                  <div className="text-[#00FF00] text-[20px] mt-[5px]">
                                    {nftMetadata?.totalSupply}
                                  </div>
                                </div>
                              </div>

                              <div className="text-[#836EF9] text-center text-[12px] font-Pixelmix mt-[20px]">Get Yours</div>
                              <div className="mt-6 space-y-3">
                                {!twitterStore?.bindInfo[twitterStore.id] ||
                                  buttonText ? (
                                  <button
                                    onClick={() => {
                                      if (buttonText === "Connect X to access") {
                                        window.open(
                                          `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=ZzZNZEw5UWdyQWRNMlU5UHRlRVE6MTpjaQ&redirect_uri=${window.location.origin}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`,
                                          "_blank"
                                        );
                                        return;
                                      }
                                      if (buttonText) return;
                                      window.open(
                                        "https://twitter.com/intent/follow?screen_name=0xNADSA",
                                        "_blank"
                                      );
                                      setTimeout(() => {
                                        twitterStore.set({
                                          bindInfo: {
                                            ...twitterStore.bindInfo,
                                            [twitterStore.id]: true
                                          }
                                        });
                                      }, 3000);
                                    }}
                                    className="w-full bg-[#00FF00] h-[44px] text-black flex items-center justify-center rounded font-Pixelmix text-[12px] shadow-[0px_0px_10px_0px_#03E212]"
                                  >
                                    {buttonText || "Follow @0xNADSA on X"}
                                  </button>
                                ) : (
                                  <div className="w-full relative  h-[44px] text-[#836EF9] flex items-center justify-between font-Pixelmix text-[12px] border border-[#836EF9] rounded-[4px] px-[15px]">
                                    <div className="text-[#836EF9]">
                                      Followed 0xNADSA
                                    </div>
                                    <div className="text-[#836EF9]">
                                      <RightArrow />
                                    </div>
                                  </div>
                                )}

                                <MainBtn
                                  onClick={() => mintNFT()}
                                  tokenBalance={tokenBalance}
                                  disabled={
                                    isLoading ||
                                    !!buttonText ||
                                    !twitterStore?.bindInfo[twitterStore.id]
                                  }
                                >
                                  {isLoading ? (
                                    <>
                                      <CircleLoading />{" "}
                                      <span className="ml-[10px]">Mint NFT</span>
                                    </>
                                  ) : (
                                    "Mint NFT"
                                  )}
                                </MainBtn>
                              </div>
                            </>)}

                            {hasNFT && (<>
                              <div className="flex items-center justify-center flex-col">
                                <div className="w-[68px] h-[68px] rounded-full overflow-hidden bg-[#1A1A1A80] border-[1px] border-[#E7E2FF80] flex items-center justify-center mt-[20px] drop-shadow-[0px_0px_10px_#E7E2FF80]">
                                  <img
                                    src={
                                      twitterStore.info.avatar ||
                                      "/images/nft/home/twitter-default-pfp.png"
                                    }
                                    alt="logo"
                                    className="w-[68px] h-[68px]"
                                  />
                                </div>
                                <div className="text-[#000] relative z-10 w-[124px] h-[24px] text-[18px] font-HackerNoonV2 text-center mt-[-10px] bg-[url('/images/nft/home/no-bg.png')] bg-cover bg-center">
                                  NO.{tokenIds[0]}
                                </div>
                              </div>

                              <div className="mt-6">
                                <div className="text-[#00FF00] text-[14px] font-Pixelmix flex justify-center">
                                  <svg
                                    width="25"
                                    height="19"
                                    viewBox="0 0 25 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2 8.58824L9.26923 16L23 2"
                                      stroke="#03E212"
                                      stroke-width="4"
                                    />
                                  </svg>
                                </div>
                                <div className="text-[#00FF00] text-[14px] font-Pixelmix  text-center mt-[10px]">
                                  @{twitterStore.info.name}
                                </div>
                                <div className="text-[#00FF00] text-[14px] font-Pixelmix text-center ">
                                  Minted NFT Successfully
                                </div>
                                <button
                                  onClick={handleTwitterShare}
                                  className="w-[200px] mt-[10px] mx-auto bg-[#00FF00] h-[44px] text-black flex items-center justify-center rounded font-Pixelmix text-[12px] shadow-[0px_0px_10px_0px_#03E212]"
                                >
                                  Share on X
                                </button>
                              </div>
                            </>)}
                          </div>
                        )}
                      </div>
                    </div>
                  }

                  {
                    isSharing && <div className="w-[563px] h-[292px] flex relative justify-between overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full">
                        <img
                          src="/images/nft/home/share-bg.png"
                          alt="main-1"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="relative flex-1 flex items-center justify-between">
                        <div className="">
                          <div className="w-[270px] h-[292px] overflow-hidden relative">
                            <img
                              src="/images/nft/home/share-nft.png"
                              className="h-[292px] absolute top-0 left-0 w-[315px] max-w-none"
                            />
                            <div className="absolute font-HackerNoonV2 top-[90px] left-[-22px] w-full h-[24px] text-[#000] text-[18px] flex items-center justify-center" style={{ transform: "rotate(-16deg)" }}>
                              NO.{tokenIds[0]}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-between translate-x-[-30px] h-full mt-[-5px]">
                          <div className="flex items-center justify-center">
                            <img
                              src="/images/nft/home/share-nadsa.png"
                              alt="nft-bg"
                              className="h-[50px]"
                            />
                          </div>

                          <div className="text-[#E7E2FF] text-[18px] text-center font-HackerNoonV2 drop-shadow-[0px_0px_10px_#E7E2FF80] mt-[20px]">
                            Sequence Number NFT
                          </div>

                          <div className="w-[68px] h-[68px] rounded-full overflow-hidden bg-[#1A1A1A80] border-[1px] border-[#E7E2FF80] flex items-center justify-center mt-[20px] drop-shadow-[0px_0px_10px_#E7E2FF80]">
                            <img
                              src={
                                twitterStore.info.avatar ||
                                "/images/nft/home/twitter-default-pfp.png"
                              }
                              alt="logo"
                              className="w-[68px] h-[68px]"
                            />
                          </div>
                          <div className="text-[#E7E2FF] text-[16px] font-Pixelmix drop-shadow-[0px_0px_10px_#E7E2FF80] mt-[10px]">
                            @{twitterStore.info.name}
                          </div>
                          <div className="text-[#E7E2FF] text-[16px] font-Pixelmix drop-shadow-[0px_0px_10px_#E7E2FF80]">
                            NO.{tokenIds[0]}
                          </div>
                          <div className="text-[#03E212] mt-[10px] text-[10px] border border-[#03E212] rounded-[4px] px-[15px] py-[5px] font-Pixelmix">
                            nadsa.space
                          </div>
                        </div>
                      </div>

                    </div>
                  }

                </div>

                <div className="w-full px-8 mt-[30px]">
                  <div className="text-[#00FF00] text-[18px] whitespace-pre-wrap font-HackerNoonV2 drop-shadow-[0px_0px_10px_#00FF00]">
                    {descTitle}
                  </div>
                  <div className="text-[#00FF00] text-[14px] mt-[10px] font-Pixelmix">
                    <TypingText text={desc} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isMint && (
            <div className="absolute bottom-6 right-8 flex gap-4 font-Pixelmix">
              <button
                onClick={handlePrev}
                disabled={index === 0}
                className={`px-6 py-2 rounded bg-transparent text-[#00FF00] text-[14px] transition-all duration-150 hover:underline hover:drop-shadow-[0px_0px_10px_#00FF00] ${index === 0 ? "hidden " : " cursor-pointer"
                  }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={index === slides.length - 1}
                className={`px-6 py-2 rounded bg-transparent text-[#00FF00] text-[14px]  transition-all duration-150 hover:underline hover:drop-shadow-[0px_0px_10px_#00FF00] ${index === slides.length - 1 ? "hidden " : " cursor-pointer"
                  }`}
              >
                Next
              </button>
              <button
                onClick={handleStart}
                className={`px-6 py-2 rounded bg-transparent text-[#00FF00] text-[14px]  transition-all duration-150 hover:underline hover:drop-shadow-[0px_0px_10px_#00FF00] ${index !== slides.length - 1 ? "hidden " : " cursor-pointer"
                  }`}
              >
                Start
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

const mainBtnCls =
  "w-full flex items-center justify-center bg-[#00FF00] h-[44px] text-black py-2 px-4 rounded font-Pixelmix text-[12px] shadow-[0px_0px_10px_0px_#03E212]";
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
      <button onClick={() => openConnectModal?.()} className={mainBtnCls}>
        Connect
      </button>
    );
  }

  if (chainId !== monadTestnet.id) {
    return (
      <button
        onClick={() => switchChain({ chainId: monadTestnet.id })}
        className={mainBtnCls}
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

        if (Number(tokenBalance) <= 0.3) {
          toast.error('Insufficient balance');
          return;
        }

        onClick();
      }}
      disabled={disabled}
      className={mainBtnCls + " disabled:opacity-50"}
    >
      {children}
    </button>
  );
};

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
