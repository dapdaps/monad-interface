import { useParams } from "next/navigation";

export default function ExtendDex({ dapps }: any) {
    const urlParams = useParams();

    console.log('dapps', dapps)

    return (
        <div className="absolute bottom-[240px] left-[50%] translate-x-[300px] z-50">
            <img src="/images/dapps/extend-bg.svg" alt="extend-dex" />
            {
                dapps.map((dapp: any) => (
                    <div key={dapp.name} className="w-[120px] h-[94px]">
                        <img src={dapp.logo} alt={dapp.name} className="w-[81px] h-[88px]" />
                        <div className="text-[12px] text-white text-center mt-[10px]">{ dapp.name }</div>
                    </div>
                ))
            }
        </div>
    )
}