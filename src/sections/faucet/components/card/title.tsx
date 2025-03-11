import clsx from 'clsx';
import FaucetTitle from '@/sections/faucet/components/title';

const FaucetCardTitle = (props: any) => {
  const { className, children } = props;

  return (
    <FaucetTitle className={clsx("w-full h-[110px] items-end pl-[45px] bg-[url('/images/faucet/card-split.svg')] bg-no-repeat bg-center", className)}>
      {children}
    </FaucetTitle>
  );
};

export default FaucetCardTitle;
