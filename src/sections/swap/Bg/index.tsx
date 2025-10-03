export default function Bg() {
  return (
    <div className="absolute z-[1] inset-0 aspect-auto w-full h-full pointer-events-none">
      <img
        src="/images/mainnet/bridge/dapp-bg.png?r=2"
        className="absolute z-[1] inset-0 aspect-auto w-full h-full pointer-events-none"
      />
      <div className="absolute z-[1] inset-0 aspect-auto left-[3%] right-[3%] top-[10%] bottom-[5%] pointer-events-none bg-black/20 backdrop-blur-[30px]"></div>
    </div>
  );
}
