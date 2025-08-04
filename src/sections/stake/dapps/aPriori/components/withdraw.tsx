import { useCallback, useEffect, useState } from "react";
import Range from "@/components/range";
import { balanceFormated } from "@/utils/balance";
import clsx from "clsx";
import useTokensBalance from "@/hooks/use-tokens-balance";
import { monadTestnet } from "viem/chains";
import useAPriori from "../hooks/use-apripri";
import { useInterval, useThrottleFn } from "ahooks";
import useToast from "@/hooks/use-toast";
import CircleLoading from "@/components/circle-loading";
import Big from "big.js";
import TOKENS, { APRIORI_CONTRACT_ADDRESS } from "../config/tokens";
import { useAccount, useSwitchChain } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";


export default function Stake() {
    const [amount, setAmount] = useState<string>("");
    const [receive, setReceive] = useState<string>("0");
    const [tokens, setTokens] = useState<any[]>(TOKENS);
    const [rate, setRate] = useState<string>("1");
    const [pending, setPending] = useState<any[]>([]);
    const [ready, setReady] = useState<any[]>([]);
    const [isStakeLoading, setIsStakeLoading] = useState<boolean>(false);
    const [tabIndex, setTabIndex] = useState<number>(0);

    const { balances, queryBalance } = useTokensBalance(tokens)
    const { success, fail } = useToast()

    const [percent, setPercent] = useState<any>(0);
    const handleRangeChange = (e: any, isAmountChange = true) => {
        const formatedBalance = String(balances[APRIORI_CONTRACT_ADDRESS] || 0);
        if (["-", "Loading", "0"].includes(formatedBalance)) return;
        const amount = Number(formatedBalance) * (e.target.value || 0) / 100;
        setAmount(amount.toString());
        const _percent = e.target.value || 0;
        setPercent(_percent);
    };
    const { getConvertToAssets, handleWithdraw, getWithdrawalRequests, handleClaim } = useAPriori()

    useEffect(() => {
        throttledGetConvertToAssets(amount)
    }, [amount]);

    const { run: throttledGetConvertToAssets } = useThrottleFn((amount) => {
        if (!amount) return;

        getConvertToAssets(amount).then((res) => {
            setReceive(res);
        });
    }, {
        wait: 500,
        leading: false,
        trailing: true,
    })

    useEffect(() => {
        getConvertToAssets('1').then((res) => {
            setRate(res);
        })
    }, []);

    const getWithdrawalList = useCallback(() => {
        getWithdrawalRequests().then((res) => {
            if (!res) return;
            const pending = res.filter((item: any) => !item.is_claimable);
            const ready = res.filter((item: any) => item.is_claimable);
            setPending(pending)
            setReady(ready)
        })
    }, [])

    useEffect(() => {
        getWithdrawalList()
    }, [])

    useInterval(() => {
        getWithdrawalList()
    }, 1000 * 30)

    return (
        <div className="pt-4 relative">
            <h2 className="text-[18px] text-white mb-2">Unstake MON</h2>
            <div className="bg-[#26234B] rounded-xl p-5 mb-4 lg:bg-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[#A6A6DB] font-Unbounded text-[14px]">MON amount</span>

                </div>
                <div className="flex justify-between items-center mb-2">
                    <input
                        placeholder="0"
                        className="text-[26px] bg-[transparent] w-[50%] text-white"
                        value={amount}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\s+/g, "");
                            if (!/^\d*\.?\d*$/.test(val)) return;
                            setAmount(val);
                            const _percent = Number(val) / Number(balances[APRIORI_CONTRACT_ADDRESS]) * 100;
                            setPercent(_percent > 100 ? 100 : _percent);
                        }}
                        inputMode="decimal"
                        pattern="^\d*\.?\d*$"
                    />
                    <div className="flex flex-col items-end">
                        <div className="flex items-center bg-[#3B3860] rounded-lg px-3 py-1 cursor-pointer">
                            <span className="w-5 h-5 mr-2 inline-block bg-[url('https://tokens.pancakeswap.finance/images/monad-testnet/aprMON.svg')] bg-contain bg-center bg-no-repeat" />
                            <span className="text-[#C18CFF] font-semibold">aprMON</span>
                        </div>
                        <span onClick={() => {
                            setAmount(balances[APRIORI_CONTRACT_ADDRESS])
                            setPercent(100);
                        }} className="text-[10px] cursor-pointer text-[#B6B3D6] underline mt-[5px]">balance: {balanceFormated(balances[APRIORI_CONTRACT_ADDRESS])}</span>
                    </div>
                </div>
                <div className="text-[#B6B3D6] text-sm mb-2">$-</div>
                <div className="flex items-center justify-between gap-[40px]">
                    <Range
                        style={{ marginTop: 0, flex: 1 }}
                        value={percent}
                        onChange={handleRangeChange}
                    />

                    <div className="flex items-center gap-[8px]">
                        {BalancePercentList.map((p, index) => (
                            <>
                                {index > 0 && (
                                    <div className="w-[1px] h-[10px] bg-[#75759D] bg-opacity-[0.5]"></div>
                                )}
                                <div
                                    key={p.value}
                                    className={clsx(
                                        "cursor-pointer h-[22px] rounded-[6px] duration-500 text-[10px] leading-[22px] font-[400] hover:underline hover:text-white",
                                        p.value === percent ? "text-white" : "text-[#A6A6DB]"
                                    )}
                                    onClick={() => handleRangeChange({ target: p })}
                                >
                                    {p.label}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-6 mb-2">
                {/* Use aPriori Card */}
                <div className="flex-1  bg-[#23224A] rounded-xl border border-[#B6B3D6] p-5 flex flex-col gap-2 shadow-md">
                    <div className="text-[#E7E2FF] text-[14px] font-semibold mb-2">Use aPriori</div>
                    <div className="flex justify-between text-[#A6A6DB] text-[12px]">
                        <span>Rate:</span>
                        <span className="text-white">1 : {rate}</span>
                    </div>
                    <div className="flex justify-between text-[#A6A6DB] text-[12px]">
                        <span>Wait time:</span>
                        <span className="text-white">10 minutes</span>
                    </div>
                    <div className="flex justify-between text-[#A6A6DB] text-[12px]">
                        <span>You receive:</span>
                        <span className="text-white">{balanceFormated(receive)} MON</span>
                    </div>
                </div>
                {/* Use Pool Card */}
                <div className="flex-1 bg-[#6B6A8B] bg-opacity-50 rounded-xl p-5 flex flex-col gap-2 opacity-60 cursor-not-allowed">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[#C7C6E5] text-[14px] font-semibold">Use Pool</span>
                        <span className="text-[#C7C6E5] text-[10px]">Coming soon</span>
                    </div>
                    <div className="flex justify-between text-[#C7C6E5] text-[12px]">
                        <span>Rate:</span>
                        <span></span>
                    </div>
                    <div className="flex justify-between text-[#C7C6E5] text-[12px]">
                        <span>Wait time:</span>
                        <span></span>
                    </div>
                    <div className="flex justify-between text-[#C7C6E5] text-[12px]">
                        <span>You receive:</span>
                        <span></span>
                    </div>
                </div>
            </div>
            <WithdrawBtn
                isStakeLoading={isStakeLoading}
                amount={amount}
                balances={balances}
                handleWithdraw={handleWithdraw}
                setIsStakeLoading={setIsStakeLoading}
                queryBalance={queryBalance}
                fail={fail}
                getWithdrawalList={getWithdrawalList}
                success={success}
            />

            <div className="w-[370px] mx-auto mt-8 bg-[#23224A] rounded-2xl shadow-lg border border-[#3B3970] font-Montserrat absolute top-[-80px] right-[-460px]">
                <div className="flex border-b border-[#35346A]">
                    <button
                        className={`flex-1 py-2 text-[18px] transition ${tabIndex === 0
                            ? "text-[#A6FF7A] border-b-2 border-[#A6FF7A]"
                            : "text-[#A6A6DB]"
                            }`}
                        onClick={() => setTabIndex(0)}
                    >
                        {pending.length} Pending
                    </button>
                    <button
                        className={`flex-1 py-2 text-[18px] font-semibold transition ${tabIndex === 1
                            ? "text-[#A6FF7A] border-b-2 border-[#A6FF7A]"
                            : "text-[#A6A6DB]"
                            }`}
                        onClick={() => setTabIndex(1)}
                    >
                        {ready.length} Ready to claim
                    </button>
                </div>

                <div className="divide-y divide-[#35346A]">
                    {
                        (tabIndex === 0 ? pending : ready).map((item: any) => (
                            <div className="flex items-center px-6 py-5" key={item.id}>
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2D2B5A] mr-4">
                                    <img src="/images/monad.svg" alt="MON" className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-white text-[18px] font-semibold">{balanceFormated(new Big(item.assets).div(10 ** 18).toString())} <span className="text-[#A6A6DB] text-[14px] font-normal ml-1">MON</span></div>
                                </div>
                                {
                                    item.is_claimable && (
                                        <ChaimBtn item={item} handleClaim={handleClaim} getWithdrawalRequests={getWithdrawalRequests} success={success} fail={fail} />
                                    )
                                }

                                {
                                    !item.is_claimable && (
                                        <TimeItem item={item} getWithdrawalRequests={getWithdrawalRequests} />
                                    )
                                }
                            </div>
                        ))
                    }

                    {
                        (tabIndex === 0 ? pending : ready).length === 0 && (
                            <div className="flex items-center justify-center px-6 py-10">
                                <div className="text-white text-[18px] text-center font-semibold">{
                                    tabIndex === 0 ? "No pending requests found." : "No claimable requests found."
                                }</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

const BalancePercentList = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "Max" }
];

const clsCliam = 'ml-4 px-6 py-1 flex items-center justify-center gap-2 rounded-lg bg-[#8B87FF] text-white text-[16px] font-bold hover:opacity-80 transition'
const ChaimBtn = ({ item, handleClaim, getWithdrawalRequests, success, fail }: { item: any, handleClaim: any, getWithdrawalRequests: any, success: any, fail: any }) => {
    const [isClaiming, setIsClaiming] = useState<boolean>(false)
    const { address, chainId } = useAccount()
    const { openConnectModal } = useConnectModal();
    const { switchChain } = useSwitchChain()

    if (chainId !== monadTestnet.id) {
        return <button
            type="button"
            className={clsCliam}
            onClick={() => {
                switchChain({ chainId: monadTestnet.id })
            }}
        >Switch Chain</button>
    }

    return (
        <button onClick={async () => {
            setIsClaiming(true)
            const tx = await handleClaim(item.id)
            console.log('tx:', tx)
            if (tx) {
                success({
                    title: 'Claim successful',
                    description: 'Claim successful',
                    icon: 'success',
                    tx: tx,
                    chainId: monadTestnet.id,
                })
            } else {
                fail({
                    title: 'Claim failed'
                })
            }
            setIsClaiming(false)
            setTimeout(() => {
                getWithdrawalRequests()
            }, 1000)
        }} className={clsCliam}>
            {isClaiming ? <CircleLoading size={16} /> : ''}
            Claim
        </button>
    )
}

const TimeItem = ({ item, getWithdrawalRequests }: { item: any, getWithdrawalRequests: any }) => {
    const [time, setTime] = useState<number>(10)

    useInterval(() => {
        setTime(10 - Math.floor((new Date().getTime() - item.requested_at * 1000) / 1000 / 60))
    }, 1000)

    useEffect(() => {
        if (time <= 1) {
            getWithdrawalRequests()
        }
    }, [time])

    return (
        <div className="text-[#A6A6DB] text-[14px] font-normal ml-1">
            ~{time <= 0 ? 0 : time} minutes
        </div>
    )
}

const cls = 'w-full h-[60px] flex items-center justify-center rounded-[6px] text-[#fff] bg-[#8B87FF] text-[18px] font-[600] mt-[16px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed'

const WithdrawBtn = ({
    isStakeLoading,
    amount,
    balances,
    handleWithdraw,
    setIsStakeLoading,
    queryBalance,
    fail,
    getWithdrawalList,
    success }: { isStakeLoading: boolean, amount: string, balances: any, handleWithdraw: any, setIsStakeLoading: any, queryBalance: any, fail: any, getWithdrawalList: any, success: any }) => {
    const { address, chainId } = useAccount()
    const { openConnectModal } = useConnectModal();
    const { switchChain } = useSwitchChain()

    if (!address) {
        return <button
            type="button"
            className={cls}
            onClick={() => {
                openConnectModal?.()
            }}
        >
            Connect Wallet
        </button>
    }

    if (chainId !== monadTestnet.id) {
        return <button
            type="button"
            className={cls}
            onClick={() => {
                switchChain({ chainId: monadTestnet.id })
            }}
        >Switch Chain</button>
    }

    return (
        <button
            disabled={isStakeLoading || Number(amount) > Number(balances[APRIORI_CONTRACT_ADDRESS]) || Number(amount) <= 0}
            onClick={async () => {
                if (Number(amount) > Number(balances[APRIORI_CONTRACT_ADDRESS])) {
                    fail({
                        title: 'Insufficient balance'
                    })
                    return;
                }

                setIsStakeLoading(true)
                const tx = await handleWithdraw(amount)
                console.log('tx:', tx)
                if (tx) {
                    success({
                        title: 'Withdraw successful',
                        description: 'Withdraw successful',
                        icon: 'success',
                        tx: tx,
                        chainId: monadTestnet.id,
                    })
                } else {
                    fail({
                        title: 'Withdraw failed'
                    })
                }
                queryBalance()
                getWithdrawalList()
                setIsStakeLoading(false)
            }} className={cls}>
            {isStakeLoading ? <CircleLoading size={20} /> : null}
            Request Withdrawls
        </button>
    )
}