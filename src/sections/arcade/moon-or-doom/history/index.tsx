import React, { useState, useEffect, useCallback } from "react";
import Modal from "@/components/modal";
import Pagination from "@/components/pagination";
import { get } from "@/utils/http";
import useUser from "@/hooks/use-user";
import Loading from "@/components/loading";
import Empty from "@/components/empty";
import clsx from "clsx";
import dayjs from "dayjs";
import ActionButton from "../action-button";
import { numberFormatter } from "@/utils/number-formatter";
import Big from "big.js";
import { playSound1 } from "../lib/sound";
import chains from "@/configs/chains";
import { DEFAULT_CHAIN_ID } from "@/configs";

type HistoryModalProps = {
    open: boolean;
    onClose: () => void;
    deposit?: (amount: string) => void;
    depositLoading?: boolean;
    withdraw?: (amount: string) => void;
    withdrawLoading?: boolean;
    tokenBalance?: string;
    gameBalance?: number;
    onSuccess?: () => void;
};

type TabType = "bid-records" | "recharge" | "withdraw";

interface BidRecord {
    amount: string;
    multiplier: string;
    range: string;
    time: string;
    result: number;
    profit: string;
}

const PAGE_SIZE = 10;

export default function HistoryModal({
    open,
    onClose,
    deposit,
    depositLoading,
    withdraw,
    withdrawLoading,
    tokenBalance,
    gameBalance,
    onSuccess,
}: HistoryModalProps) {
    const [activeTab, setActiveTab] = useState<TabType>("bid-records");
    const [bidRecords, setBidRecords] = useState<BidRecord[]>([]);
    const [bidRecordsLoading, setBidRecordsLoading] = useState(false);
    const [bidRecordsPage, setBidRecordsPage] = useState(1);
    const [bidRecordsPageTotal, setBidRecordsPageTotal] = useState(0);

    // Recharge/Withdraw states
    const [amount, setAmount] = useState<string>("");
    const [percent, setPercent] = useState(0);

    const { userInfo } = useUser();

    // Local states for deposit/withdraw lists
    const [depositList, setDepositList] = useState<any[]>([]);
    const [depositPage, setDepositPage] = useState(1);
    const [depositPageTotal, setDepositPageTotal] = useState(0);
    const [depositListLoading, setDepositListLoading] = useState(false);

    const [withdrawList, setWithdrawList] = useState<any[]>([]);
    const [withdrawPage, setWithdrawPage] = useState(1);
    const [withdrawPageTotal, setWithdrawPageTotal] = useState(0);
    const [withdrawListLoading, setWithdrawListLoading] = useState(false);



    const fetchBidRecords = useCallback(async () => {
        if (!userInfo.address || bidRecordsLoading) return;

        setBidRecordsLoading(true);
        try {
            const res = await get('/game/euphoria/user/orders', {
                page: bidRecordsPage,
                page_size: PAGE_SIZE,
            });

            if (res.code === 200) {
                const data = res.data.data || [];
                const formattedData: BidRecord[] = data.map((item: any) => {

                    return {
                        amount: item.bet_amount || '0',
                        multiplier: item.multiplier || '0',
                        range: item.range || `${item.min_price || '0'}-${item.max_price || '0'}`,
                        time: item.created_at || item.time || '',
                        result: item.status,
                        profit: item.status === 1 ? Number(item.multiplier) * Number(item.bet_amount) : 0,
                    };
                });

                setBidRecords(formattedData);
                setBidRecordsPageTotal(res.data.total_page || 0);
            }
        } catch (error) {
            console.error('Failed to fetch bid records:', error);
        } finally {
            setBidRecordsLoading(false);
        }
    }, [userInfo.address, bidRecordsPage, bidRecordsLoading]);

    useEffect(() => {
        if (open && activeTab === "bid-records" && userInfo.address) {
            fetchBidRecords();
        }
    }, [open, activeTab, bidRecordsPage, userInfo.address]);

    const getDepositList = useCallback(async () => {
        if (!userInfo.address || depositListLoading) return;

        setDepositListLoading(true);
        try {
            const res = await get('/game/euphoria/user/deposits', {
                page: depositPage,
                page_size: PAGE_SIZE,
            });

            if (res.code === 200) {
                setDepositList(res.data.data || []);
                setDepositPageTotal(res.data.total_page || 0);
            }
        } catch (error) {
            console.error('Failed to fetch deposit list:', error);
        } finally {
            setDepositListLoading(false);
        }
    }, [userInfo.address, depositPage, depositListLoading]);

    const getWithdrawList = useCallback(async () => {
        if (!userInfo.address || withdrawListLoading) return;

        setWithdrawListLoading(true);
        try {
            const res = await get('/game/euphoria/user/withdraws', {
                page: withdrawPage,
                page_size: PAGE_SIZE,
            });

            if (res.code === 200) {
                setWithdrawList(res.data.data || []);
                setWithdrawPageTotal(res.data.total_page || 0);
            }
        } catch (error) {
            console.error('Failed to fetch withdraw list:', error);
        } finally {
            setWithdrawListLoading(false);
        }
    }, [userInfo.address, withdrawPage, withdrawListLoading]);

    useEffect(() => {
        if (open && activeTab === "recharge" && userInfo.address) {
            getDepositList();
        }
    }, [open, activeTab, depositPage, userInfo.address]);

    useEffect(() => {
        if (open && activeTab === "withdraw" && userInfo.address) {
            getWithdrawList();
        }
    }, [open, activeTab, withdrawPage, userInfo.address]);



    return (
        <Modal
            open={open}
            onClose={onClose}
            innerClassName=""
            isShowCloseIcon={false}
        >
            <div className="w-[900px] max-w-[90vw] bg-[url('/images/moon-or-doom/history-bg.png')] bg-no-repeat bg-[length:100%_100%] bg-center overflow-hidden">
                {/* Tabs */}
                <div className="flex items-center justify-start gap-[40px] text-white pt-[30px] pl-[45px] text-[20px] font-[600]">
                    <button
                        className={clsx(
                            "pb-[6px] border-b-[3px] transition-colors",
                            activeTab === "bid-records"
                                ? " border-[#31FFA6]"
                                : " border-transparent"
                        )}
                        onClick={() => {
                            playSound1();
                            setActiveTab("bid-records");
                        }}
                    >
                        Bid Records
                    </button>
                    <button
                        className={clsx(
                            "pb-[6px] border-b-[3px] transition-colors",
                            activeTab === "recharge"
                                ? " border-[#31FFA6]"
                                : " border-transparent"
                        )}
                        onClick={() => {
                            playSound1();
                            setActiveTab("recharge");
                            setAmount("");
                            setPercent(0);
                        }}
                    >
                        Recharge
                    </button>
                    <button
                        className={clsx(
                            "pb-[6px] border-b-[3px] transition-colors",
                            activeTab === "withdraw"
                                ? " border-[#31FFA6]"
                                : " border-transparent"
                        )}
                        onClick={() => {
                            playSound1();
                            setActiveTab("withdraw");
                            setAmount("");
                            setPercent(0);
                        }}
                    >
                        Withdraw
                    </button>
                </div>

                {/* Content */}
                <div className="py-[30px] max-h-[60vh] min-h-[200px] overflow-y-auto">
                    {activeTab === "bid-records" && (
                        <BidRecordsTab
                            records={bidRecords}
                            loading={bidRecordsLoading}
                            page={bidRecordsPage}
                            pageTotal={bidRecordsPageTotal}
                            onPageChange={setBidRecordsPage}
                        />
                    )}

                    {activeTab === "recharge" && (
                        <RechargeTab
                            amount={amount}
                            setAmount={setAmount}
                            percent={percent}
                            actionLoading={depositLoading}
                            depositList={depositList}
                            loading={depositListLoading}
                            page={depositPage}
                            pageTotal={depositPageTotal}
                            onPageChange={setDepositPage}
                        />
                    )}

                    {activeTab === "withdraw" && (
                        <WithdrawTab
                            actionLoading={withdrawLoading}
                            withdrawList={withdrawList}
                            loading={withdrawListLoading}
                            page={withdrawPage}
                            pageTotal={withdrawPageTotal}
                            onPageChange={setWithdrawPage}
                        />
                    )}
                </div>
            </div>
        </Modal>
    );
}

// Bid Records Tab
function BidRecordsTab({
    records,
    loading,
    page,
    pageTotal,
    onPageChange,
}: {
    records: BidRecord[];
    loading: boolean;
    page: number;
    pageTotal: number;
    onPageChange: (page: number) => void;
}) {
    const formatTime = (time: string) => {
        if (!time) return '-';
        try {
            const date = dayjs(time);
            return `${date.format('HH:mm:ss')}-${date.add(5, 'second').format('HH:mm:ss')} ${date.format('DD-MM-YYYY')}`;
        } catch {
            return time;
        }
    };

    return (
        <div>
            <table className="w-full text-[14px]">
                <thead>
                    <tr className="text-left text-[#727D97] font-[600] border-b border-[#34304B]">
                        <th className="py-3 px-2 pl-[30px]">Amount</th>
                        <th className="py-3 px-2">Multiplier</th>
                        <th className="py-3 px-2">Range</th>
                        <th className="py-3 px-2">Time</th>
                        <th className="py-3 px-2">Result</th>
                        <th className="py-3 px-2 pr-[30px]">Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="py-[50px] text-center">
                                <Loading />
                            </td>
                        </tr>
                    ) : records.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-[50px]">
                                <Empty />
                            </td>
                        </tr>
                    ) : (
                        records.map((record, index) => (
                            <tr
                                key={index}
                                className=" hover:bg-[#00000038]"
                            >
                                <td className="py-3 px-2 text-white pl-[30px]">{Number(record.amount).toFixed(2)} MON</td>
                                <td className="py-3 px-2 text-white">{Number(record.multiplier).toFixed(2)}x</td>
                                <td className="py-3 px-2 text-white">{record.range}</td>
                                <td className="py-3 px-2 text-[#A6A6DB]">{formatTime(record.time)}</td>
                                <td className="py-3 px-2">
                                    {
                                        record.result === 0 && <span className="text-[#836EF999]">Pending</span>
                                    }
                                    {
                                        record.result === 1 && <span className="text-[#9BD742]">Win</span>
                                    }
                                    {
                                        record.result === 2 && <span className="text-[#FF008A]">Loss</span>
                                    }
                                </td>
                                <td className="py-3 px-2 pr-[30px]">
                                    {record.result === 1 ? (
                                        <span className="text-[#31FFA6] font-[600]">
                                            {numberFormatter(record.profit, 2, true, { prefix: "+", round: Big.roundDown })} MON
                                        </span>
                                    ) : (
                                        <span className="text-[#A6A6DB]">-</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {pageTotal > 1 && (
                <div className="flex justify-end mt-[20px] pr-[30px]">
                    <Pagination
                        page={page}
                        totalPage={pageTotal}
                        pageSize={PAGE_SIZE}
                        onPageChange={onPageChange}
                        canJump={false}
                    />
                </div>
            )}
        </div>
    );
}

// Recharge Tab
function RechargeTab({
    depositList,
    loading,
    page,
    pageTotal,
    onPageChange,
}: any) {
    return (
        <div>
            {/* Deposit History */}
            <table className="w-full text-[14px]">
                <thead>
                    <tr className="text-left text-[#727D97] font-[600] border-b border-[#34304B]">
                        <th className="py-2 px-2 pl-[30px]">Amount</th>
                        <th className="py-2 px-2">Time</th>
                        <th className="py-2 px-2 pr-[30px]">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={3} className="py-[50px] text-center">
                                <Loading />
                            </td>
                        </tr>
                    ) : depositList.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="py-[50px]">
                                <Empty />
                            </td>
                        </tr>
                    ) : (
                        depositList.map((item: any, index: number) => (
                            <tr key={index} className="text-white">
                                <td className="py-2 px-2 pl-[30px]">{Number(item.amount || 0).toFixed(2)} MON</td>
                                <td className="py-2 px-2 ">{dayjs(item.tx_time * 1000).utc().format('YYYY-MM-DD HH:mm:ss')}</td>
                                <td className="py-2 px-2 pr-[30px]">
                                    <span className={clsx(
                                        "font-[600]",
                                        item.status === 1 ? "text-[#31FFA6]" : "text-[#FF3B3B]"
                                    )}>
                                        {item.status === 1 ? 'Success' : 'Pending'}
                                    </span>

                                    {
                                        item.status === 1 && <a href={`${chains[DEFAULT_CHAIN_ID].blockExplorers.default.url}/tx/${item.tx_hash}`} target="_blank" className="text-[#836EF9] ml-[10px] underline">Tx</a>

                                    }
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {pageTotal > 1 && (
                <div className="flex justify-end mt-[20px] pr-[30px]">
                    <Pagination
                        page={page}
                        totalPage={pageTotal}
                        pageSize={PAGE_SIZE}
                        onPageChange={onPageChange}
                        canJump={false}
                    />
                </div>
            )}
        </div>
    );
}

// Withdraw Tab
function WithdrawTab({
    withdrawList,
    loading,
    page,
    pageTotal,
    onPageChange,
}: any) {
    return (
        <div>
            <table className="w-full text-[14px]">
                <thead>
                    <tr className="text-left text-[#727D97] font-[600] border-b border-[#34304B]">
                        <th className="py-2 px-2 pl-[30px]">Amount</th>
                        <th className="py-2 px-2">Time</th>
                        <th className="py-2 px-2 pr-[30px]">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={3} className="py-[50px] text-center">
                                <Loading />
                            </td>
                        </tr>
                    ) : withdrawList.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="py-[50px]">
                                <Empty />
                            </td>
                        </tr>
                    ) : (
                        withdrawList.map((item: any, index: number) => (
                            <tr key={index} className="text-white">
                                <td className="py-2 px-2 pl-[30px]">{Number(item.amount || 0).toFixed(2)} MON</td>
                                <td className="py-2 px-2 ">{dayjs(item.created_at).utc().format('YYYY-MM-DD HH:mm:ss')}</td>
                                <td className="py-2 px-2 pr-[30px]">
                                    <span className={clsx(
                                        "font-[600]",
                                        item.status === 1 ? "text-[#31FFA6]" : "text-[#FF3B3B]"
                                    )}>
                                        {item.status === 1 ? 'Success' : 'Pending'}
                                    </span>

                                    {
                                        item.status === 1 && <a href={`${chains[DEFAULT_CHAIN_ID].blockExplorers.default.url}/tx/${item.tx_hash}`} target="_blank" className="text-[#836EF9] ml-[10px] underline">Tx</a>
                                    }
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {pageTotal > 1 && (
                <div className="flex justify-end mt-[20px] pr-[30px]">
                    <Pagination
                        page={page}
                        totalPage={pageTotal}
                        pageSize={PAGE_SIZE}
                        onPageChange={onPageChange}
                        canJump={false}
                    />
                </div>
            )}
        </div>
    );
}

