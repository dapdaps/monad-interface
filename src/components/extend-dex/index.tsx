import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";

export default function ExtendDex({ dapps }: any) {
    const urlParams = useParams();

    const router = useRouter();

    return (
        <div className="absolute bottom-[240px] left-[50%] translate-x-[350px] z-50">
            <div className="relative z-20">
                {
                    dapps.map((dapp: any, idx: number) => (
                        <div 
                        key={dapp.name} 
                        onClick={() => {
                            router.push(`./${dapp.name.toLowerCase()}`)
                        }}
                        className={clsx("w-[120px] flex h-[94px] cursor-pointer bg-[#40357E] border border-[#000000] rounded-[6px] p-[2px]", (dapps.length - idx) % 2 !== 0 ? "justify-end" : "translate-x-[-10px]")}>
                            <div className="w-[81px] h-[88px] opacity-60 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center bg-[#6758B9] border border-[#000000] rounded-[6px]">
                                <img src={dapp.logo} alt={dapp.name} className="w-[42px] h-[42px]" />
                                <div className="text-[12px] text-white text-center mt-[10px]">{dapp.name}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <img src="/images/dapps/extend-bg.svg" className="translate-y-[-15px] translate-x-[-1px]" alt="extend-dex" />
        </div>
    )
}