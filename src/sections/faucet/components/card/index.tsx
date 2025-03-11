import clsx from 'clsx';
import FaucetTitle from '@/sections/faucet/components/title';

const FaucetCard = (props: any) => {
  const { className, headerClassName, bodyClassName, children } = props;

  return (
    <div className={clsx("w-[828px] min-h-[200px] rounded-[12px] border border-[#3E347C] bg-[#2B294A]", className)}>
      <FaucetTitle className={clsx("w-full h-[66px] pl-[22px] pb-[2px] items-end bg-[url('/images/faucet/card-head.svg')] bg-no-repeat bg-[position:center_top] bg-[length:100%]')]", headerClassName)}>
        Faucet
      </FaucetTitle>
      <div className={clsx("pt-[32px] pb-[27px] text-[12px] text-white font-[400] font-Unbounded leading-normal", bodyClassName)}>
        {children}
      </div>
    </div>
  );
};

export default FaucetCard;
