import { useLogin, usePrivy } from "@privy-io/react-auth";
import React, { useEffect, useState } from "react";

export default function PrivyLogin() {
    const { user, createWallet } = usePrivy();
    const { login } = useLogin();
    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        if (user && !user.wallet) {
            createWallet();
        }
    }, [user]);

    const handleLogin = async () => {
        setLoginLoading(true);

        try {
            login();
            setLoginLoading(false);
        } catch (err) {
            console.log("Problem logging in: ", err);
            setLoginLoading(false);
        }
    };

    const [address, setAddress] = useState("");

    useEffect(() => {
        if (!user) {
            setAddress("");
            return;
        }

        const [privyUser] = user.linkedAccounts.filter(
            (account) =>
                account.type === "wallet" &&
                account.walletClientType === "privy"
        );
        if (!privyUser || !(privyUser as any).address) {
            setAddress("");
            return;
        }

        setAddress((privyUser as any).address);
    }, [user]);

    if (user && user.wallet) {
        return null;
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center absolute top-0 left-0 z-20">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12">
                <h1 className="text-[42px] font-HackerNoonV2 text-[#E7E2FF] mb-6 text-center drop-shadow-lg tracking-widest">
                    WELCOME TO GAMING HUB
                </h1>
                <p className="text-[18px] font-Montserrat text-white text-center mt-[40px] w-[888px] leading-[150%]">
                    You'll need to generate a new game account - your personal vault for rewards, scores, and progress. Let's gear up and dive in.
                </p>
                <img src="/images/game/create-btn.svg" onClick={handleLogin} className="w-[260px] h-[50px] m-auto mt-[60px] cursor-pointer" />
            </div>
        </div>
    );
}