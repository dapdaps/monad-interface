import { useLendingContext } from '@/sections/lending/context';
import ExpandTable from '@/components/expand-table';
import LendingMarketExpands from '@/sections/lending/markets/expands';

const TimeSwap = (props: any) => {
  const {
    config,
    markets,
    marketColumns,
    loading,
    toggleCurrentMarket,
    currentMarket,
  } = useLendingContext();

  const Expand = LendingMarketExpands[config.pathName];

  return (
    <ExpandTable
      className="md:py-[17px]"
      columns={marketColumns}
      data={markets}
      loading={loading}
      current={currentMarket}
      onCurrentChange={toggleCurrentMarket}
      expand={Expand && ((params) => <Expand {...params} />)}
    />
  );
};

export default TimeSwap;
