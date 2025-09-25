import { useDebounce } from 'ahooks';
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import useTokensBalance from '@/hooks/use-tokens-balance';
import { tokenSortBalance } from './util';
import chainCofig from '../lib/util/chainConfig';
import useAccount from '@/hooks/use-account';
import { usePriceStore } from '@/stores/usePriceStore';
import type { Chain, Token } from '@/types';


import Modal from '@/components/modal/index';
import Image from './Image';
import TokenRow from './Token';

const Container = styled.div`
  display: flex;
  height: 500px;
  flex-direction: column;
`;

const ChainWapper = styled.div`
  /* width: 85px; */
  /* border-right: 1px solid rgba(55, 58, 83, 1); */
  /* padding: 10px 0 10px 0; */
  /* max-height: 100%;
  min-height: 100px; */
  .chain-tip {
    position: absolute;
    left: 0;
    top: 0;
    height: 50px;
    line-height: 50px;
    left: 70px;
    display: flex;
    align-items: center;
    z-index: 12;
    background-color: #FFFDEB;
    border-radius: 0 12px 12px 0;
    border: 1px solid rgba(55, 58, 83, 1);
    border-left: 0;
    padding: 0 17px 0 10px;
    box-shadow: 10px 0px 15px 2px rgba(0, 0, 0, 0.3);
  }

  .chain-list {
    /* height: calc(100% - 20px); */
    overflow-y: auto;
    padding-left: 20px;
    /* overflow-x: hidden; */
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    .chain {
      width: 108px;
      height: 108px;
      border-radius: 4px;
      border: 1px solid #34304B;
      cursor: pointer;
      margin-top: 8px;
      position: relative;
      background-color: #151822;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #727D97;
      .img {
        width: 50px;
        height: 50px;
      }
      &.active {
        border: 1px solid #836EF9;
        color: #fff !important;
      }
      .detail {
        display: none;
      }
      &:hover {
        /* .detail {
                    display: block;
                    height: 100%;
                    line-height: 50px;
                    background-color: red;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 500px;
               } */
        background-color: inherit;

        border-radius: 12px 0 0 12px;
        border: 1px solid rgba(55, 58, 83, 1);
        border-right: 0;
        box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.3);
      }
      &.disabeld {
        opacity: 0.2;
        cursor: default;
      }
    }
  }
`;

const TokenWapper = styled.div`
  flex: 1;
  .ctg-wapper {
    height: calc(100% - 120px);
    overflow: auto;
  }
`;

const Title = styled.div`
  font-size: 14px;
  line-height: 16px;
`;

const TokenTop = styled.div`
  padding: 20px;
  .input-wapper {
    height: 36px;
    display: flex;
    align-items: center;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    padding: 0 10px;
    margin-top: 10px;
    .icon {
    }
    .input {
      flex: 1;
      margin-left: 5px;
      font-size: 14px;
      background-color: inherit;
      &::placeholder {
        color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const TokenList = styled.div`
  /* height: calc(100% - 120px);
    overflow: auto; */
    margin-top: 20px;
    height: 200px;
    overflow-y: auto;
`;

const ChainGroup = styled.div`
  .cur-chian {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    padding-left: 20px;
    margin-top: 10px;
    &.cc-selected {
      justify-content: space-between;
      padding-right: 10px;
    }
    &.can-click-chain {
      cursor: pointer;
    }
    .img {
      width: 32px;
      height: 32px;
    }
    .chain-selected {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  .ct-title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
    padding: 10px 20px;
  }

  .token-amount {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface Props {
  onClose?: () => void;
  chainList: Chain[];
  chainToken: any;
  currentChain: Chain | undefined;
  currentToken: Token | undefined;
  showSelectChain?: boolean;
  disabledChainSelector?: boolean;
  onChainChange: (chain: Chain) => void;
  onTokenChange: (token: Token) => void;
  limitBera: boolean;
}

const TokenListComp = forwardRef(function TokenListComp(
  {
    chain,
    chainToken,
    currentToken,
    groupId,
    searchTxt,
    showSelectChain,
    filterChain,
    searchAll,
    onChainChange,
    onTokenChange,
    onClose,
    onTempChainChange,
    limitBera
  }: {
    chain: Chain;
    chainToken: any;
    groupId: string;
    filterChain: Chain[] | null;
    currentToken: Token | undefined;
    onChainChange: (chain: Chain) => void;
    onTokenChange: (token: Token) => void;
    onClose?: () => void;
    searchTxt: string;
    searchAll: boolean;
    showSelectChain?: boolean;
    onTempChainChange: (chain: Chain) => void;
    limitBera: boolean;
  },
  ref: any
) {
  const [searchTokenList, setSearchTokenList] = useState<any>([]);
  const displayChainId = searchAll && filterChain && filterChain.length ? filterChain[0].chainId : chain.chainId;

  const disPlayChain = searchAll && filterChain && filterChain.length ? filterChain[0] : chain;
  const { loading, balances } = useTokensBalance(chainToken[displayChainId]);
  const { account, chainId, provider } = useAccount();

  useEffect(() => {
    if (chainToken) {
      if (searchAll) {
        // const chainIds = Object.keys(chainToken);
        // const tokens: any = [];
        // chainIds.forEach((chainId: any) => {
        //   const singleChainTokens: any = chainToken[chainId];
        //   singleChainTokens.forEach((token: Token) => {
        //     tokens.push(token);
        //   });
        // });
        // setSearchTokenList(tokens);
      } else {
        // setSearchTokenList(chainToken[displayChainId]);
      }

      setSearchTokenList(chainToken[displayChainId]);
    }
  }, [chainToken, displayChainId, searchAll]);

  const newFilterChain = useMemo(() => {
    if (!searchTxt) {
      return filterChain;
    }

    const _newFilterChain: any = [];
    const usedChain: any = {
      [chain.chainId]: true
    };
    filterChain?.forEach((originChain) => {
      if (usedChain[originChain.chainId]) {
        return;
      }
      const tokenList = chainToken[originChain.chainId];
      _newFilterChain.push({
        ...originChain,
        amount: tokenList?.length || 0
      });
      usedChain[originChain.chainId] = true;
    });

    Object.keys(chainToken).forEach((key: any) => {
      if (usedChain[key]) {
        return;
      }

      _newFilterChain.push({
        ...chainCofig[key],
        amount: chainToken[key].length
      });
      usedChain[key] = true;
    });

    return _newFilterChain;
  }, [searchTxt, filterChain, chainToken, chain]);

  return (
    <ChainGroup>
      {/* {showSelectChain && (
        <>
          <div className="ct-title" id={`${groupId}-${chain.chainId}`}>
            Chain
          </div>
          <div className="cur-chian cc-selected" style={{ marginTop: 0 }}>
            <div className="chain-selected">
              <Image cls="img" src={chain.icon} />
              <div>{chain.chainName}</div>
              {searchTxt && <div className="token-amount">{chainToken[chain.chainId]?.length || 0}</div>}
            </div>
            <div style={{ justifySelf: 'end' }}>
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.80952L4.78125 9L12 1" stroke="#EBF479" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
          </div>
          {newFilterChain?.filter((chain: any) => limitBera ? chain.chainId === 10143 : chain.chainId !== 10143).map((item: any) => {
            if (item.chainId === chain.chainId) {
              return;
            }
            return (
              <div
                onClick={() => {
                  onTempChainChange(item);
                }}
                key={item.chainId}
                className="cur-chian can-click-chain"
              >
                <Image cls="img" src={item.icon} />
                <div>{item.chainName}</div>
                <div className="token-amount">{item.amount}</div>
              </div>
            );
          })}
          <div className="ct-title" style={{ paddingBottom: 0, paddingTop: 20 }}>
            Token
          </div>
        </>
      )} */}

      <div className="text-[18px] font-[400] leading-[16.8px] mt-[20px] text-white text-center">Select Token</div>

      <TokenList>
        {chainToken[displayChainId] &&
          chainToken[displayChainId]
            .sort((a: any, b: any) => {
              const aAddress = a.isNative ? 'native' : a.address;
              const bAddress = b.isNative ? 'native' : b.address;
              if (searchAll && account) {
                // const aBalances = chainsTokensBalance[account][a.chainId] || {};
                // const bBalances = chainsTokensBalance[account][b.chainId] || {};
                // return tokenSortBalance(a, b, aBalances[aAddress], bBalances[bAddress]);
              } else {
                return tokenSortBalance(a, b, balances[aAddress], balances[bAddress]);
              }
            })
            .map((token: Token) => {
              return (
                <TokenRow
                  isSelected={currentToken?.symbol === token.symbol && !searchAll}
                  key={token.symbol + token.address + token.chainId}
                  token={token}
                  loading={loading}
                  balances={balances}
                  chain={chainCofig[token.chainId] as Chain}
                  onTokenChange={(token: Token) => {
                    onChainChange(chainCofig[token.chainId]);
                    onTokenChange(token);
                    onClose && onClose();
                  }}
                />
              );
            })}
      </TokenList>
    </ChainGroup>
  );
});

export default function ChainAndTokenSelector({
  onClose,
  chainList,
  chainToken,
  currentChain,
  currentToken,
  showSelectChain,
  disabledChainSelector,
  onChainChange,
  onTokenChange,
  limitBera
}: Props) {
  const [tempChain, setTempChain] = useState(currentChain);
  const [searchVal, setSearchVal] = useState('');
  const [sortedChainList, setSortedChainList] = useState<Chain[]>([]);
  const [hoverChain, setHoverChain] = useState<Chain | null>(null);
  const [tipTop, setTipTop] = useState(0);
  const [idSuffix, setIdSuffix] = useState(Date.now() + '');
  const [filterChainVal, setFilterChainVal] = useState();
  const [filterChain, setSearchedChain] = useState<Chain[] | null>([]);
  const [searchAll, setSearchAll] = useState(false);
  const wapperRef = useRef<any>();

  const inputValue = useDebounce(searchVal, { wait: 500 });

  useEffect(() => {
    if (chainList) {
      const all = chainList.map((item) => item);
      const top3 = all.splice(0, 3);

      const _sortedChainList = all.sort((a, b) => {
        return a.chainName.localeCompare(b.chainName);
      });
      const _all = top3.concat(_sortedChainList);
      setSortedChainList(_all);
    }
  }, [chainList]);

  useEffect(() => {
    if (inputValue) {
      const lowerVal = inputValue.trim().toLowerCase();
      const filterChainToken: any = {};
      const [keyChainName, tokenSymbol] = lowerVal.split(':');
      if (keyChainName && tokenSymbol) {
        const filterChain = chainList.filter((chain) => chain.chainName.toLowerCase().indexOf(keyChainName) > -1);
        if (filterChain && filterChain.length) {
          filterChain.forEach((chain) => {
            const tokenList = chainToken[chain.chainId];
            const filterList = tokenList.filter((token: Token) => {
              return (
                token.symbol.toLowerCase().indexOf(tokenSymbol) > -1 || token.address.toLowerCase() === tokenSymbol
              );
            });
            if (filterList && filterList.length) {
              filterChainToken[chain.chainId] = filterList;
              setSearchAll(true);
              setSearchedChain(filterChain);
            }
          });
        }
        // setSearchAll(true)
        // setSearchedChain([])
      } else {
        const filterChain = chainList.filter((item: Chain) => {
          return item.chainName.toLowerCase().indexOf(lowerVal) > -1;
        });

        setSearchedChain(filterChain);

        Object.keys(chainToken).forEach((key) => {
          const tokenList = chainToken[key];
          const filterList = tokenList.filter((token: Token) => {
            return token.symbol.toLowerCase().indexOf(lowerVal) > -1 || token.address.toLowerCase() === lowerVal;
          });

          if (filterList && filterList.length > 0) {
            filterChainToken[key] = filterList;
          }
        });
        setSearchAll(false);
      }
      setFilterChainVal(filterChainToken);
    } else {
      setFilterChainVal(chainToken);
      setSearchedChain([]);
      setSearchAll(false);
    }
  }, [chainList, inputValue, chainToken]);

  useEffect(() => {
    if (currentChain && idSuffix) {
      setTimeout(() => {
        const ele = document.getElementById(`${idSuffix}-${currentChain.chainId}`);
        if (ele) {
          ele.scrollIntoView();
        }
      }, 500);
    }
  }, [idSuffix, currentChain]);

  return (

    <div className="absolute top-[50px] left-[15px] right-[15px] h-[calc(100%-80px)] z-[1000] font-Oxanium px-[20px] bg-black text-white">
      <div className="relative flex items-center justify-center text-[18px] font-[400] h-[50px]">
        <div onClick={() => {
          onClose?.();
        }} className='absolute left-[20px] top-[10px] w-[35px] h-[35px] border border-[#727D974D] rounded-[6px] flex items-center justify-center cursor-pointer'>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 6.79427C-0.166667 6.40937 -0.166666 5.44712 0.5 5.06222L7.76795 0.866064C8.65398 0.354512 9.64553 1.34606 9.13398 2.23209L7.28867 5.42824C7.11004 5.73764 7.11004 6.11884 7.28868 6.42824L9.13398 9.62439C9.64553 10.5104 8.65398 11.502 7.76795 10.9904L0.5 6.79427Z" fill="#8E97AD" />
          </svg>
        </div>
        Select Chain
      </div>
      <Container ref={wapperRef}>
        <ChainWapper>
          {/* <Title style={{ paddingLeft: 20 }}>Chain</Title> */}
          {/* {hoverChain && (
            <div style={{ top: tipTop }} className="chain-tip">
              <div>{hoverChain.chainName}</div>
            </div>
          )} */}

          <div
            className="chain-list"
          // onScroll={() => {
          //   setHoverChain(null);
          // }}
          >
            {sortedChainList?.filter((chain) => limitBera ? chain.chainId === 10143 : chain.chainId !== 10143).map((chain) => {
              return (
                <div
                  key={chain.chainId}
                  id={`${idSuffix}-${chain.chainId}-p`}
                  onClick={() => {
                    if (disabledChainSelector) {
                      return;
                    }
                    setTempChain(chain);
                    // const ele = document.getElementById(`${idSuffix}-${chain.chainId}`);
                    // if (ele) {
                    //   ele.scrollIntoView();
                    // }
                    setSearchVal('');
                  }}
                  // onMouseEnter={(e) => {
                  //   if (disabledChainSelector && currentChain?.chainId !== chain.chainId) {
                  //     return;
                  //   }
                  //   setHoverChain(chain);
                  //   let ele: any = e.target;
                  //   if (ele.tagName.toUpperCase() !== 'DIV') {
                  //     ele = ele.parentNode;
                  //   }
                  //   const wapperSize = wapperRef.current.getBoundingClientRect();
                  //   const chainSize = ele.getBoundingClientRect();
                  //   const top = chainSize.top - wapperSize.top;
                  //   setTipTop(top);
                  // }}
                  // onMouseLeave={() => {
                  //   setHoverChain(null);
                  // }}
                  className={`chain ${tempChain?.chainId === chain.chainId ? 'active' : ''} ${disabledChainSelector && currentChain?.chainId !== chain.chainId ? 'disabeld' : ''}`}
                >
                  <Image cls="img" src={chain.icon} />
                  <div className="text-[14px] font-[400] leading-[16.8px] mt-[10px]">{chain.chainName}</div>
                </div>
              );
            })}
          </div>
        </ChainWapper>
        <TokenWapper>
          {/* <TokenTop>
            <Title>Select token</Title>
            <div className="input-wapper">
              <div className="icon">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#3D4159" stroke-width="2" />
                  <rect
                    x="14.9141"
                    y="9.64978"
                    width="6.141"
                    height="2.63186"
                    rx="1.31593"
                    transform="rotate(30 14.9141 9.64978)"
                    fill="#3D4159"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
                value={searchVal}
                className="input"
                placeholder="e.g. ethereum:eth"
              />
            </div>
          </TokenTop> */}
          <div className="ctg-wapper">
            {sortedChainList.map((chain) => {
              if (chain.chainId !== tempChain?.chainId) {
                return null;
              }

              return (
                <TokenListComp
                  key={chain.chainId}
                  chain={chain}
                  searchAll={searchAll}
                  chainToken={filterChainVal}
                  currentToken={currentToken}
                  groupId={idSuffix}
                  showSelectChain={showSelectChain}
                  filterChain={filterChain}
                  onChainChange={onChainChange}
                  limitBera={limitBera}
                  onTempChainChange={(item) => {
                    setTempChain(item);
                    setTimeout(() => {
                      const ele = document.getElementById(`${idSuffix}-${item.chainId}-p`);
                      if (ele) {
                        ele.scrollIntoView({
                          behavior: 'smooth'
                        });
                      }
                    }, 40);
                    // setSearchVal('');
                  }}
                  onTokenChange={onTokenChange}
                  onClose={onClose}
                  searchTxt={inputValue}
                />
              );
            })}
          </div>
        </TokenWapper>
      </Container>
    </div>
  );
}

