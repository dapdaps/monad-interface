import StakeCommon from "./components/common";
import StakeContextProvider from "./context";
import APriori from "./dapps/aPriori";
import { useStake } from "./hooks";
import CommonForm from "./components/common/form";

const StakeView = (props: any) => {
  const { dapp } = props;

  const stake = useStake(props);

  const TABS = [
    {
      label: "Stake",
      value: "stake",
      content: (
        <CommonForm
          foot={(
            dapp.name === "Magma" && (
              <div className="text-white text-sm mt-4 mb-2">
                1 {stake.inputToken?.symbol} = 1 {stake.outputToken?.symbol}
              </div>
            )
          )}
        />
      )
    },
    {
      label: "Withdraw",
      value: "withdraw",
      content: (
        <CommonForm
          foot={(
            dapp.name === "Magma" && (
              <div className="text-white text-sm mt-4 mb-2">
                1 {stake.inputToken?.symbol} = 1 {stake.outputToken?.symbol}
              </div>
            )
          )}
        />
      )
    },
  ];

  return (
    <StakeContextProvider value={stake}>
      {
        dapp.name === "aPriori" && (
          <APriori />
        )
      }
      {
        !["aPriori"].includes(dapp.name) && (
          <StakeCommon
            tabs={TABS}
            tabWidth={223}
            onTab={stake.onCurrentTab}
            currentTab={stake.currentTab}
            className=""
            iconClassName=""
            iconImgClassName=""
          />
        )
      }
    </StakeContextProvider>
  );
};

export default StakeView;
