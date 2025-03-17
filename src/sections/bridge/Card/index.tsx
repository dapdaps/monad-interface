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
        className={`px-[37px] py-[45px] bg-[url('/images/bridge/bg.png')] bg-[100%_100%] bg-no-repeat md:px-[10px] md:py-[16px] ${className}`}
      >
        {children}
      </div>
    );
  }
  