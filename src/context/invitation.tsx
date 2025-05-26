'use client';

import { createContext, ReactNode, useContext } from 'react';
import { Invitation, useInvitation } from '@/hooks/use-invitation';

export const InvitationContext = createContext<Invitation>({} as Invitation);

function InvitationContextProvider({ children }: { children: ReactNode; }) {
  const invitation = useInvitation();

  return (
    <InvitationContext.Provider value={{ ...invitation }}>
      {children}
    </InvitationContext.Provider>
  );
}

export default InvitationContextProvider;

export const useInvitationContext = () => {
  return useContext(InvitationContext);
}
