import Nft from "./nft";
import useNft from "../hooks/use-nft";
import Pagination from "@/components/pagination";
import Loading from "@/components/loading";
import Empty from "@/components/empty";

export default function Nfts() {
    const { nfts, getNfts, page, pageTotal, PAGE_SIZE, isLoading } = useNft();


    return (
        <div className="px-[30px] py-[20px] overflow-y-auto">
            {
                isLoading && <div className="flex justify-center items-center h-[calc(100dvh-770px)]">
                    <Loading />
                </div>
            }

            {
                !isLoading && nfts.length > 0 && (
                    <div className="grid grid-cols-5 gap-4 h-[calc(100dvh-770px)]">
                        {
                            nfts.map((item: any) => (
                                <Nft key={item.token?.contract + item.token?.tokenId} data={item.token} />
                            ))  
                        }
                    </div>
                )
            }

            {
                !isLoading && nfts.length === 0 && (
                    <div className="flex justify-center items-center h-[calc(100dvh-770px)]">
                        <Empty desc="No NFTs" />
                    </div>
                )
            }
            

            <div className="flex justify-end items-center mt-[20px]">
                <Pagination totalPage={pageTotal} page={page} pageSize={PAGE_SIZE} showPage={false} canJump={false} onPageChange={(pageIndex: number) => {
                    getNfts(pageIndex);
                }} />
            </div>
        </div>
    )
}