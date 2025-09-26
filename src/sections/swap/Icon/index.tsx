import Image from "next/image";

export default function DappIcon({ dapp }: any) {
  return (
    <div className="absolute z-[3] w-[227px] h-[42px] left-1/2  -translate-x-1/2  top-[-24px] text-white">
      <div className="relative z-[2] flex h-full items-center justify-center gap-[10px]">
        {/* <Image src={dapp.logo} alt={dapp.name} width={24} height={24} /> */}
        <div className="text-[22px] font-semibold">{dapp.name}</div>
      </div>
     
      <img src="/images/mainnet/bridge/dapp-header.svg" className="absolute z-[1] w-[227px] left-[0px] top-[0px]"/>
    </div>
  );
}
