"use client";

import { useMemo } from "react";
import Button from "@/components/button";
import clsx from "clsx";
import useClickTracking from "@/hooks/use-click-tracking";

const LoginView = (props: any) => {
  const { logining } = props;
  const { handleReport } = useClickTracking()

  const [buttonText, buttonDisabled] = useMemo(() => {
    if (logining) {
      return ["Binding...", true];
    }

    return ["Connect X to access", false];
  }, [logining]);

  return (
    <LoginContainer>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center h-[calc(80vh)] pb-[100px]">
          <img
            src="/images/logo-white.svg"
            alt=""
            className="w-[129px] h-[55px] object-center object-contain shrink-0"
          />
          <img
            src="/images/terminal/icon-alert.gif"
            alt=""
            className="mt-[25px] w-[120px] h-[120px] md:w-[72px] md:h-[72px] object-center object-contain shrink-0"
          />
          <img
            src="/images/login/nadsa-terminnal-access.svg"
            alt=""
            className="mt-[33px] w-[445px] h-[22px] md:w-[90%] object-center object-contain shrink-0"
          />
          <div className="mt-[50px] w-[440px] md:w-[77%] shrink-0 flex flex-col items-center">
            <Button
              className="mt-[26px] h-[52px] font-Pixelmix disabled:!cursor-not-allowed disabled:opacity-30 shrink-0 w-full rounded-[2px] text-white text-center text-[16px] md:text-[14px] leading-[90%]"
              disabled={buttonDisabled}
              onClick={() => {
                handleReport("1006-001")
                window.open(
                  `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=ZzZNZEw5UWdyQWRNMlU5UHRlRVE6MTpjaQ&redirect_uri=${
                    window.location.origin + window.location.pathname
                  }&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`,
                  "_blank"
                );
              }}
              bgColor="#7663F4"
              loading={logining}
            >
              {buttonText}
            </Button>
          </div>
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
        "cursor-pointer terminal fixed top-0 left-0 w-full h-screen bg-[#010101] text-center text-[#7B23FF] font-SpaceMono text-[18px] font-normal leading-[90%]",
        className
      )}
    >
      <video
        className="w-full h-[272px] md:h-[136px] absolute top-0 left-0 z-[1] object-fill rotate-180 pointer-events-none"
        autoPlay
        loop
        muted
        poster="/images/login/bg-top.png"
      >
        <source src="/images/login/bg-grid.webm" type="video/webm" />
      </video>
      <video
        className="w-full h-[460px] md:h-[200px] absolute bottom-0 left-0 z-[1] object-fill pointer-events-none"
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
