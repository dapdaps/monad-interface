'use client';

import { useEffect, useState } from 'react';
import TokenSelector from '../TokenSelector';

import Range from "@/components/range";
import useTokenBalance from '@/hooks/use-token-balance';
import Loading from '@/components/loading';
import { usePriceStore } from '@/stores/usePriceStore';
import { balanceFormated } from '@/utils/balance';
import { tokenPairs } from '../Hooks/Stargate/config';

import type { Chain, Token } from '@/types';
import ChainAndTokenSelector from '../ChainAndTokenSelector';
import { motion } from 'framer-motion';
import Big from 'big.js';
import HexagonButton from '@/components/button/hexagon';
import clsx from 'clsx';

const BalancePercentList = [
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "Max" }
];


interface Props {
  chain: Chain;
  token: Token | null;
  amount: string;
  disabledInput?: boolean;
  comingSoon?: boolean;
  onAmountChange?: (v: string) => void;
  onChainChange?: (v: Chain) => void;
  onTokenChange?: (v: Token) => void;
  chainList: Chain[];
  limitBera: boolean;
  isDest: boolean;
  allTokens: any;
}

export default function TokenAmout({
  chain,
  token,
  amount,
  disabledInput = false,
  onChainChange,
  onTokenChange,
  comingSoon,
  onAmountChange,
  chainList,
  limitBera,
  isDest,
  allTokens
}: Props) {
  const [tokenSelectorShow, setTokenSelectorShow] = useState(false);
  const [percent, setPercent] = useState<any>(0);

  const { tokenBalance, isError, isLoading, update } = useTokenBalance(
    token ? (token.isNative ? 'native' : token.address) : '', token?.decimals ?? 0, token?.chainId ?? 0
  )
  const prices: any = usePriceStore(store => store.price);

  const handleRangeChange = (e: any, isAmountChange = true) => {
    const formatedBalance = balanceFormated(tokenBalance);
    if (["-", "Loading", "0"].includes(formatedBalance)) return;
    const _percent = e.target.value || 0;
    setPercent(_percent);
    onAmountChange &&
      onAmountChange?.(
        Big(tokenBalance)
          .times(Big(_percent).div(100))
          .toFixed(token?.decimals)
          .replace(/[.]?0+$/, "")
      );
  };

  useEffect(() => {
    if (tokenBalance && Number(tokenBalance) > 0) {
      handleRangeChange({ target: { value: Math.min(Number(amount) / Number(tokenBalance) * 100, 100) } }, false);
    } else {
      handleRangeChange({ target: { value: 0 } }, false);
    }
  }, [amount, tokenBalance]);


  return (
    <div className=' rounded-[6px] p-[14px] bg-[#201D31] font-white border border-[#34304B]'>
      <div className='text-[14px] font-[400] text-[#A6A6DB]'>{isDest ? 'To' : 'Send'}</div>

      <div className='flex items-center justify-between gap-[10px]'>
        <div className="flex-1">
          <input placeholder='0' type='number' className="w-[100%] h-[100%] text-[22px] text-[#fff] bg-transparent" value={amount} onChange={(e) => {
            onAmountChange?.(e.target.value)
          }} disabled={disabledInput} />
        </div>


        <div className='cursor-pointer border border-[#34304B] py-[5px] rounded-[4px] px-[7px] bg-[#151822]' onClick={() => {
          if (comingSoon) return;

          if (isDest && limitBera) {
            return;
          }
          setTokenSelectorShow(true);
        }}>
          <div

            className=' flex items-center text-left justify-between w-[150px] h-full px-[7px]'
          >
            <div className='flex items-center gap-[10px] text-[#fff]'>
              <div className='relative w-[26px]'>
                {
                  token?.icon ? <img
                    key={token?.address}
                    className='w-[26px] h-[26px]'
                    src={token?.icon}
                  /> : <div className='w-[26px] h-[26px] rounded-[50%] bg-[#000]' />
                }
                <img
                  className='w-[10px] h-[10px] absolute right-0 bottom-0 md:rounded-sm'
                  src={chain.icon}
                />
              </div>
              <div>
                <div className='text-[16px] w-[80px] font-[600] whitespace-nowrap overflow-hidden text-ellipsis'>{token?.symbol}</div>
                <div className='text-[12px] w-[80px] whitespace-nowrap overflow-hidden text-ellipsis'>{chain?.chainName}</div>
              </div>
            </div>
            {
              !comingSoon && (
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6 5L11 1"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )
            }
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between text-[#A6A6DB] mt-[10px] text-[12px]">
        <div >${(token && tokenBalance) ? balanceFormated(prices[token.symbol.toUpperCase()] * (amount as any), 4) : '~'}</div>
        <div className={"flex items-center cursor-pointer"} onClick={() => {
          onAmountChange?.(tokenBalance)
        }}>balance: {isLoading ? <Loading size={12} /> : <span className={(disabledInput ? '' : ' underline')}>{balanceFormated(tokenBalance, 4)}</span>}</div>
      </div>

      {!disabledInput && (
        <div className="flex justify-between md:flex-col md:items-stretch md:justify-start items-center gap-[22px] mt-[12px]">
          <Range
            style={{ marginTop: 0, flex: 1 }}
            value={percent}
            onChange={handleRangeChange}
          />
          <div className="flex items-center gap-[8px]">
            {BalancePercentList.map((p) => (
              <motion.div
                key={p.value}
                className={clsx("cursor-pointer h-[22px] rounded-[6px text-[10px] font-[400] px-[8px] hover:underline", percent == p.value ? "text-[#BFFF60]" : "text-white")}
                onClick={() => handleRangeChange({ target: p })}
              >
                {p.label}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {
        tokenSelectorShow && <ChainAndTokenSelector
          onClose={() => {
            setTokenSelectorShow(false);
          }}
          limitBera={limitBera}
          currentChain={chain}
          currentToken={token as Token}
          chainToken={allTokens}
          chainList={chainList}
          showSelectChain={true}
          onChainChange={(chain) => {
            onChainChange?.(chain)
          }}
          onTokenChange={(token: Token) => {
            onTokenChange?.(token)
          }}
        />
      }

    </div>
  );
}
