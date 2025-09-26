export default function Nft({ data }: { data: any }) {
    return (
        <div>
            <div className="flex flex-col items-center bg-[#222633] rounded-[6px] p-2 border border-[#34304B]">
                <div
                    className="relative w-full h-[200px] overflow-hidden"
                    style={{
                        clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
                    }}
                >
                    {
                        data.image && <img
                            src={data.image}
                            className="w-full h-[200px] object-cover"
                        />
                    }
                </div>
            </div>

            <div className="text-[18px] font-[400] text-white w-full truncate flex items-center justify-between px-[10px] mt-[10px]">
                <div className="truncate w-[70%] overflow-hidden text-ellipsis">{data.collection.name} #{data.tokenId}</div>
                <svg onClick={() => {
                    // TODO: change to mainnet
                    window.open('https://magiceden.io/collections/monad-testnet/' + data.contract, '_blank');
                }} className="cursor-pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.65217 9L13 1M13 1H6.46692M13 1V7.26087M3.6087 1H1V13H13V10.5" stroke="#727D97" stroke-width="1.5" />
                </svg>
            </div>

            <div className="text-[14px] font-[400] text-[#727D97] w-full truncate flex items-center justify-between px-[10px] mt-[10px]">
                <div className="truncate w-[70%] overflow-hidden text-ellipsis">Floor Price</div>
                <div className="">{data.collection.floorAskPrice?.amount?.native || '-'} MON</div>
            </div>
        </div>
    )
}