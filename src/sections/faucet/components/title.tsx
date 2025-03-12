import clsx from 'clsx';

const FaucetTitle = (props: any) => {
  const { className, textClassName, children } = props;

  return (
    <div className={clsx("flex text-[46px] font-[900] leading-[100%] uppercase text-white font-Unbounded ", className)}>
      <div className={clsx("opacity-10", textClassName)}>
        {children}
      </div>
    </div>
  );
};

export default FaucetTitle;
