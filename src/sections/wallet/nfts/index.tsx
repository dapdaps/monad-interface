import Nft from "./nft";

export default function Nfts() {
    return (
        <div className="px-[30px] py-[20px]">
            <div className="grid grid-cols-5 gap-4">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <Nft key={item} />
                    ))  
                }
            </div>
        </div>
    )
}