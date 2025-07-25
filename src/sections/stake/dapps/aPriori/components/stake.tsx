import { useEffect, useState } from "react";
import Range from "@/components/range";
import { balanceFormated } from "@/utils/balance";
import clsx from "clsx";
import useTokensBalance from "@/hooks/use-tokens-balance";
import { monadTestnet } from "viem/chains";
import useAPriori from "../hooks/use-apripri";
import { useThrottleFn } from "ahooks";
import useToast from "@/hooks/use-toast";
import CircleLoading from "@/components/circle-loading";
import TOKENS, { APRIORI_CONTRACT_ADDRESS } from "../config/tokens";
export default function Stake() {
    const [amount, setAmount] = useState<string>("");
    const [receive, setReceive] = useState<string>("0");
    const [tokens, setTokens] = useState<any[]>(TOKENS);
    const [rate, setRate] = useState<string>("1");
    const [isStakeLoading, setIsStakeLoading] = useState<boolean>(false);

    const { balances, queryBalance } = useTokensBalance(tokens)
    const { success, fail } = useToast()

    const [percent, setPercent] = useState<any>(0);
    const handleRangeChange = (e: any, isAmountChange = true) => {
        const formatedBalance = String(balances['native'] || 0);
        if (["-", "Loading", "0"].includes(formatedBalance)) return;
        const amount = Number(formatedBalance) * (e.target.value || 0) / 100;
        setAmount(amount.toString());
        const _percent = e.target.value || 0;
        setPercent(_percent);
    };
    const { getConvertToShares, handleStake } = useAPriori()

    console.log("====percent", percent)

    useEffect(() => {
        throttledGetConvertToAssets(amount)
    }, [amount]);

    const { run: throttledGetConvertToAssets } = useThrottleFn((amount) => {
        if (!amount) return;

       
        getConvertToShares(amount).then((res) => {
            setReceive(res);
        });
    }, {
        wait: 500,
        leading: false,
        trailing: true,
    })

    useEffect(() => {
        getConvertToShares('1').then((res) => {
            setRate(res);
        })
    }, []);

    return (
        <div className="pt-4">
            <h2 className="text-[18px] text-white mb-2">Stake MON</h2>
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
                            const _percent = Number(val) / Number(balances['native']) * 100;
                            setPercent(_percent > 100 ? 100 : _percent);
                        }}
                        inputMode="decimal"
                        pattern="^\d*\.?\d*$"
                    />
                    <div className="flex flex-col items-end">
                        <div className="flex items-center bg-[#3B3860] rounded-lg px-3 py-1 cursor-pointer">
                            <span className="w-5 h-5 mr-2 inline-block bg-[url('/images/monad.svg')] bg-contain bg-center bg-no-repeat" />
                            <span className="text-white font-semibold">MON</span>
                        </div>
                        <span onClick={() => {
                            setAmount(balances['native'])
                            setPercent(100);
                        }} className="text-[10px] cursor-pointer text-[#B6B3D6] underline mt-[5px]">balance: {balanceFormated(balances['native'])}</span>
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

            <div className="bg-[#26234B] rounded-xl p-5 mt-4 lg:bg-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] text-[#A6A6DB] font-semibold">Receive</span>
                </div>
                <div className="flex items-center mb-2 justify-between">
                    <div className="text-[26px] text-white mr-3">{balanceFormated(receive)}</div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center bg-[#3B3860] rounded-lg px-3 py-1 cursor-pointer">
                            <span className="w-5 h-5 mr-2 inline-block bg-[url('https://tokens.pancakeswap.finance/images/monad-testnet/aprMON.svg')] bg-contain bg-center bg-no-repeat" />
                            <span className="text-[#C18CFF] font-semibold">aprMON</span>
                        </div>
                        <span className="text-[10px] text-[#B6B3D6] mt-[5px]">balance: {balanceFormated(balances[APRIORI_CONTRACT_ADDRESS])}</span>
                    </div>
                </div>
                <div className="text-[#B6B3D6] text-sm mb-2">$-</div>
            </div>
            <div className="text-white text-sm mt-4 mb-2">1 MON = {rate} aprMON</div>
            <button disabled={isStakeLoading || Number(amount) >= Number(balances['native']) || Number(amount) <= 0} onClick={async () => {
                if (Number(amount) >= Number(balances['native'])) {
                    console.log('Insufficient balance')
                    fail({
                        title: 'Insufficient balance'
                    })
                    return;
                }

                setIsStakeLoading(true)
                const tx = await handleStake(amount)
                console.log('tx:', tx)
                if (tx) {
                    success({
                        title: 'Stake successful',
                        description: 'Stake successful',
                        icon: 'success',
                        tx: tx,
                        chainId: monadTestnet.id,
                    })
                } else {
                    fail({
                        title: 'Stake failed'
                    })
                }
                queryBalance()
                setIsStakeLoading(false)
            }} className="w-full py-3 flex justify-center items-center mt-2 gap-2 rounded-xl bg-[#8B87FF] text-white text-[18px] hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {isStakeLoading ? <CircleLoading size={20} /> : null}
                Stake
            </button>
        </div>
    );
}

const BalancePercentList = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "Max" }
];
