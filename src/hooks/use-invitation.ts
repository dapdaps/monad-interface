import { useEffect, useMemo, useRef, useState } from "react";
import useCustomAccount from "./use-account";
import { useRequest } from "ahooks";
import { INVITATION_CODE_LENGTH } from "@/sections/invitation/config";
import { useAnimate } from "framer-motion";
import { nftAddress, useNFT } from "./use-nft";
import { post } from "@/utils/http";
import useToast from "./use-toast";
import { useUserStore } from "@/stores/user";
import useUser from "./use-user";
import { trim } from "lodash";

export function useInvitation<Invitation>() {
  const { account } = useCustomAccount();
  const { hasNFT, checking } = useNFT({ nftAddress: nftAddress });
  const toast = useToast();
  const userInfo = useUserStore((store: any) => store.user);
  const userInfoLoading = useUserStore((store: any) => store.loading);
  const { getUserInfo } = useUser();

  const [scopeLeftDoor, animateLeftDoor] = useAnimate();
  const [scopeRightDoor, animateRightDoor] = useAnimate();
  const [scopeCodePad, animateCodePad] = useAnimate();
  const [scopeInvitation, animateInvitation] = useAnimate();
  const doorTimer = useRef<any>();
  const containerTimer = useRef<any>();

  const [validInvitationCode, setValidInvitationCode] = useState<boolean>(false);
  const [invalidInvitationCode, setInvalidInvitationCode] = useState<boolean>(false);
  const [finalValid, setFinalValid] = useState<boolean>(false);
  const [invitationCode, setInvitationCode] = useState<string>("");

  const handleAccess = () => {
    animateLeftDoor(scopeLeftDoor.current, {
      x: "-100%",
    }, {
      duration: 1,
      ease: "easeInOut",
    });
    animateRightDoor(scopeRightDoor.current, {
      x: "100%",
    }, {
      duration: 1,
      ease: "easeInOut",
    });
    animateCodePad(scopeCodePad.current, {
      y: "100%",
    }, {
      duration: 1,
      ease: "easeInOut",
    });
    return new Promise((resolve) => {
      doorTimer.current = setTimeout(() => {
        animateInvitation(scopeInvitation.current, {
          scale: 10,
          opacity: 0,
        }, {
          duration: 3,
          ease: "easeInOut",
        });
        containerTimer.current = setTimeout(() => {
          clearTimeout(containerTimer.current);
          resolve(true);
        }, 3000);
        clearTimeout(doorTimer.current);
      }, 1100);
    });
  };

  const validUser = useMemo(() => {
    if (!account) return false;
    return !!hasNFT || !!validInvitationCode || !!userInfo?.invite_active;
  }, [hasNFT, account, validInvitationCode, userInfo]);

  const handleInvitationCodeChange = (_invitationCode?: string) => {
    const _next = _invitationCode ?? "";
    setInvitationCode(trim(_next).slice(0, INVITATION_CODE_LENGTH));
    setInvalidInvitationCode(false);
  };

  const handleInvitationCodeKeyboard = (_str?: string) => {
    setInvitationCode((_prev: string) => {
      const _next = (_prev ?? "") + (_str ?? "");
      if (_next.length > INVITATION_CODE_LENGTH) return _str || "";
      return _next.slice(0, INVITATION_CODE_LENGTH);
    });
    setInvalidInvitationCode(false);
  };

  const { runAsync: submitInvitationCode, loading: submitInvitationCodeLoading } = useRequest(async () => {
    if (!invitationCode) return;
    const res = await post("/invite/active", { code: invitationCode });
    if (res.code !== 200) {
      toast.fail({
        title: res.message || "Invalid Invitation Code",
      });
      setInvalidInvitationCode(true);
      return;
    }
    getUserInfo();
    setValidInvitationCode(true);
    await handleAccess();
    return res;
  }, { manual: true });

  const { runAsync: getInvitationList, loading: getInvitationListLoading, data: invitationList } = useRequest(async () => {
    if (!account) return [];
    const mockReq = () => new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  }, { manual: true });

  const loading = useMemo(() => {
    return userInfoLoading || checking;
  }, [userInfoLoading, checking]);

  useEffect(() => {
    if (validUser) {
      handleAccess().then(() => {
        setFinalValid(true);
      });
    }
  }, [validUser]);

  return {
    loading,
    hasNFT,
    validUser,
    invitationCode,
    handleInvitationCodeChange,
    handleInvitationCodeKeyboard,
    submitInvitationCode,
    submitInvitationCodeLoading,
    getInvitationList,
    getInvitationListLoading,
    invitationList,
    scopeLeftDoor,
    scopeRightDoor,
    scopeCodePad,
    scopeInvitation,
    finalValid,
    invalidInvitationCode,
  };
}

export interface Invitation {
  loading: boolean;
  hasNFT: boolean;
  nftLoading: boolean;
  validUser: boolean;
  invitationCode?: string;
  handleInvitationCodeChange: (invitationCode?: string) => void;
  handleInvitationCodeKeyboard: (str?: string) => void;
  submitInvitationCode: () => Promise<any>;
  submitInvitationCodeLoading: boolean;
  getInvitationList: () => Promise<any>;
  getInvitationListLoading: boolean;
  invitationList: any;
  scopeLeftDoor: any;
  scopeRightDoor: any;
  scopeCodePad: any;
  scopeInvitation: any;
  finalValid: boolean;
  invalidInvitationCode: boolean;
}
