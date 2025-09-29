import Pagination from "@/components/pagination";
import useGameRecord from "../hooks/use-game-record";
import Loading from "@/components/loading";
import Empty from "@/components/empty";
import HashLink from "../hash-link";
import dayjs from "dayjs";
import { usePriceStore } from "@/stores/usePriceStore";

export default function Gaming({ refresh }: { refresh: number }) {
    const { gameRecord, isLoading, fetchGameRecord, page, pageTotal, PAGE_SIZE, setPage } = useGameRecord({ refresh });
    const { price }: any = usePriceStore()

    return (
        <div className="max-h-[95%] overflow-y-auto">
            <table className="min-w-[600px] w-full text-[18px]">
                <thead className="sticky top-0 z-10 text-[18px] bg-[#000000]">
                    <tr className=" text-left font-[400] text-[#727D97]">
                        <th className="py-4 pl-[30px]">Type</th>
                        <th className="py-4 pl-[30px]">Assets</th>
                        <th className="py-4 pl-[30px]">Amount</th>
                        <th className="py-4 pl-[30px]">Value</th>
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
                                        <Empty /> No data yet
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
                                <td className="pl-[30px]">{getGameAssets(item)}</td>
                                <td className="pl-[30px]">{getGameAmount(item)}</td>
                                <td className="pl-[30px]">{getGameValue(item, price['MON'])}</td>
                                <td className="pl-[30px] text-[#727D97]">
                                    {dayjs.unix(item.create_time).utc().format('YYYY/MM/DD HH:mm')}
                                </td>
                                <td className="pl-[30px]">
                                    <div className="flex items-center pr-[10px] gap-2">
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
    rps: '/images/mainnet/game/guess_who_hover.png',
}

const Names: any = {
    777: 'Lucky 777',
    space: 'Space Invaders',
    rps: 'Guess Who',
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




function getGameAmount(item: any) {
    const { game_category, amount, whitelist } = item;
    switch (game_category) {
        case 'spaceCashOut':
            return <div className="text-[#BFFF60]">{'+' + amount}</div>
        case 'spaceCreate':
            return <div>{'-' + amount}</div>
        case 'purchase777':
            return <div>{'-' + amount}</div>
        case '777':
            return <div className="text-[#BFFF60]">{'+' + amount}</div>
        case 'rpsCreate':
            return <div>{'-' + amount}</div>
        case 'rpsJoin':
            return <div>{'-' + amount}</div>
        case 'rpsCashOut':
            return <div className="text-[#BFFF60]">{'+' + amount}</div>
        default:
            return amount;
    }
}

const CashOut = () => <div className="flex items-center gap-2">
    <img src="/images/monad.svg" alt="MON" className="w-6 h-6" />
    <span>Cash out</span>
</div>

function getGameAssets(item: any) {
    const { game_category, whitelist } = item;
    switch (game_category) {
        case 'spaceCashOut':
            return whitelist ? whitelist : <CashOut />
        case 'spaceCreate':
            return <CashOut />
        case 'purchase777':
            return <CashOut />
        case '777':
            return whitelist ? whitelist : <CashOut />
        case 'rpsCreate':
            return <CashOut />
        case 'rpsJoin':
            return <CashOut />
        case 'rpsCashOut':
            return whitelist ? whitelist : <CashOut />
        default:
            return <CashOut />
    }
}

function getGameValue(item: any, monPrice: number) {
    const { amount, whitelist } = item;
    if (!whitelist && amount) {
        return <div>${(amount * monPrice).toFixed(2)}</div>
    }

    return <div className="text-[#727D97]">N/A</div>

}