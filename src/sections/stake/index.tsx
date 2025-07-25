import StakeCommon from "./components/common";
import StakeContextProvider from "./context";
import APriori from "./dapps/aPriori";
import { useStake } from "./hooks";
import CommonStake from "./components/common/stake";
import CommonWithdraw from "./components/common/withdraw";

const StakeView = (props: any) => {
  const { dapp } = props;

  const stake = useStake(props);

  const TABS = [
    {
      label: "Stake",
      value: "stake",
      content: <CommonStake />
    },
    {
      label: "Withdraw",
      value: "withdraw",
      content: <CommonWithdraw />
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
            tabWidth={"50%"}
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
