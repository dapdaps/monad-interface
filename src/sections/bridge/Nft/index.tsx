import { useState } from 'react'
import chains from '../lib/util/chainConfig'

export default function Nft() {
    const [fromChain, setFromChain] = useState(chains[11155111])
    const [toChain, setToChain] = useState(chains[10143])


    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center text-[14px] justify-between">
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-[#4D4D73] border border-[#ACACE2] flex-1 opacity-[30%]">
                        <img src={fromChain.icon} className="w-6 h-6" />
                        <div className="text-white w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">{fromChain.chainName}</div>
                        <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="mx-4">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6.49996L11.5 6.49996M11.5 6.49996L6 11.9999M11.5 6.49996L6 0.999878" stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </div>

                    <div className="flex items-center gap-2 p-4 rounded-lg bg-[#4D4D73] border border-[#ACACE2] flex-1 opacity-[30%]">
                        <img src={toChain.icon} className="w-6 h-6" />
                        <div className="text-white w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">{toChain.chainName}</div>
                        <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                <div className='mt-2'>
                    <div className="text-[#A6A6DB] mb-2 text-[12px]">Select NFT</div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1].map((item) => (
                            <div key={item} className="relative flex flex-col items-center p-[8px] rounded-lg bg-[#FFFFFF0D]">
                                <div className="w-full aspect-square rounded-md bg-[#4D4F79] opacity-[30%]"></div>
                                <div className="mt-2 w-full h-[18px] bg-[#4D4F79] opacity-[30%]"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between text-[#A6A6DB] text-[12px]">
                        <span>Receive Address</span>
                        <div className="flex items-center gap-2">
                            <span className="text-white">0x3bC...AB717</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.5 2.4449C9.82831 2.4449 10.1534 2.51058 10.4567 2.63819C10.76 2.76581 11.0356 2.95286 11.2678 3.18866C11.4999 3.42446 11.6841 3.7044 11.8097 4.01249C11.9353 4.32057 12 4.65078 12 4.98426V6.50787H11V4.98426C11 4.58017 10.842 4.19263 10.5607 3.9069C10.2794 3.62116 9.89783 3.46064 9.5 3.46064H0.5C0.394083 3.46055 0.290931 3.42629 0.205416 3.36281C0.119901 3.29934 0.0564402 3.20991 0.0241835 3.10744C-0.00807318 3.00497 -0.00745955 2.89473 0.025936 2.79264C0.0593315 2.69054 0.123784 2.60185 0.21 2.53936L3.709 0L4.289 0.826816L2.059 2.4449H9.499H9.5ZM2.5 9.5551C2.1717 9.5551 1.84661 9.48942 1.54329 9.36181C1.23998 9.23419 0.964379 9.04714 0.732233 8.81134C0.500087 8.57554 0.315938 8.2956 0.190301 7.98751C0.0646644 7.67943 -1.53893e-09 7.34922 0 7.01574V5.49213H1V7.01574C1 7.41983 1.15804 7.80737 1.43934 8.0931C1.72064 8.37884 2.10218 8.53936 2.5 8.53936H11.5C11.6059 8.53945 11.7091 8.57371 11.7946 8.63719C11.8801 8.70066 11.9436 8.79009 11.9758 8.89256C12.0081 8.99504 12.0075 9.10527 11.9741 9.20736C11.9407 9.30946 11.8762 9.39815 11.79 9.46064L8.29 12L7.71 11.1732L9.94 9.5551H2.499H2.5Z" fill="#A6A6DB" />
                            </svg>
                        </div>
                    </div>
                </div>

                <button className="w-full p-4 mt-1 text-white rounded-lg bg-[#8B87FF] transition-colors opacity-[30%]">
                    Bridge
                </button>
            </div>
        </div>
    )
}