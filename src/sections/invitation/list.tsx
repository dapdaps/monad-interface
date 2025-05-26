import useCustomAccount from "@/hooks/use-account";
import { useInvitation } from "@/hooks/use-invitation";
import { useEffect } from "react";

const InvitationListView = (props: any) => {
  const { } = props;

  const { account } = useCustomAccount();

  const {
    invitationList,
    getInvitationList,
    getInvitationListLoading,
  } = useInvitation();
  
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
