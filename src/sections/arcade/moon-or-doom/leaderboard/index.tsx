import Empty from '@/components/empty'
import Loading from '@/components/loading'
import useUser from '@/hooks/use-user'
import { get } from '@/utils/http'
import { formatLongText } from '@/utils/utils'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

type LeaderboardEntry = {
    rank: number
    address: string
    profit: number
}

interface LeaderboardProps {
    title?: string

}

function useCountdown(endAt?: number) {
    const [now, setNow] = useState<number>(() => Date.now())

    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(t)
    }, [])

    return useMemo(() => {
        if (!endAt) return '--:--:--'
        let remain = Math.max(0, Math.floor((endAt - now) / 1000))
        const h = Math.floor(remain / 3600)
        remain %= 3600
        const m = Math.floor(remain / 60)
        const s = remain % 60
        const pad = (n: number) => String(n).padStart(2, '0')
        return `${pad(h)}:${pad(m)}:${pad(s)}`
    }, [endAt, now])
}

function formatScore(value: number) {
    return value > 0 ? '+' + value : value
}

function MyEntryRow({ entry }: { entry: LeaderboardEntry }) {
    const { userInfo } = useUser()

    const rank = useMemo(() => {
        return entry ? entry.rank : '-'
    }, [entry])

    const address = useMemo(() => {
        return entry ? formatLongText(entry.address, 5, 5) : formatLongText(userInfo?.address, 5, 5)
    }, [entry, userInfo])

    const profit = useMemo(() => {
        return entry ? entry.profit : '-'
    }, [entry])

    return (
        <div className="absolute left-0 right-0 bottom-0">
            <div className="rounded-[8px] bg-[#242230] backdrop-blur">
                <div className="flex items-center h-[56px] px-3 gap-3">
                    <div className="w-[24px] text-center text-[#99FF4D] font-bold text-[14px]">{rank}</div>
                    <div className="w-[32px] h-[32px] rounded-full bg-white/10 overflow-hidden flex items-center justify-center text-[12px]">
                        <span className="opacity-80">🙂</span>
                    </div>
                    <div className="flex-1 truncate text-[13px]">{address}</div>
                    <div className="font-mono tabular-nums text-[15px]">{profit}</div>
                </div>
            </div>
        </div>
    )
}

export default function Leaderboard(props: LeaderboardProps) {
    const { title = '24H CLIMBING BOARD' } = props
    const countdown = useCountdown(dayjs.utc().endOf('day').valueOf())
    const { userInfo } = useUser()

    const [entries, setEntries] = useState<LeaderboardEntry[]>([])
    const [loading, setLoading] = useState(false)
    const [myEntry, setMyEntry] = useState<any | undefined>(undefined)

    useEffect(() => {
        const fetchEntries = async () => {
            setLoading(true)
            const res = await get('/game/euphoria/leaderboard/day', {
                address: userInfo.address
            })
            if (res.code !== 200) {
                return
            }

            console.log(res.data)
            setEntries(res.data.data || [])
            setLoading(false)
            setMyEntry(res.data.user || undefined)
        }

        if (userInfo?.address) {
            fetchEntries()
        }
    }, [userInfo])



    return (
        <div className="w-full relative text-white bg-[#24242480] rounded-[8px] overflow-hidden backdrop-blur-[20px]">
            <div className="flex items-center justify-between text-[18px] h-[60px] font-semibold tracking-wide px-3 select-none bg-[#24242480]">
                <div className="text-white text-[19px]">{title}</div>
                <div className="text-[#BFFF60] text-[16px]">{countdown}</div>
            </div>

            <div className="mt-2">
                <div className="overflow-hidden text-[14px] mb-[72px]">
                    <div className="pr-1 h-[calc(100vh-650px)] overflow-y-auto">
                        {entries.length > 0 ? entries.map((item) => (
                            <div
                                key={`${item.rank}-${item.address}`}
                                className="flex items-center h-[44px] px-3 gap-3"
                            >
                                <div className="w-[24px] text-center text-[#99FF4D] font-bold text-[14px]">{item.rank}</div>
                                <div className="w-[28px] h-[28px] rounded-full bg-white/10 overflow-hidden flex items-center justify-center text-[12px]">
                                    <span className="opacity-80">👤</span>
                                </div>
                                <div className="flex-1 truncate text-[13px] opacity-90">{item.address.slice(0, 5)}...{item.address.slice(-5)}</div>
                                <div className="font-mono tabular-nums text-[13px] opacity-90">{formatScore(item.profit)}</div>
                            </div>
                        )) : (
                            loading ? (
                                <div className="flex items-center justify-center h-full pt-[50px]">
                                    <Loading />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full pt-[50px]">
                                    <Empty desc="No data yet..." />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <MyEntryRow entry={myEntry} />
        </div>
    )
}
