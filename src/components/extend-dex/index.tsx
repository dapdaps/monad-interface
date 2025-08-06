import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function ExtendDex({ dapps }: any) {
  const params = useSearchParams();
  const dappName = params.get("dapp");

  const router = useRouter();

  const _dapps = useMemo(() => {
    return dapps.filter(
      (dapp: any) =>
        dapp.name.toLowerCase() !== (dappName as string)?.toLowerCase()
    );
  }, [dapps, dappName]);

  return (
    <div
      style={{ top: 640 - _dapps?.length * 100 }}
      className="absolute left-[50%] translate-x-[350px] z-[6]"
    >
      <div className="relative z-20">
        {_dapps.map((dapp: any, idx: number) => (
          <div
            key={dapp.name}
            onClick={() => {
              router.push(`/dex?dapp=${dapp.name.toLowerCase()}`);
            }}
            className={clsx(
              "w-[120px] flex h-[94px] cursor-pointer bg-[#40357E] border border-[#000000] rounded-[6px] p-[2px]",
              (dapps.length - idx) % 2 !== 0
                ? "justify-end"
                : "translate-x-[-10px]"
            )}
          >
            <div className="w-[81px] h-[88px] opacity-60 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center bg-[#6758B9] border border-[#000000] rounded-[6px]">
              <img
                src={dapp.logo}
                alt={dapp.name}
                className="w-[42px] h-[42px]"
              />
              <div className="text-[12px] text-white text-center mt-[10px]">
                {dapp.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
        src="/images/dapps/extend-bg.svg"
        className="translate-y-[-15px] translate-x-[-15px]"
        alt="extend-dex"
      />
    </div>
  );
}
