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
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M13.3 4.7l-2-2L4.7 9.3l2 2 6.6-6.6z" stroke="white" />
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