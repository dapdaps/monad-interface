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
      className={`px-[37px] py-[45px] bg-[url('/images/mainnet/bridge/dapp-bg.png?r=3')] bg-[100%_100%] bg-no-repeat md:px-[10px] md:py-[16px] ${className}`}
    >
      <div className="absolute z-[1] inset-0 aspect-auto left-[3%] right-[3%] top-[10%] bottom-[1px] pointer-events-none bg-black/10 backdrop-blur-[30px]"
        style={{
          clipPath: "polygon(32px 0, calc(100% - 32px) 0, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0 calc(100% - 32px), 0 32px)"
        }}
      ></div>
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
