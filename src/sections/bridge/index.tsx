"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import chains from "./lib/util/chainConfig";
import Card from "./Card";
import TokenAmout from "./TokenAmount";
import Routes from "./Routes";
import SubmitBtn from "./SubmitBtn";
import Confirm from "./Confrim";

import PageBack from "@/components/back";
import useIsMobile from "@/hooks/use-isMobile";
// import MenuButton from '@/components/mobile/menuButton';
import { useParams, useSearchParams } from "next/navigation";
import History from "./History";
import { useAccount, useSwitchChain } from "wagmi";
import { formatLongText } from "@/utils/utils";
import __allTokens from "./lib/allTokens";
import useBridge from "./Hooks/useBridge";

import type { Token, Chain } from "@/types";
import { motion } from "framer-motion";
// import { tokenPairs } from "./lib/bridges/orbiter/config";
import useBridgeType from "./Hooks/useBridgeType";
import useClickTracking from "@/hooks/use-click-tracking";
import useChainAndTokenPair from "./Hooks/useChaninAndTokenPair";
import { engineType } from "./lib/type";

const DappHeader: React.FC = () => {
  const params = useSearchParams();
  const dappName = params.get("dapp");
  const isMobile = useIsMobile();
  const { bridgeType } = useBridgeType();

  if (dappName) {
    return (
      <div className="text-xl bridge-title text-white flex justify-center items-center font-medium mx-auto text-center h-[42px] w-[227px]">
        <img
          src={bridgeType.icon}
          alt={bridgeType.name}
          className="w-[30px] mr-2"
        />
        <span className=" text-xl text-white">{bridgeType.name}</span>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <div className="relative left-[25%] mt-7 top-5">
          Bridge
          {/* <MenuButton className="w-[51.282vw]">Bridge</MenuButton> */}
        </div>
      ) : (
        <div className="text-[22px] bridge-title text-white flex justify-center items-center font-medium mx-auto text-center h-[42px] w-[227px]">
          Bridge
        </div>
      )}
    </>
  );
};

const ComingSoon = false;
const _chainList = Object.values(chains).filter((chain) =>
  [1, 143, 56, 10, 43114, 5000, 8453, 42161, 59144].includes(chain.chainId)
);

export default function Bridge() {
  const { handleReport } = useClickTracking();
  const [confirmShow, setConfirmShow] = useState(false);
  const [historyShow, setHistoryShow] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const isMobile = useIsMobile();
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const [limitBera, setLimitBera] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const [targetX, setTargetX] = useState("0px");
  const [targetY, setTargetY] = useState("0px");
  const params = useSearchParams();
  const dapp = params.get("dapp");
  
  const { chains: pairChains, tokenPairs: tokenPairs, destDisabled } = useChainAndTokenPair({ bridgeType: dapp ||'all' });


  const {
    fromChain,
    setFromChain,
    toChain,
    setToChain,
    fromToken,
    setFromToken,
    toToken,
    setToToken,
    sendAmount,
    onSendAmountChange,
    setSelectedRoute,
    updateBanlance,
    reciveAmount,
    identification,
    routeSortType,
    sendDisabled,
    disableText,
    sendLoading,
    quoteLoading,
    selectedRoute,
    routes,
    executeRoute,
    getStatus
  } = useBridge({
    originFromChain: chains[56],
    originToChain: chains[143],
    derection: 1,
    account: address,
    defaultBridgeText: "Bridge",
    engine: dapp ? [dapp as engineType] : null
  });

  const usedChainList = useMemo(() => {
    if (!pairChains || pairChains.length === 0) {
      return _chainList;
    }
    return _chainList.filter((chain) => pairChains.includes(chain.chainId.toString()));
  }, [pairChains]);

  const useTokenList = useMemo(() => {
    if (!tokenPairs || Object.keys(tokenPairs).length === 0) {
      return __allTokens;
    }
    const newTokenList: any = {};
    Object.keys(__allTokens).map((key: any) => {
      newTokenList[key] = __allTokens[key].filter((token: Token) => {
        if (tokenPairs[key]) {
          return tokenPairs[key][token.symbol.toUpperCase()];
        } else {
          return false;
        }
      });
    });
    return newTokenList;
  }, [tokenPairs]);

  const _allTokens = useMemo(() => {
    if (!fromToken) {
      return useTokenList;
    }

    if (!tokenPairs || Object.keys(tokenPairs).length === 0) {
      return useTokenList;
    }

    const newAllTokens: any = {};
    Object.keys(useTokenList).map((key: any) => {
      newAllTokens[key] = useTokenList[key].filter((token: Token) => {
        let symbol = token.symbol.toUpperCase();
        return tokenPairs[fromChain.chainId][fromToken.symbol.toUpperCase()] === symbol;
      });
    });

    return newAllTokens;
  }, [fromToken, fromChain, useTokenList]); 

  useEffect(() => {
    if (!fromToken) {
      setToToken(undefined);
      return;
    }

    if (!tokenPairs || Object.keys(tokenPairs).length === 0) {
      return;
    }
    
    const tokenPair = tokenPairs[fromChain.chainId][fromToken?.symbol.toUpperCase()];
    if (tokenPair && useTokenList[toChain.chainId]) {
      const token = useTokenList[toChain.chainId].find(
        (token: Token) => token.symbol.toUpperCase() === tokenPair
      ) as Token;
      if (tokenPairs[toChain.chainId][tokenPair]) {
        setToToken(token);
      } else {
        setToToken(undefined);
      }
    } else {
      setToToken(undefined);
    }
  }, [fromChain, fromToken, useTokenList]);

  useEffect(() => {
    if (!useTokenList[56] || !useTokenList[143]) {
      return;
    }
    const fromToken = useTokenList[56].find((token: Token) => token.symbol.toUpperCase() === 'USDC');
    const toToken = useTokenList[143].find((token: Token) => token.symbol.toUpperCase() === 'USDC');
    if (fromToken && toToken) {
      setFromToken(fromToken as Token);
      setToToken(toToken as Token);
    }
  }, [useTokenList]);

  useEffect(() => {
    setTimeout(() => {
      if (targetRef.current) {
        const target = targetRef.current;
        if (!target) return;
        const rect = target.getBoundingClientRect();

        const targetX = rect.left;
        const targetY = rect.top;

        setTargetX(targetX - window.innerWidth / 2 - 100 + "px");
        setTargetY(targetY - window.innerHeight + 60 + "px");
      }
    }, 2000);
  }, [targetRef]);

  return (
    <>
      <div
        style={{ backgroundSize: "100% auto" }}
        className='h-full overflow-hidden font-Oxanium relative pt-[110px] bg-[url("/images/bridge/full-bg.png")] bg-cover bg-[#0e0f28] bg-right-bottom bg-no-repeat'
      >
        {isMobile ? null : (
          <div className="absolute left-[36px] md:left-[15px] top-[31px] md:top-[14px] z-[12]" />
        )}
        <div
          style={{ backgroundSize: "100% auto" }}
          className="absolute bottom-0 right-0 w-full "
        >
          <img src="/images/bridge/bg-animate.gif" />
          <div
            ref={targetRef}
            className="w-[1px] h-[1px] absolute bottom-[93%] right-[11%]"
          ></div>
          <motion.div
            key={targetX}
            initial={{
              bottom: "0",
              left: "52%",
              scale: 2
            }}
            className='absolute w-[100px] h-[120px] bg-[url("/images/bridge/man.gif")] bg-cover bg-right-bottom bg-no-repeat'
            animate={{
              x: [0, targetX],
              y: [0, targetY],
              scale: [2, 0.01]
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              repeatDelay: 0,
              ease: "easeOut"
            }}
          />
        </div>

        <div className="lg:w-[520px] md:w-[92.307vw] m-auto relative z-10">
          <DappHeader />
          <Card className="mt-[-28px] pt-[80px]">
            {/* <Tab
              defaultActiveKey="1"
              onChange={(key) => {
                handleReport(key === "1" ? "1005-002" : "1005-001");
              }}
            >
              <TabItem tab="Token" tabKey="1">
                
              </TabItem>
              <TabItem
                tab={
                  <div className="text-[16px]">
                    NFT
                    <span className="text-[12px] text-[#A6A6DB] ml-2">
                      Soon
                    </span>
                  </div>
                }
                tabKey="2"
              >
                <Nft />
              </TabItem>
            </Tab> */}

            <div>
              <TokenAmout
                isDest={false}
                allTokens={useTokenList}
                limitBera={limitBera === 1}
                chain={fromChain}
                token={fromToken ?? null}
                amount={sendAmount}
                onAmountChange={(v: string) => {
                  onSendAmountChange(v);
                }}
                chainList={usedChainList}
                onChainChange={(chain: Chain) => {
                  setFromChain(chain);
                }}
                onTokenChange={(token: Token) => {
                  setFromToken(token);
                }}
                comingSoon={ComingSoon}
                balanceUpdate={updateBanlance}
              />
              <div
                className="h-[8px] md:h-4 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  const [_fromChain, _toChain] = [toChain, fromChain];
                  const [_fromToken, _toToken] = [toToken, fromToken];
                  setFromChain(_fromChain);
                  setToChain(_toChain);
                  setFromToken(_fromToken);
                  setToToken(_toToken);
                  setLimitBera(limitBera === 0 ? 1 : 0);
                }}
              >
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="36" height="36" rx="7" fill="#0E121F" stroke="#2C2A4B" stroke-width="2" />
                  <path d="M19.4999 14V24.5M19.4999 24.5L14 19M19.4999 24.5L25 19" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>

              </div>
              <TokenAmout
                allTokens={_allTokens}
                isDest={true}
                limitBera={limitBera === 0}
                amount={reciveAmount ?? ""}
                chainList={usedChainList}
                chain={toChain}
                token={toToken ?? null}
                disabledInput={true}
                destDisabled={destDisabled}
                onChainChange={(chain: Chain) => {
                  setToChain(chain);
                }}
                onTokenChange={(token: Token) => {
                  setToToken(token);
                }}
                comingSoon={ComingSoon}
                balanceUpdate={updateBanlance}
              />
              <div className="flex items-center justify-between pt-[17px] text-[12px] text-[#A6A6DB]">
                <div>Receive address</div>
                <div className="flex items-center gap-2 text-[#fff]">
                  <div>{formatLongText(address, 6, 6)}</div>
                </div>
              </div>

              {routes && routes.length > 0 && toToken && (
                <Routes
                  fromChain={fromChain}
                  selectedRoute={selectedRoute}
                  setSelectedRoute={setSelectedRoute}
                  toToken={toToken as Token}
                  routes={routes}
                />
              )}

              <SubmitBtn
                fromToken={fromToken}
                amount={sendAmount}
                fromChainId={fromChain.chainId}
                isLoading={quoteLoading || sendLoading}
                disabled={sendDisabled || !selectedRoute}
                selectedRoute={selectedRoute}
                onClick={async () => {
                  const isSuccess = await executeRoute();
                  if (isSuccess) {
                    setConfirmShow(true);
                  }
                }}
                comingSoon={ComingSoon}
              />
            </div>
          </Card>

          <Confirm
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken as Token}
            toToken={toToken as Token}
            amount={sendAmount}
            receiveAmount={reciveAmount ?? ""}
            show={confirmShow}
            onClose={() => {
              setConfirmShow(false);
            }}
            showHistory={() => {
              setHistoryShow(true);
              setActiveTab("pending");
            }}
          />
        </div>
        <History
          activeTab={activeTab}
          getStatus={getStatus}
          setActiveTab={setActiveTab}
          isOpen={historyShow}
          setIsOpen={setHistoryShow}
        />
      </div>
    </>
  );
}
