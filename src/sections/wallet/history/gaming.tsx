import Pagination from "@/components/pagination";
import useGameRecord from "../hooks/use-game-record";
import Loading from "@/components/loading";
import Empty from "@/components/empty";
import HashLink from "../hash-link";
import dayjs from "dayjs";

export default function Gaming({ refresh }: { refresh: number }) {
    const { gameRecord, isLoading, fetchGameRecord, page, pageTotal, PAGE_SIZE, setPage } = useGameRecord({ refresh });

    return (
        <div>
            <table className="min-w-[600px] w-full text-[18px] max-h-[180px] overflow-y-auto">
                <thead className="sticky top-0 z-10 text-[18px]">
                    <tr className=" text-left font-[400] text-[#727D97]">
                        <th className="py-4 pl-[30px]">Type</th>
                        {/* <th className="py-4 pl-[30px]">Assets</th> */}
                        <th className="py-4 pl-[30px]">Amount</th>
                        {/* <th className="py-4 pl-[30px]">Value</th> */}
                        <th className="py-4 pl-[30px]">Time</th>
                        <th className="py-4 pl-[30px]">Wallet</th>
                    </tr>
                </thead>
                <tbody className="text-[16px]" >
                    {
                        isLoading && (
                            <tr>
                                <td colSpan={6} className="pt-[50px]">
                                    <div className="flex justify-center items-center">
                                        <Loading />
                                    </div>
                                </td>
                            </tr>
                        )
                    }

                    {
                        !isLoading && (!gameRecord || gameRecord?.length === 0) && (
                            <tr>
                                <td colSpan={6} className="pt-[50px]">
                                    <div className="flex justify-center items-center">
                                        <Empty />
                                    </div>
                                </td>
                            </tr>
                        )
                    }

                    {
                        !isLoading && gameRecord?.length > 0 && gameRecord.map((item: any) => {
                            return <tr className=" hover:bg-[#23263B] transition" key={item.id}>
                                <td className="py-4 pl-[30px]" >
                                    <div className="flex items-center gap-2">
                                        <img src={getGameType(item.game_category)} className="w-[27px] h-[27px]" />
                                        <span>{getGameName(item.game_category)}</span>
                                    </div>
                                </td>
                                {/* <td className="pl-[30px]">Mon</td> */}
                                <td className="pl-[30px]">{item.amount}</td>
                                {/* <td className="pl-[30px]">$744.71</td> */}
                                <td className="pl-[30px] text-[#727D97]">
                                    {dayjs.unix(item.create_time).utc().format('YYYY/MM/DD HH:mm')}
                                </td>
                                <td className="pl-[30px]">
                                    <div className="flex items-center gap-2">
                                        {/* <span className="text-[#727D97]">From</span>
                                        <span>0x...2b35</span> */}
                                        <HashLink hash={item.tx_hash} />
                                    </div>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>

            {
                pageTotal > 1 && (
                    <div className="flex justify-end">
                        <Pagination
                            page={page}
                            totalPage={pageTotal}
                            pageSize={PAGE_SIZE}
                            onPageChange={(_page: number) => {
                                setPage(_page);
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}

const Icons: any = {
    777: '/images/mainnet/wallet/game_777.png',
    space: '/images/mainnet/wallet/game_space.png',
}

const Names: any = {
    777: 'Lucky 777',
    space: 'Space Invaders',
}
function getGameType(name: string) {
    for (const key in Icons) {
        if (name.toLowerCase().includes(key)) {
            return Icons[key]
        }
    }
}

function getGameName(name: string) {
    for (const key in Names) {
        if (name.toLowerCase().includes(key)) {
            return Names[key]
        }
    }
}
