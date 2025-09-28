import { useState } from 'react'
import { useStatus } from '../Hooks/Stargate/useStatus'
import List from './list'
import Simple from './simple'
import { useAccount } from 'wagmi'
import useIsMobile from '@/hooks/use-isMobile'
import { useHistory } from '../Hooks/useHistory'

export default function History({ activeTab, setActiveTab, isOpen, setIsOpen, getStatus }: { activeTab: string, setActiveTab: (tab: string) => void, isOpen: boolean, setIsOpen: (isOpen: boolean) => void, getStatus: any }) {
    const { pendingCount, historyCount, list } = useStatus({
        getStatus,
    })
    const { address, chainId } = useAccount()
    const isMobile = useIsMobile();

    if (!address) {
        return null
    }

    const cls = isMobile 
    ? 'm-auto mt-[10px] md:w-[92.307vw] border border-[#9892C0] bg-[#2B294A]' 
    : 'fixed bottom-[0px] w-[350px] right-[220px] z-50 bg-[url("/images/bridge/history-bg.svg")] bg-no-repeat bg-top'
    
    return (
        <div className={cls}>
            {
                isOpen && historyCount > 0 ? 
                <List setIsOpen={setIsOpen} activeTab={activeTab} setActiveTab={setActiveTab} pendingCount={pendingCount} historyCount={historyCount} list={list} /> : 
                <Simple setActiveTab={setActiveTab} setIsOpen={setIsOpen} pendingCount={pendingCount} historyCount={historyCount} />
            }
        </div>
    )
}

