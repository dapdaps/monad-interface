"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounceFn, useRequest } from "ahooks";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { trim } from "lodash";
import Button from "@/components/button";
import clsx from "clsx";

const LoginView = (props: any) => {
  const { onUpdateName, updating, logining } = props;

  const modal = useAppKit();
  const { address, isConnected, isConnecting } = useAccount();

  const [name, setName] = useState<any>(null);
  const [connecting, setConnecting] = useState<boolean>(true);

  const [buttonText, buttonDisabled] = useMemo(() => {
    if (connecting) {
      return ["Connecting...", true];
    }

    if (!isConnected) {
      return ["Connect Wallet to Login", false];
    }

    if (!trim(name || "") && !logining) {
      return ["Please Enter a Name", true];
    }
    return ["Login", false];
  }, [isConnected, connecting, name, logining]);

  const onNameChange = (val?: string) => {
    setName(val);
  };

  const { runAsync: onConnect } = useRequest(
    async () => {
      if (!address) {
        modal.open();
        return;
      }
      if (!name) return;
      onUpdateName(name);
    },
    { manual: true }
  );

  const { run: closeConnecting, cancel: cancelCloseConnecting } = useDebounceFn(
    () => {
      setConnecting(false);
    },
    { wait: 10000 }
  );

  useEffect(() => {
    cancelCloseConnecting();
    if (!isConnecting) {
      setConnecting(false);
      return;
    }
    setConnecting(true);
    closeConnecting();
  }, [isConnecting]);

  return (
    <LoginContainer>
      <div className="flex flex-col items-center pt-[158px]">
        <img
          src="/images/logo-white.svg"
          alt=""
          className="w-[147px] h-[40px] object-center object-contain shrink-0"
        />
        <img
          src="/images/login/icon-alert.svg"
          alt=""
          className="mt-[25px] w-[120px] h-[120px] object-center object-contain shrink-0"
        />
        <img
          src="/images/login/nadsa-terminnal-access.svg"
          alt=""
          className="mt-[33px] w-[445px] h-[22px] object-center object-contain shrink-0"
        />
        <div className="mt-[50px] w-[440px] shrink-0 flex flex-col items-center">
          {isConnected && !logining && (
            <>
              <div className="shrink-0">Enter Name</div>
              <input
                type="text"
                className="w-full h-[52px] shrink-0 rounded-[2px] border border-[#8645FF] bg-black text-center mt-[22px]"
                value={name || ""}
                onChange={(e) => onNameChange(e.target.value)}
                maxLength={50}
              />
            </>
          )}
          <Button
            className="mt-[26px] h-[52px] disabled:!cursor-not-allowed disabled:opacity-30 shrink-0 w-full rounded-[2px] text-white text-center font-SpaceMono text-[16px] font-normal leading-[90%]"
            disabled={buttonDisabled}
            onClick={onConnect}
            bgColor="#7B23FF"
            loading={updating || (address && logining)}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </LoginContainer>
  );
};

export default LoginView;

export const LoginContainer = (props: any) => {
  const { className, contentClassName, children } = props;

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-screen bg-[#010101] text-center text-[#7B23FF] font-SpaceMono text-[18px] font-normal leading-[90%]",
        className
      )}
    >
      <video
        className="w-full h-[272px] absolute top-0 left-0 z-[1] object-fill rotate-180 pointer-events-none"
        autoPlay
        loop
        muted
        poster="/images/login/bg-top.png"
      >
        <source src="/images/login/bg-grid.webm" type="video/webm" />
      </video>
      <video
        className="w-full h-[460px] absolute bottom-0 left-0 z-[1] object-fill pointer-events-none"
        autoPlay
        loop
        muted
        poster="/images/login/bg-bot.png"
      >
        <source src="/images/login/bg-grid.webm" type="video/webm" />
      </video>
      <div className={clsx("w-full h-full relative z-[2]", contentClassName)}>
        {children}
      </div>
    </div>
  );
};
