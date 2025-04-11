import clsx from 'clsx';
import { useFaucetContext } from '@/sections/faucet/context';
import FaucetCheckCard from '@/sections/faucet/components/check-calendar/item';

const FaucetCheckCalendar = (props: any) => {
  const { className } = props;

  const { checkinList } = useFaucetContext();

  return (
    <div className={clsx("md:p-[14px_4px_50px] md:mt-0 grid md:grid-cols-5 grid-cols-10 gap-x-[12px] md:gap-y-[12px] gap-y-[20px] mt-[27px] pt-[14px] md:max-h-max max-h-[240px] overflow-y-auto overflow-x-hidden", className)}>
      {
        checkinList.map((it) => (
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
