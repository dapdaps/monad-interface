export default function Bg() {
  return (
    <div className="absolute z-[1] inset-0 aspect-auto w-full h-full pointer-events-none">
      <img
        src="/images/mainnet/bridge/dapp-bg.png?r=2"
        className="absolute z-[1] inset-0 aspect-auto w-full h-full pointer-events-none"
      />
      <div className="absolute z-[1] inset-0 aspect-auto left-[3%] right-[3%] top-[10%] bottom-[1px] pointer-events-none bg-black/20 backdrop-blur-[30px]"
        style={{
          clipPath: "polygon(32px 0, calc(100% - 32px) 0, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0 calc(100% - 32px), 0 32px)"
        }}
      ></div>
    </div>
  );
}
