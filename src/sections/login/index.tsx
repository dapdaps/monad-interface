"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRequest } from 'ahooks';
import { useAccount, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { trim } from 'lodash';
import { useConnecting } from '@/hooks/use-connecting';
import { usePathname, useRouter } from 'next/navigation';

const LoginView = (props: any) => {
  const {} = props;

  const modal = useAppKit();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { walletConnecting } = useConnecting();
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState<any>(null);

  const [buttonText, buttonDisabled] = useMemo(() => {
    if (walletConnecting) {
      return ["Connecting...", true];
    }
    if (isConnected) {
      return ["Disconnect", false];
    }
    if (!trim(name || "")) {
      return ["Please Enter a Name", true];
    }
    return ["Connect Wallet to Login", false];
  }, [isConnected, walletConnecting, name]);

  const onNameChange = (val?: string) => {
    setName(val);
  };

  const { runAsync: onConnect } = useRequest(async () => {
    if (isConnected) {
      disconnect();
      return;
    }
    !address && modal.open();
  }, { manual: true });

  useEffect(() => {
    if (pathname === "/login") {
      return;
    }
    router.replace("/login");
  }, [pathname]);

  return (
    <div className="flex flex-col items-center pt-[158px]">
      <img src="/images/logo-white.svg" alt="" className="w-[147px] h-[40px] object-center object-contain shrink-0" />
      <img src="/images/login/icon-alert.svg" alt="" className="mt-[25px] w-[120px] h-[120px] object-center object-contain shrink-0" />
      <img src="/images/login/nadsa-terminnal-access.svg" alt="" className="mt-[33px] w-[445px] h-[22px] object-center object-contain shrink-0" />
      <div className="mt-[50px] w-[440px] shrink-0 flex flex-col items-center">
        <div className="shrink-0">
          Enter Name
        </div>
        <input
          type="text"
          disabled={walletConnecting}
          className="w-full h-[52px] disabled:!cursor-not-allowed disabled:opacity-30 shrink-0 rounded-[2px] border border-[#8645FF] bg-black text-center mt-[22px]"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={50}
        />
        <button
          type="button"
          className="mt-[26px] h-[52px] disabled:!cursor-not-allowed disabled:opacity-30 shrink-0 w-full rounded-[2px] bg-[#7B23FF] text-white text-center font-SpaceMono text-[16px] font-normal leading-[90%]"
          disabled={buttonDisabled}
          onClick={onConnect}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LoginView;
