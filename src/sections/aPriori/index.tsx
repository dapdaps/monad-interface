import useAPriori from "./hooks/use-apripri";

export default function APriori() {
    const { getConvertToShares, getConvertToAssets, getBalance, handleStake, getWithdrawalRequests, handleWithdraw, handleClaim, getTVL } = useAPriori();

    return (
        <div className="text-white py-[100px]">
            <h1>APriori</h1>
            <div className="flex flex-col gap-4">
                <button onClick={() => getConvertToShares(1)}>getConvertToShares</button>
                <button onClick={() => getConvertToAssets(1)}>getConvertToAssets</button>
                <button onClick={() => getBalance()}>getBalance</button>
                <button onClick={() => handleStake(0.1)}>handleStake</button>
                <button onClick={() => getWithdrawalRequests()}>getWithdrawalRequests</button>
                <button onClick={() => handleWithdraw(0.1)}>handleWithdraw</button>
                <button onClick={() => handleClaim(8052651)}>handleClaim</button>
                <button onClick={() => getTVL()}>getTVL</button>
            </div>
        </div>
    )
}