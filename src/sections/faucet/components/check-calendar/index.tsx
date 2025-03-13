import clsx from 'clsx';
import { useFaucetContext } from '@/sections/faucet/context';
import FaucetCheckCard from '@/sections/faucet/components/check-calendar/item';

const FaucetCheckCalendar = (props: any) => {
  const { className } = props;

  const { currentMonthCheckinList } = useFaucetContext();

  return (
    <div className={clsx("grid grid-cols-10 gap-x-[12px] gap-y-[20px] mt-[27px] pt-[14px] max-h-[240px] overflow-y-auto overflow-x-hidden", className)}>
      {
        currentMonthCheckinList.map((it) => (
          <FaucetCheckCard
            item={it}
            key={it.id}
          />
        ))
      }
    </div>
  );
};

export default FaucetCheckCalendar;
