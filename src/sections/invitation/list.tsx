"use client";

import { useInvitationContext } from "@/context/invitation";
import useCustomAccount from "@/hooks/use-account";
import { useEffect } from "react";

const InvitationListView = (props: any) => {
  const { } = props;

  const { account } = useCustomAccount();

  const {
    invitationList,
    getInvitationList,
    getInvitationListLoading,
  } = useInvitationContext();
  
  useEffect(() => {
    getInvitationList();
  }, [account]);

  return (
    <div className="p-4">
      <h1>Invitation List Page</h1>
    </div>
  );
};

export default InvitationListView;
