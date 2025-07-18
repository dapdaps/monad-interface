import { motion } from 'framer-motion';
import { useFaucetContext } from '../context';
import { useEffect, useMemo, useState } from 'react';

export default function EthBalance() {
    const { hasEhereumMainnetBalanceBalance, isEthereumMainnetBalanceLoading, refetchEthereumMainnetBalance } = useFaucetContext();

    return (
        <div className="flex items-center justify-between px-[15px] font-DogicaPixel bg-[#6D7EA524] mx-[25px] h-[38px] rounded-[4px] mt-[10px]">
            <div className="text-[#A6A6DB]">* Have 0.01 ETH and transaction history on Ethereum.</div>
            {
                hasEhereumMainnetBalanceBalance ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="10.5" fill="#78FEFF" stroke="black" />
                    <path d="M5 11.0435L9.33333 15L17 8" stroke="black" stroke-width="2" />
                </svg> : <motion.svg
                    onClick={() => {
                        refetchEthereumMainnetBalance()
                    }}
                    className="cursor-pointer"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={isEthereumMainnetBalanceLoading ? { rotate: 360 } : { rotate: 0 }}
                    transition={isEthereumMainnetBalanceLoading ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0 }}
                    style={{ originX: "50%", originY: "50%" }}
                >
                    <path d="M10.7365 18.7455C6.88414 18.7455 3.75 15.6543 3.75 11.8543C3.75 8.05504 6.88414 4.96387 10.7365 4.96387C11.9033 4.96387 13.0594 5.25391 14.0799 5.8024C14.5807 6.07225 14.7687 6.69809 14.4988 7.19953C14.2316 7.70184 13.606 7.88961 13.1024 7.61912C12.3813 7.23111 11.5637 7.02637 10.7365 7.02637C8.02131 7.02637 5.8125 9.19221 5.8125 11.8543C5.8125 14.5171 8.02131 16.683 10.7365 16.683C12.9816 16.683 14.9421 15.1958 15.5032 13.0669C15.6496 12.5165 16.2148 12.1886 16.7642 12.333C17.3146 12.4787 17.6437 13.0426 17.4987 13.5933C16.6969 16.6264 13.9162 18.7455 10.7365 18.7455Z" fill="#6D7EA5" />
                    <path d="M17.1708 8.74491L15.2531 3.84239C15.1199 3.50186 14.6648 3.43891 14.4444 3.73067L11.1225 8.12637C10.9021 8.41813 11.0866 8.83879 11.4506 8.87403L16.6904 9.38084C17.0374 9.41457 17.2977 9.06975 17.1708 8.74491Z" fill="#6D7EA5" />
                </motion.svg>
            }
        </div>
    )
}