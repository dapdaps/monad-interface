import { useMemo, useRef, useState } from "react";
import useCustomAccount from "./use-account";
import { useRequest } from "ahooks";
import { INVITATION_CODE_LENGTH } from "@/sections/invitation/config";
import { useAnimate } from "framer-motion";

export function useInvitation<Invitation>() {
  const { account } = useCustomAccount();

  const [scopeLeftDoor, animateLeftDoor] = useAnimate();
  const [scopeRightDoor, animateRightDoor] = useAnimate();
  const [scopeCodePad, animateCodePad] = useAnimate();
  const [scopeInvitation, animateInvitation] = useAnimate();
  const doorTimer = useRef<any>();
  const containerTimer = useRef<any>();

  const [nft, setNft] = useState<any>(true);
  const [validInvitationCode, setValidInvitationCode] = useState<any>(false);
  const [invitationCode, setInvitationCode] = useState<string>("");

  const handleEnter = () => {
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
      }, 1200);
    });
  };

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
    return !!nft || !!validInvitationCode;
  }, [nft, account, validInvitationCode]);

  const handleInvitationCodeChange = (_invitationCode?: string) => {
    const _next = _invitationCode ?? "";
    setInvitationCode(_next.slice(0, INVITATION_CODE_LENGTH));
  };

  const handleInvitationCodeKeyboard = (_str?: string) => {
    setInvitationCode((_prev: string) => {
      const _next = (_prev ?? "") + (_str ?? "");
      if (_next.length > INVITATION_CODE_LENGTH) return _prev;
      return _next.slice(0, INVITATION_CODE_LENGTH);
    });
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
    await handleEnter();
    //TODO reload validUser
    setValidInvitationCode(true);
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

  return {
    nft,
    nftLoading,
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
  };
}

export interface Invitation {
  nft: any;
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
}
