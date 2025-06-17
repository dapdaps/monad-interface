import { useEffect, useMemo, useRef, useState } from "react";
import useCustomAccount from "./use-account";
import { useRequest } from "ahooks";
import { INVITATION_CODE_LENGTH } from "@/sections/invitation/config";
import { useAnimate } from "framer-motion";
import { useNFT } from "./use-nft";
import { post } from "@/utils/http";
import useToast from "./use-toast";
import { useUserStore } from "@/stores/user";
import useUser from "./use-user";
import { trim } from "lodash";
import { useGuideStore } from "@/stores/guide";
import useIsMobile from "./use-isMobile";

export function useInvitation<Invitation>() {
  const { account, accountWithAk } = useCustomAccount();
  const { hasNFT, checking } = useNFT({ nftAddress: process.env.NEXT_PUBLIC_INDEX_NFT || '0xb46115299f13c731a99bcf9a57f0e9968071343e' });
  const toast = useToast();
  const userInfo = useUserStore((store: any) => store.user);
  const setUserInfo = useUserStore((store: any) => store.set);
  const userInfoLoading = useUserStore((store: any) => store.loading);
  const { getUserInfo } = useUser();
  const { getVisited, setVisible } = useGuideStore();
  const isMobile = useIsMobile();

  const [scopeLeftDoor, animateLeftDoor] = useAnimate();
  const [scopeRightDoor, animateRightDoor] = useAnimate();
  const [scopeCodePad, animateCodePad] = useAnimate();
  const [scopeInvitation, animateInvitation] = useAnimate();
  const doorTimer = useRef<any>();
  const containerTimer = useRef<any>();
  const guideTimer = useRef<any>();

  const [validInvitationCode, setValidInvitationCode] = useState<boolean>(false);
  const [invalidInvitationCode, setInvalidInvitationCode] = useState<boolean>(false);
  const [finalValid, setFinalValid] = useState<boolean>(false);
  const [invitationCode, setInvitationCode] = useState<string>("");

  const handleAccess = () => {
    if (!scopeLeftDoor.current || !scopeRightDoor.current || !scopeCodePad.current || !scopeInvitation.current || isMobile) return Promise.resolve(true);
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
        }, 2000);
        clearTimeout(doorTimer.current);
        guideTimer.current = setTimeout(() => {
          clearTimeout(guideTimer.current);
          const currentVisited = getVisited(account);
          if (!currentVisited) {
            setVisible(true);
          }
        }, 2000);
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

  const handleInvitationCodeBackspace = () => {
    setInvitationCode((_prev: string) => {
      if (_prev.length === 0) return "";
      return _prev.slice(0, _prev.length - 1);
    });
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
    setFinalValid(true);
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

  const { data: inviteTimestamp } = useRequest(async () => {
    if (!validUser || !accountWithAk) return;
    const res = await post("/invite/timestamp");
    if (res.code !== 200) {
      console.log('reportInviteTimestamp error: %o', res);
      return;
    }
    setUserInfo({ inviteTimestamp: res.data });
    return res.data;
  }, { refreshDeps: [validUser, accountWithAk] });

  useEffect(() => {
    if (validUser) {
      handleAccess().then(() => {
        setFinalValid(true);
      });
      return;
    }
    setFinalValid(false);
    setVisible(false);
  }, [validUser]);

  useEffect(() => {
    return () => {
      clearTimeout(doorTimer.current);
      clearTimeout(containerTimer.current);
      clearTimeout(guideTimer.current);
    };
  }, []);

  return {
    loading,
    hasNFT,
    nftLoading: checking,
    validUser,
    invitationCode,
    handleInvitationCodeChange,
    handleInvitationCodeBackspace,
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
  handleInvitationCodeBackspace: () => void;
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
