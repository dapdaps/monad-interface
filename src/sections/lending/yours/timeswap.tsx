import { useLendingContext } from '@/sections/lending/context';
import ExpandTable from '@/components/expand-table';
import LendingYoursExpands from '@/sections/lending/yours/expands';

const TimeSwap = (props: any) => {
  const {} = props;

  const {
    config,
    yours,
    yoursColumns,
    loading,
    userDataLoading,
    toggleCurrentYoursMarket,
    currentYoursMarket,
  } = useLendingContext();

  const Expand = LendingYoursExpands[config.pathName];

  return (
    <ExpandTable
      className=""
      columns={yoursColumns}
      data={yours}
      loading={loading || userDataLoading}
      current={currentYoursMarket}
      onCurrentChange={toggleCurrentYoursMarket}
      expand={Expand && ((params) => <Expand {...params} />)}
      primaryKey="uniqueId"
    />
  );
};

export default TimeSwap;
