import { useEffect, useMemo, useState } from 'react';

import chains from './lib/util/chainConfig'
import Card from './Card';
import TokenAmout from './TokenAmount';
import Routes from './Routes';
import SubmitBtn from './SubmitBtn';
import Confirm from './Confrim';

import PageBack from '@/components/back';
import useIsMobile from '@/hooks/use-isMobile';
// import MenuButton from '@/components/mobile/menuButton';
import { useParams } from 'next/navigation';
import History from './History';
import Big from 'big.js';
import { useAccount, useSwitchChain } from "wagmi";
import { formatLongText } from '@/utils/utils';
import allTokens from './lib/allTokens';
import useBridge from './Hooks/useBridge';

import type { Token, Chain } from '@/types';
import { motion } from 'framer-motion';
import { tokenPairs } from './lib/bridges/orbiter/config';
const DappHeader: React.FC = () => {
  const { dapp: dappName } = useParams();
  const isMobile = useIsMobile();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  if (dappName) {
    return (
      <div className="text-xl bridge-title flex justify-center items-center font-medium mx-auto text-center h-[50px] w-[205px] bg-[#A6A6DB]">
        <img
          src={`/images/dapps/${(dappName as string).toLowerCase()}.svg`}
          alt={dappName as string}
          className="w-9 h-9"
        />
        <span className=" text-xl text-black">
          {capitalize(dappName as string)}
        </span>
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
        <div className="text-xl bridge-title flex justify-center items-center font-medium mx-auto text-center h-[50px] w-[205px] bg-[#A6A6DB]">
          Bridge
        </div>
      )}
    </>
  );
};

const ComingSoon = false;
const chainList = Object.values(chains).filter((chain) => [10143, 11155111].includes(chain.chainId));

export default function Bridge() {
  const [confirmShow, setConfirmShow] = useState(false);
  const [historyShow, setHistoryShow] = useState(false)
  const [activeTab, setActiveTab] = useState('pending')
  const isMobile = useIsMobile()
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount()
  const [limitBera, setLimitBera] = useState(0)



  // const inputValue = useDebounce(amount, { wait: 500 });

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
    getStatus,
  } = useBridge({
    originFromChain: chains[11155111],
    originToChain: chains[10143],
    derection: 1,
    account: address,
    defaultBridgeText: 'Bridge',
  })

  const _allTokens = useMemo(() => {
    if (!fromToken) {
      return allTokens
    }

    const newAllTokens: any = {}
    Object.keys(allTokens).map((key: any) => {
      newAllTokens[key] = allTokens[key].filter((token: Token) => {
        let symbol = token.symbol.toUpperCase()
        return tokenPairs[fromChain.chainId][fromToken.symbol.toUpperCase()] === symbol
      })
    });

    return allTokens;
  }, [fromToken, fromChain])

  useEffect(() => {
    if (!fromToken) {
      setToToken(undefined)
      return
    }
    const tokenPair = tokenPairs[fromChain.chainId][fromToken?.symbol.toUpperCase()]
    if (tokenPair) {
      const token = allTokens[toChain.chainId].find((token: Token) => token.symbol.toUpperCase() === tokenPair) as Token
      if (tokenPairs[toChain.chainId][tokenPair]) {
        setToToken(token)
      } else {
        setToToken(undefined)
      }
    } else {
      setToToken(undefined)
    }
  }, [fromChain, fromToken])

  useEffect(() => {
    setFromToken(allTokens[11155111][0])
    setToToken(allTokens[10143][1])
  }, [])

  return (
    <>
      <div style={{ backgroundSize: '100% auto' }} className='h-[100vh] relative mt-[-60px] overflow-auto pt-[110px] bg-[url("/images/bridge/full-bg.png")] bg-cover bg-right-bottom bg-no-repeat'>
        {isMobile ? null : <div className='absolute left-[36px] md:left-[15px] top-[31px] md:top-[14px] z-[12]' />}
        <div style={{ backgroundSize: '100% auto' }} className='absolute bottom-0 right-0 w-full'>
          <motion.div
            initial={{
              bottom: 0,
              right: '42%',
              scale: 1,
            }}
            className='absolute overflow-hidden w-[100px] h-[120px] bg-[url("/images/bridge/man.png")] bg-cover bg-right-bottom bg-no-repeat'
            animate={{
              bottom: ['0', '80%'],
              right: ['42%', '9.5%'],
              scale: [1, 0.01],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 0,
              ease: "easeOut"
            }}
          />
          <img src="/images/bridge/bg-animate.gif"  />
        </div>
        <div className='lg:w-[520px] md:w-[92.307vw] m-auto relative z-10'>
          <DappHeader />
          <Card className='mt-[-35px]'>
            <TokenAmout
              isDest={false}
              allTokens={allTokens}
              limitBera={limitBera === 1}
              chain={fromChain}
              token={fromToken ?? null}
              amount={sendAmount}
              onAmountChange={(v: string) => {
                onSendAmountChange(v)
              }}
              chainList={chainList}
              onChainChange={(chain: Chain) => {
                setFromChain(chain)
              }}
              onTokenChange={(token: Token) => {
                setFromToken(token)
              }}
              comingSoon={ComingSoon}
            />
            <div className='h-[8px] md:h-4 flex justify-center items-center' onClick={() => {
              const [_fromChain, _toChain] = [toChain, fromChain]
              const [_fromToken, _toToken] = [toToken, fromToken]
              setFromChain(_fromChain)
              setToChain(_toChain)
              setFromToken(_fromToken)
              setToToken(_toToken)
              setLimitBera(limitBera === 0 ? 1 : 0)
            }}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="36" height="36" rx="7" fill="#75759D" stroke="#2B294A" stroke-width="2" />
                <path d="M19.4999 14V24.5M19.4999 24.5L14 19M19.4999 24.5L25 19" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>

            </div>
            <TokenAmout
              allTokens={_allTokens}
              isDest={true}
              limitBera={limitBera === 0}
              amount={reciveAmount ?? ''}
              chainList={chainList}
              chain={toChain}
              token={toToken ?? null}
              disabledInput={true}
              onChainChange={(chain: Chain) => {
                setToChain(chain)
              }}
              onTokenChange={(token: Token) => {
                setToToken(token)
              }}
              comingSoon={ComingSoon}
            />
            <div className='flex items-center justify-between pt-[17px] text-[12px] text-[#A6A6DB]'>
              <div>Receive address</div>
              <div className='flex items-center gap-2 text-[#fff]'>
                <div>{formatLongText(address, 6, 6)}</div>
              </div>
            </div>

            {
              routes && routes.length > 0 && toToken && (
                <Routes fromChain={fromChain} selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} toToken={toToken as Token} routes={routes} />
              )
            }

            <SubmitBtn
              fromChainId={fromChain.chainId}
              isLoading={quoteLoading || sendLoading}
              disabled={sendDisabled || !selectedRoute}
              onClick={async () => {
                const isSuccess = await executeRoute()
                if (isSuccess) {
                  setConfirmShow(true)
                }
              }} comingSoon={ComingSoon} />
          </Card>

          <Confirm
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken as Token}
            toToken={toToken as Token}
            amount={sendAmount}
            receiveAmount={reciveAmount ?? ''}
            show={confirmShow}
            onClose={() => {
              setConfirmShow(false);
            }}
            showHistory={() => {
              setHistoryShow(true)
              setActiveTab('pending')
            }}
          />
        </div>
        <History activeTab={activeTab} getStatus={getStatus} setActiveTab={setActiveTab} isOpen={historyShow} setIsOpen={setHistoryShow} />
      </div>
    </>
  );
}
