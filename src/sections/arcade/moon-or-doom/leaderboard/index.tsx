import { useEffect, useMemo, useState } from 'react'

type LeaderboardEntry = {
    rank: number
    name: string
    score: number
    avatarUrl?: string
    isMe?: boolean
}

interface LeaderboardProps {
    title?: string
    endAt?: number
    
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
    const [int, dec] = value.toFixed(2).split('.')
    const paddedInt = int.padStart(3, '0')
    return `${paddedInt}.${dec}`
}

function MyEntryRow({ entry }: { entry: LeaderboardEntry }) {
    return (
        <div className="absolute left-0 right-0 bottom-0">
            <div className="rounded-[8px] bg-[#242230] backdrop-blur">
                <div className="flex items-center h-[56px] px-3 gap-3">
                    <div className="w-[24px] text-center text-[#99FF4D] font-bold text-[14px]">{entry.rank}</div>
                    <div className="w-[32px] h-[32px] rounded-full bg-white/10 overflow-hidden flex items-center justify-center text-[12px]">
                        {entry.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={entry.avatarUrl} alt="me" className="w-full h-full object-cover" />
                        ) : (
                            <span className="opacity-80">🙂</span>
                        )}
                    </div>
                    <div className="flex-1 truncate text-[13px]">{entry.name}</div>
                    <div className="font-mono tabular-nums text-[15px]">{formatScore(entry.score)}</div>
                </div>
            </div>
        </div>
    )
}

export default function Leaderboard(props: LeaderboardProps) {
    const { title = '24H CLIMBING BOARD', endAt } = props
    const countdown = useCountdown(endAt)
    
    const entries: LeaderboardEntry[] = [
        { rank: 1, name: 'Satoshi', score: 123.45 },
        { rank: 2, name: 'Vitalik', score: 118.32 },
        { rank: 3, name: 'Ada', score: 112.08 },
        { rank: 4, name: 'Nick', score: 108.77 },
        { rank: 5, name: 'Hal', score: 104.12 },
        { rank: 6, name: 'Wei', score: 101.56 },
        { rank: 7, name: 'Gavin', score: 99.31 },
        { rank: 8, name: 'Linus', score: 95.80 },
        { rank: 9, name: 'Grace', score: 90.42 },
        { rank: 10, name: 'Turing', score: 88.05 },
    ]

    const myEntry: LeaderboardEntry | undefined = {
        rank: 23,
        name: 'Me_Player',
        score: 67.89,
        avatarUrl: '',
        isMe: true,
    }

    return (
        <div className="w-full relative text-white bg-[#24242480] rounded-[8px] overflow-hidden backdrop-blur-[20px]">
            <div className="flex items-center justify-between text-[18px] h-[60px] font-semibold tracking-wide px-3 select-none bg-[#24242480]">
                <div className="text-white text-[19px]">{title}</div>
                <div className="text-[#BFFF60] text-[16px]">{countdown}</div>
            </div>

            <div className="mt-2">
                <div className=" overflow-hidden text-[14px] mb-[72px]">
                    <div className="pr-1">
                        {entries.map((item) => (
                            <div
                                key={`${item.rank}-${item.name}`}
                                className="flex items-center h-[44px] px-3 gap-3"
                            >
                                <div className="w-[24px] text-center text-[#99FF4D] font-bold text-[14px]">{item.rank}</div>
                                <div className="w-[28px] h-[28px] rounded-full bg-white/10 overflow-hidden flex items-center justify-center text-[12px]">
                                    {item.avatarUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="opacity-80">👤</span>
                                    )}
                                </div>
                                <div className="flex-1 truncate text-[13px] opacity-90">{item.name}</div>
                                <div className="font-mono tabular-nums text-[13px] opacity-90">{formatScore(item.score)}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
            {myEntry ? (<MyEntryRow entry={myEntry} />) : null}
        </div>
    )
}
