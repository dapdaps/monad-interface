export default function Card({
  children,
  className,
  style
}: {
  children: React.ReactNode | null;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...style,
        backgroundSize: '100% 100%',
      }}
      className={`px-[37px] py-[45px] bg-[url('/images/mainnet/bridge/dapp-bg.png?r=2')] bg-[100%_100%] bg-no-repeat md:px-[10px] md:py-[16px] ${className}`}
    >
      <div className="absolute z-[1] inset-0 aspect-auto left-[3%] right-[3%] top-[10%] bottom-[5%] pointer-events-none bg-black/20 backdrop-blur-[30px]"></div>
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
