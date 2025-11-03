import useCustomAccount from "@/hooks/use-account";
import abi from "../config/abi.json";
import { Contract, ethers } from "ethers";
import useTokenBalance from "@/hooks/use-token-balance";
import Big from "big.js";
import { useEffect, useState } from "react";
import useToast from "@/hooks/use-toast";
import { get, post } from "@/utils/http";
import useUser from "@/hooks/use-user";

const CONTRACT_ADDRESS = "0xff6174156e98aa0a7124c26cda402C7b40682070";
export default function useWallet() {
    const { provider, chainId } = useCustomAccount();
    const { userInfo } = useUser();
    
    const [gameBalance, setGameBalance] = useState(0);
    const { tokenBalance, update: refreshTokenBalance } = useTokenBalance("native", 18, chainId);
    const [depositLoading, setDepositLoading] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [depositList, setDepositList] = useState<any[]>([]);
    const [depositPage, setDepositPage] = useState(1);
    const [depositPageTotal, setDepositPageTotal] = useState(0);
    const [depositListLoading, setDepositListLoading] = useState(false);
    const [withdrawList, setWithdrawList] = useState<any[]>([]);
    const [withdrawPage, setWithdrawPage] = useState(1);
    const [withdrawPageTotal, setWithdrawPageTotal] = useState(0);
    const [withdrawListLoading, setWithdrawListLoading] = useState(false);
    const toast = useToast();
    const deposit = async (amount: string) => {
        setDepositLoading(true);
        if (!userInfo.address || !provider) {
            return;
        }
        if (Big(tokenBalance).lt(amount)) {
            toast.fail({ title: "Insufficient balance" });
            return;
        }

        try {
            setDepositLoading(true);
            const signer = provider.getSigner(userInfo.address);
            const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
            const value = ethers.utils.parseEther(amount);
            const tx = await contract.deposit(
                value,
                { value });
            const receipt = await tx.wait();
            if (receipt.status === 1) {
                toast.success({ title: "Deposit successful", tx: receipt.transactionHash });
            } else {
                toast.fail({ title: "Deposit failed" });
            }
        } catch (error) {
            toast.fail({ title: "Deposit failed" });
        } finally {
            setDepositLoading(false);
        }
    };

    const withdraw = async (amount: string) => {
        if (!userInfo.address) {
            return;
        }
        
        try {
            setWithdrawLoading(true);
            const res = await post('/game/euphoria/withdraw', {
                amount,
            })
            if (res.code === 200) {
                toast.success({ title: "Withdraw successful", });
            } else {
                toast.fail({ title: res.message || "Withdraw failed" });
            }
        } catch (e: any) {
            toast.fail({ title: e.message || "Withdraw failed" });
        } finally {
            setWithdrawLoading(false);
        }
    };

    const getUserInfo = async () => {
        const res = await get('/game/euphoria/user');
        if (res.code === 200) {
            setGameBalance(res.data.balance || 0);
        } else {
            toast.fail({ title: res.message || "Get user info failed" });
        }
    };

    const getDepositList = async ({ pageSize }: { pageSize: number }) => {
        if (depositListLoading) {
            return;
        }

        setDepositListLoading(true);
        const res = await get('/game/euphoria/user/deposits', {
            page: depositPage,
            page_size: pageSize || 10,
        });
        if (res.code === 200) {
            setDepositList(res.data.data || []);
            setDepositPageTotal(res.data.total_page || 0);
        } else {
            toast.fail({ title: res.message || "Get deposit list failed" });
        }
        setDepositListLoading(false);
    }

    const getWithdrawList = async ({ pageSize }: { pageSize: number }) => {

        if (withdrawListLoading) {
            return;
        }

        setWithdrawListLoading(true);
        const res = await get('/game/euphoria/user/withdrawals', {
            page: withdrawPage,
            page_size: pageSize || 10,
        });
        if (res.code === 200) {
            setWithdrawList(res.data.data || []);
            setWithdrawPageTotal(res.data.total_page || 0);
        } else {
            toast.fail({ title: res.message || "Get withdraw list failed" });
        }
        setWithdrawListLoading(false);
    }

    useEffect(() => {
        if (userInfo.address) {
            getUserInfo();
        }
    }, [userInfo]);

    useEffect(() => {
        if (!userInfo.address) {
            return;
        }

        const interval = setInterval(() => {
            getUserInfo();
            refreshTokenBalance();
        }, 10000); 

        return () => {
            clearInterval(interval);
        };
    }, [userInfo.address]);

    // useEffect(() => {
    //     if (account && depositPage) {
    //         getDepositList({  pageSize: 10 });
    //     }
    // }, [account, depositPage]);

    // useEffect(() => {
    //     if (account && withdrawPage) {
    //         getWithdrawList({ pageSize: 10 });
    //     }
    // }, [account, withdrawPage]);

    

    return {
        deposit,
        withdraw,
        refreshUserInfo: getUserInfo,
        tokenBalance,
        depositLoading,
        withdrawLoading,
        gameBalance,
        depositList,
        depositPage,
        setDepositPage,
        depositPageTotal,
        depositListLoading,
        withdrawList,
        withdrawPage,
        withdrawPageTotal,
        withdrawListLoading,
    };
}