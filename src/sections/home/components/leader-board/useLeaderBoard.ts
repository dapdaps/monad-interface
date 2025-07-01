import { get } from "@/utils/http";
import { useCallback, useEffect, useMemo, useState } from "react";

const urls = {
    dapp: '/dashboard/trade/dapp',
    nadsa: '/dashboard/trade/user',
}

const unUsedDapps = ['magiceden', 'iZumi', 'OpenOcean'].map((item) => item.toLowerCase());

export const useLeaderBoardDapp = ({ type, defaultItem = 'user' }: { type: 'dapp' | 'nadsa', defaultItem?: 'user' | 'transactions' }) => {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [sortType, setSortType] = useState<'asc' | 'desc'>('asc');
    const [item, setItem] = useState<'user' | 'transactions'>(defaultItem);
    const [loading, setLoading] = useState(false);
    const [userFront3, setUserFront3] = useState<number>(0);
    const [transactionsFront3, setTransactionsFront3] = useState<number>(0);
    const fetchLeaderboard = async () => {
        setLoading(true);
        const response = await get(urls[type]);
        if (response.code === 200) {
            let newLeaderboard = response.data
            
            if (type === 'dapp') {
                newLeaderboard = newLeaderboard.filter((item: any) => !unUsedDapps.includes(item.name.toLowerCase()));
            }
            
            newLeaderboard.sort((a: any, b: any) => b.transactions - a.transactions);
            const front3Transactions = newLeaderboard.slice(0, 3);
            setTransactionsFront3(front3Transactions[front3Transactions.length - 1].transactions);

            if (type === 'dapp') {
                newLeaderboard.sort((a: any, b: any) => b.users - a.users);
                const front3 = newLeaderboard.slice(0, 3);
                setUserFront3(front3[front3.length - 1].users);
            }

            setLeaderboard(newLeaderboard);
        } else {
            setLeaderboard([]);
        }
        setLoading(false);
    };

    const maxUniqueNads = useMemo(() => {
        return Math.max(...leaderboard.map((item) => item.users));
    }, [leaderboard]);

    const maxTransactions = useMemo(() => {
        return Math.max(...leaderboard.map((item) => item.transactions));
    }, [leaderboard]);

    useEffect(() => {
        let newLeaderboard = leaderboard;
        if (item === 'user') {
            newLeaderboard = (leaderboard.sort((a, b) => sortType === 'desc' ? a.users - b.users : b.users - a.users));
        } else if (item === 'transactions') {
            newLeaderboard = (leaderboard.sort((a, b) => sortType === 'desc' ? a.transactions - b.transactions : b.transactions - a.transactions));
        }
        setLeaderboard([...newLeaderboard])
    }, [item, sortType]);

    const sort = useCallback((newItem: 'user' | 'transactions') => {
        if (newItem === item) {
            setSortType(sortType === 'asc' ? 'desc' : 'asc');
        } else {
            setItem(newItem);
            setSortType('asc');
        }
    }, [sortType, item])

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return {
        leaderboard,
        maxUniqueNads,
        maxTransactions,
        sortType,
        item,
        sort,
        loading,
        userFront3,
        transactionsFront3,
    };
};  