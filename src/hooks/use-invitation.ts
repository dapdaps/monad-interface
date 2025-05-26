import { useMemo, useState } from "react";
import useCustomAccount from "./use-account";
import { useRequest } from "ahooks";

export function useInvitation<Invitation>() {
  const { account } = useCustomAccount();

  const [nft, setNft] = useState<any>(true);
  const [invitationCode, setInvitationCode] = useState<string>();

  const { loading: nftLoading } = useRequest(async () => {
    const mockReq = () => new Promise((resolve) => {
      const timer = setTimeout(() => {
        const result = false;
        resolve(result);
        setNft(result);
      }, 1000);

      return () => clearTimeout(timer);
    });
    const res = await mockReq();
    return res;
  }, { refreshDeps: [account] });

  const validUser = useMemo(() => {
    if (!account) return false;
    return !!nft;
  }, [nft, account]);

  const handleInvitationCodeChange = (_invitationCode?: string) => {
    setInvitationCode(_invitationCode);
  };

  const { runAsync: submitInvitationCode, loading: submitInvitationCodeLoading } = useRequest(async () => {
    const mockReq = () => new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.log("submitInvitationCode", invitationCode);
        resolve(true);
        setInvitationCode("");
      }, 1000);

      return () => clearTimeout(timer);
    });
    const res = await mockReq();
    return res;
  }, { manual: true });

  return {
    nft,
    nftLoading,
    validUser,
    invitationCode,
    handleInvitationCodeChange,
    submitInvitationCode,
    submitInvitationCodeLoading,
  };
}

export interface Invitation {
  nft: any;
  nftLoading: boolean;
  validUser: boolean;
  invitationCode?: string;
  handleInvitationCodeChange: (invitationCode?: string) => void;
  submitInvitationCode: () => Promise<any>;
  submitInvitationCodeLoading: boolean;
}
