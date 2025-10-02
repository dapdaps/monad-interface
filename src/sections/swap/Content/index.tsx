import { useState, useMemo, useEffect } from "react";
import useTrade from "../useTrade";
import { useImportTokensStore } from "@/stores/import-tokens";
import { useDebounceFn } from "ahooks";
import { usePriceStore } from "@/stores/usePriceStore";
import useAccount from "@/hooks/use-account";
import Header from "../Header";
import TokenAmount from "../TokenAmount";
import Fees from "../Fees";
import SubmitBtn from "../SubmitBtn";
import ExchangeIcon from "./ExchangeIcon";
import Result from "./Result";
import { uniqBy } from "lodash";
import Big from "big.js";
import TokenSelector from "../TokenSelector";
import { DEFAULT_CHAIN_ID } from "@/configs/index";
import chains from "@/configs/chains";
import dapps from "@/configs/swap";
import RoutesModal from '@/components/routes/index'
export default function Swap({
  dapp,
  outputCurrencyReadonly = false,
  showSetting = true,
  from,
  onSuccess,
  isAutoExchange = true,
  isSuperSwap = false,
  onShowRoute,
}: any) {
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState("");
  const [outputCurrencyAmount, setOutputCurrencyAmount] = useState("");
  const [inputCurrency, setInputCurrency] = useState<any>(
    dapp?.defaultInputCurrency
  );
  const [outputCurrency, setOutputCurrency] = useState<any>(
    dapp?.defaultOutputCurrency
  );
  const [displayCurrencySelect, setDisplayCurrencySelect] = useState(false);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState("");
  const [maxInputBalance, setMaxInputBalance] = useState("");
  const [errorTips, setErrorTips] = useState("");
  const [updater, setUpdater] = useState(0);
  const { importTokens, addImportToken }: any = useImportTokensStore();
  const { account, chainId } = useAccount();
  const [showDetail, setShowDetail] = useState(true);
  const prices = usePriceStore((store: any) => store.price);
  const [selectedRoute, setSelectedRoute] = useState(null)

  const [selectType, setSelectType] = useState<"in" | "out">("in");
  const { loading, trade, tradeList, onQuoter, onSwap, setTrade } = useTrade({
    chainId: DEFAULT_CHAIN_ID,
    // template: dapp.name,
    template: isSuperSwap ? ['Uniswap', 'Pancake', 'OneClick', 'iZumi', 'LFJ', 'Kuru'] : dapp.name,
    from,
    onSuccess: () => {
      setUpdater(Date.now());
      runQuoter();
      onSuccess?.();
    }
  });

  const { run: runQuoter } = useDebounceFn(
    () => {
      onQuoter({ inputCurrency, outputCurrency, inputCurrencyAmount });
      setOutputCurrencyAmount("");
    },
    {
      wait: 500
    }
  );

  const tokens = useMemo(() => {
    return uniqBy(
      [
        ...(dapp.tokens[DEFAULT_CHAIN_ID] || []),
        ...(importTokens[DEFAULT_CHAIN_ID] || [])
      ].map((token: any) => ({
        ...token,
        address: token.address.toLowerCase()
      })),
      "address"
    );
  }, [importTokens, dapp]);

  const onSelectToken = (token: any) => {
    let _inputCurrency: any = inputCurrency;
    let _outputCurrency: any = outputCurrency;

    if (selectType === "in") {
      _inputCurrency = token;
      if (token.address.toLowerCase() === outputCurrency?.address.toLowerCase()) {
        if (!isAutoExchange) {
          return;
        }
        _outputCurrency = null
      }
    }
    if (selectType === "out") {
      _outputCurrency = token;
      if (token.address.toLowerCase() === inputCurrency?.address.toLowerCase()) {
        if (!isAutoExchange) {
          return;
        }
        _inputCurrency = null;
      }
    }
    if (!_inputCurrency || !_outputCurrency) setOutputCurrencyAmount("");
    setInputCurrency(_inputCurrency);
    setOutputCurrency(_outputCurrency);
    setDisplayCurrencySelect(false);
    setInputCurrencyAmount("");
  };

  useEffect(() => {
    setInputCurrency(dapp?.defaultInputCurrency);
    setOutputCurrency(dapp?.defaultOutputCurrency);
    setInputCurrencyAmount("");
    setOutputCurrencyAmount("");
  }, [dapp]);

  useEffect(() => {
    if (!inputCurrency || !outputCurrency) {
      setErrorTips("Select token");
      return;
    }
    if (Number(inputCurrencyAmount || 0) === 0) {
      setErrorTips("Enter an amount");
      setOutputCurrencyAmount("");
      return;
    }
    if (Big(inputCurrencyAmount).gt(maxInputBalance || 0)) {
      setErrorTips(`Insufficient ${inputCurrency?.symbol} Balance`);
    } else {
      setErrorTips("");
    }

    runQuoter();
  }, [inputCurrency, outputCurrency, inputCurrencyAmount, maxInputBalance]);

  useEffect(() => {
    setOutputCurrencyAmount(trade?.outputCurrencyAmount || "");
  }, [trade]);

  const routes = useMemo(() => {
    if (!tradeList) return null;

    return tradeList.map((route: any) => {
      const dapp = dapps[route.name.toLowerCase()];
      return {
        name: route.name,
        icon: dapp.logo,
        outputCurrencyAmount: route.outputCurrencyAmount,
        gas: route.gasUsd,
        fee: route.fee,
        feeType: 2,
        duration: 10,
        inputCurrencyAmount: route.inputCurrencyAmount,
        priceImpact: route.priceImpact || 0,
        priceImpactType: route.priceImpactType || 0,
        inputCurrency: inputCurrency,
        outputCurrency: outputCurrency,
      }
    })
  }, [tradeList])

  useEffect(() => {
    if (routes && routes.length > 0) {
      routes.find((route: any) => {
        if (route.name === trade.name) {
          setSelectedRoute(route)
        }
      })
    }

    onShowRoute?.(routes)
  }, [routes, trade])

  return (
    <>
      <Header
        showSetting={showSetting}
        from={from}
        dapp={dapp}
        style={{ justifyContent: "space-between" }}
        title={
          ' '
          // from === "marketplace"
          //   ? `GET ${outputCurrency?.symbol}`
          //   : `Swap via ${dapp.name === "SuperSwap" ? "OneClick" : dapp.name}`
        }
        loading={loading}
        onQuoter={runQuoter}
      />
      <div className="md:max-h-[calc(100dvh-210px)] md:overflow-y-auto">
        <TokenAmount
          type="in"
          currency={inputCurrency}
          amount={inputCurrencyAmount}
          prices={prices}
          account
          onCurrencySelectOpen={() => {
            setDisplayCurrencySelect(true);
            setSelectType("in");
            setSelectedTokenAddress(inputCurrency?.address);
          }}
          onUpdateCurrencyBalance={(balance: any) => {
            setMaxInputBalance(balance);
          }}
          onAmountChange={(val: any) => {
            setInputCurrencyAmount(val);
          }}
          updater={`in-${updater}`}
        />
        <ExchangeIcon
          onClick={() => {
            if (loading || outputCurrencyReadonly) return;
            const [_inputCurrency, _outputCurrency] = [
              outputCurrency,
              inputCurrency
            ];
            setInputCurrency(_inputCurrency);
            setOutputCurrency(_outputCurrency);
            setOutputCurrencyAmount("");
            if (Big(inputCurrencyAmount || 0).gt(0)) runQuoter();
          }}
        />
        <TokenAmount
          type="out"
          currency={outputCurrency}
          amount={outputCurrencyAmount}
          disabled
          prices={prices}
          account
          outputCurrencyReadonly={outputCurrencyReadonly}
          onCurrencySelectOpen={() => {
            if (outputCurrencyReadonly) return;
            setDisplayCurrencySelect(true);
            setSelectType("out");
            setSelectedTokenAddress(outputCurrency?.address);
          }}
          updater={`out-${updater}`}
        />
        {!!(trade && inputCurrency && outputCurrency) && (
          <>
            <Result
              inputCurrency={inputCurrency}
              outputCurrency={outputCurrency}
              inputCurrencyAmount={inputCurrencyAmount}
              outputCurrencyAmount={outputCurrencyAmount}
              priceImpactType={trade?.priceImpactType}
              trade={trade}
              onClose={() => {
                setShowDetail(!showDetail);
              }}
            />
            <Fees
              priceImpactType={trade?.priceImpactType}
              priceImpact={trade?.priceImpact}
              gasUsd={trade?.gasUsd}
              routerStr={trade?.routerStr}
              inputCurrency={inputCurrency}
              outputCurrency={outputCurrency}
              outputCurrencyAmount={outputCurrencyAmount}
              show={showDetail}
              trade={trade}
              tradeList={tradeList}
              onSelectRoute={(trade: any) => {
                setTrade(trade)
              }}
            />
          </>
        )}

        <SubmitBtn
          chain={{
            chainId: DEFAULT_CHAIN_ID
          }}
          className="w-full mt-[10px]"
          amount={inputCurrencyAmount}
          isApproveMax={trade?.type === "UniversalRouter"}
          spender={trade?.type === "UniversalRouter" ? "0xC51DA9473283695884AD536FFD180e618Bf6186e" : trade?.routerAddress}
          errorTips={errorTips}
          token={inputCurrency}
          loading={loading}
          onClick={onSwap}
          disabled={trade?.noPair || !trade?.txn}
          onRefresh={() => {
            runQuoter();
          }}
          updater={`button-${updater}`}
        />
        {/* {from === "marketplace" && (
          <div className="text-center  mt-[12px]">
            <a href="/bridge" className="underline text-[14px] text-[#A6A6DB]">
              Bridge Assets to Monad
            </a>
          </div>
        )} */}
      </div>
      <TokenSelector
        display={displayCurrencySelect}
        chainIdNotSupport={chainId !== DEFAULT_CHAIN_ID}
        selectedTokenAddress={selectedTokenAddress}
        chainId={DEFAULT_CHAIN_ID}
        tokens={tokens}
        account={account}
        explor={chains[DEFAULT_CHAIN_ID].blockExplorers.default.url}
        onImport={addImportToken}
        onClose={() => {
          setDisplayCurrencySelect(false);
        }}
        onSelect={onSelectToken}
      />

      {
        trade && routes.length > 0 && (
          <div className="absolute top-0 right-[-385px] pt-[15px]">
            <RoutesModal
              routes={routes}
              fromChain={trade.fromChain}
              inputCurrency={inputCurrency}
              outputCurrency={outputCurrency}
              selectedRoute={selectedRoute}
              setSelectedRoute={(route) => {
                setSelectedRoute(route)
                tradeList.find((trade: any) => {
                  if (route.name === trade.name) {
                    setTrade(trade)
                  }
                })
              }}

            />
          </div>
        )
      }

    </>
  );
}
