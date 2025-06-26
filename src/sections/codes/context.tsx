'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { ICodesContext } from './types';
import useInviteCodes from './hooks/use-invite-codes';
import useInviteRecords from './hooks/use-invite-records';
import { post } from '@/utils/http';
import useToast from '@/hooks/use-toast';
import { IMission, useMission } from './hooks/use-mission';

export const CodesContext = createContext<Partial<ICodesContext & IMission>>({});

function CodesContextProvider({ children }: { children: ReactNode; }) {
  const toast = useToast()
  const {
    loading: inviteCodesLoading,
    inviteCodes,
    tradeInviteCodes,
    handleGetInviteCodes
  } = useInviteCodes();
  const {
    missionData,
    missionLoading,
    getMissionData,
    lastTime,
    consecutiveList,
    currentRountCodes
  } = useMission();

  const [updater, setUpdater] = useState(0)
  const { loading: inviteRecordsLoading, inviteRecords } = useInviteRecords(updater)
  const [claimLoading, setClaimLoading] = useState<boolean>()
  const [showRuleModal, setShowRuleModal] = useState(false)

  async function handleClaim() {
    try {
      setClaimLoading(true)
      const result = await post("/invite/claim")
      toast.success({
        title: "Claim Successful!"
      })
      setUpdater(Date.now())
    } catch (error) {
      console.log(error)
      toast.fail({
        title: "Claim Failed!"
      })
    }
    setClaimLoading(false)
  }
  return (
    <CodesContext.Provider
      value={{
        showRuleModal,
        inviteCodes,
        inviteRecords,
        claimLoading,
        inviteCodesLoading,
        inviteRecordsLoading,
        handleClaim,
        setShowRuleModal,
        tradeInviteCodes,
        handleGetInviteCodes,

        // mission
        missionData,
        missionLoading,
        getMissionData,
        lastTime,
        consecutiveList,
        currentRountCodes
      }}
    >
      {children}
    </CodesContext.Provider>
  );
}

export default CodesContextProvider;

export function useCodesContext() {
  const context = useContext(CodesContext);

  return context as ICodesContext & IMission;
}
