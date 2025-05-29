'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { ICodesContext } from './types';
import useInviteCodes from './hooks/use-invite-codes';
import useInviteRecords from './hooks/use-invite-records';
import { post } from '@/utils/http';
import useToast from '@/hooks/use-toast';

export const CodesContext = createContext<Partial<ICodesContext>>({});

function CodesContextProvider({ children }: { children: ReactNode; }) {
  const toast = useToast()
  const {
    loading: inviteCodesLoading,
    inviteCodes
  } = useInviteCodes()
  const { loading: inviteRecordsLoading, inviteRecords } = useInviteRecords()
  const [claimLoading, setClaimLoading] = useState()

  async function handleClaim() {
    try {
      setClaimLoading(true)
      const result = await post("/invite/claim")
      if (result.code === 0) {
        toast.success({
          title: "Claim Successful!"
        })
      } else {
        toast.fail({
          title: "Claim Failed!"
        })
      }
    } catch (error) {
      console.log(error)
    }
    setClaimLoading(false)
  }
  return (
    <CodesContext.Provider
      value={{
        inviteCodes,
        inviteRecords,
        claimLoading,
        inviteCodesLoading,
        inviteRecordsLoading,
        handleClaim
      }}
    >
      {children}
    </CodesContext.Provider>
  );
}

export default CodesContextProvider;

export function useCodesContext() {
  const context = useContext(CodesContext);

  return context as ICodesContext;
}
