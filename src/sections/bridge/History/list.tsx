import { useStatus } from '../Hooks/Stargate/useStatus'
import { useState } from 'react'
import { icons } from '@/configs/chains'
import { formatEnglishDate } from '@/utils/date'
import useIsMobile from '@/hooks/use-isMobile';
import chains from '../lib/util/chainConfig'

import allTokens from '../lib/allTokens'
import { tokenPairs } from '../lib/bridges/stargate/config'
import { balanceFormated } from '@/utils/balance';

const _allTokens: any = {};

Object.keys(allTokens).forEach((chainId: string) => {
    allTokens[Number(chainId)].forEach((item: any) => {
        _allTokens[Number(chainId)] = _allTokens[Number(chainId)] || {}
        _allTokens[Number(chainId)][item.symbol.toUpperCase()] = item
    })
})


export default function History({ pendingCount, historyCount, list, setIsOpen, activeTab, setActiveTab }: { pendingCount: number, historyCount: number, list: any[], setIsOpen: (isOpen: boolean) => void, activeTab: string, setActiveTab: (tab: string) => void }) {
    const isMobile = useIsMobile();

    const filteredList = list.filter((item: any) =>
        activeTab === 'pending' ? Number(item.bridge_status) !== 4 : Number(item.bridge_status) === 4
    )

    const cls = isMobile
        ? 'm-auto md:w-[92.307vw] border border-[#000] rounded-2xl bg-[#FFFDEB]'
        : 'fixed bottom-[-10px] w-[350px] right-24 z-50 bg-[url("/images/bridge/history-bg.svg")] bg-no-repeat bg-top'

    return (
        <div className={cls}>
            <div className="relative p-4">
                <div className="absolute top-[30px] cursor-pointer right-[30px]" onClick={() => setIsOpen(false)}>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_31923_1683)">
                            <path d="M8.73205 2C7.96225 0.666666 6.03775 0.666668 5.26795 2L1.80385 8C1.03405 9.33334 1.9963 11 3.5359 11L10.4641 11C12.0037 11 12.966 9.33333 12.1962 8L8.73205 2Z" fill="#BFFF60" />
                        </g>
                        <path d="M4.83494 1.75C5.79719 0.0833349 8.20281 0.0833318 9.16506 1.75L12.6292 7.75C13.5914 9.41667 12.3886 11.5 10.4641 11.5L3.5359 11.5C1.6114 11.5 0.408585 9.41667 1.37084 7.75L4.83494 1.75Z" stroke="black" />
                        <defs>
                            <filter id="filter0_i_31923_1683" x="0.531494" y="0" width="12.937" height="12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="-2" dy="-2" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_31923_1683" />
                            </filter>
                        </defs>
                    </svg>
                </div>
                <div className="flex gap-3 p-[10px] text-[#fff] mr-[30px] text-[14px]">
                    <div
                        className={`flex flex-1 justify-center items-center gap-2 h-[18px] cursor-pointer text-center border-r border-[#958FBC4D]  ${activeTab === 'pending' ? 'text-[rgba(191, 255, 96, 1)]' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        <span>{pendingCount} Pending</span>
                    </div>

                    <div
                        className={`flex flex-1 justify-center items-center gap-2 h-[18px] cursor-pointer text-center border-r border-[#958FBC4D] p ${activeTab === 'history' ? 'text-[rgba(191, 255, 96, 1)]' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <span>{historyCount} History</span>
                    </div>
                </div>

                <div className="max-h-[600px] overflow-y-auto">
                    {filteredList.map((item: any) => (
                        <HistoryItem item={item} key={item.tx_id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function HistoryItem({ item }: { item: any }) {
    const action_tokens = JSON.parse(item.action_tokens)
    const fromToken = _allTokens[item.chain_id][action_tokens[0].toUpperCase()]
    let toToken = _allTokens[item.to_chain_id]?.[tokenPairs[item.chain_id]?.[action_tokens[0].toUpperCase()]?.toUpperCase()]




    // console.log(_allTokens[item.chain_id], action_tokens)

    return <div className="border-b border-gray-200 py-3">
        <div className="flex justify-between items-center">
            <div className='flex-1'>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-[30px] h-[30px] relative">
                            <img className='w-full h-full object-contain' src={fromToken?.icon} />
                            <img className='w-[10px] h-[10px] object-contain border border-[#000] rounded-full absolute bottom-0 right-0' src={chains[item.chain_id].icon} />
                        </div>
                        <div>
                            {balanceFormated(item.action_amount)}<br />{fromToken?.symbol}
                        </div>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-2">
                        <div className="w-[30px] h-[30px] relative">
                            <img className='w-full h-full object-contain' src={toToken?.icon} />
                            <img className='w-[10px] h-[10px] object-contain border border-[#000] rounded-full absolute bottom-0 right-0' src={chains[item.to_chain_id].icon} />
                        </div>
                        <div>
                            {balanceFormated(item.action_amount)}<br />{toToken?.symbol}
                        </div>
                    </div>
                </div>
                <div className="text-sm text-gray-500 flex justify-between items-center">
                    <div>
                        {formatEnglishDate(new Date(item.create_time).getTime())}
                        {
                            <a target='_blank' href={`${chains[item.chain_id].blockExplorers}/tx/${item.tx_id}`} className="ml-2 text-blue-500 underline">Tx</a>
                        }
                    </div>
                    <div>
                        {Number(item.bridge_status) !== 4 && <span className="text-[#006BFF]">Processing~3min</span>}
                        {Number(item.bridge_status) === 4 && <span className="text-[#006BFF]">Success</span>}
                    </div>
                </div>
            </div>

        </div>
    </div>
}