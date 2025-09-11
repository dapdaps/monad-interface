import { usePrivyAuth } from "@/hooks/use-privy-auth";
import React, { useEffect, useState } from "react";
import { Captcha } from '@privy-io/react-auth';
import { createPortal } from "react-dom";

export default function PrivyLogin() {
  const { address, handleLogin, isLogin } = usePrivyAuth({ isBind: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLogin) {
    return null;
  }

  const content = (
    <div className="h-[100dvh] w-full flex items-center justify-center bg-cover bg-center absolute top-0 left-0 z-20">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 md:px-3 md:py-3">
        <h1 className="text-[42px] md:text-[9.74vw] font-HackerNoonV2 text-[#E7E2FF] mb-6 text-center drop-shadow-lg tracking-widest">
          WELCOME TO ARCADE
        </h1>
        <p className="text-[18px] font-Montserrat text-white text-center mt-[40px] w-[888px] leading-[150%] md:w-full">
          You'll need to generate a new game account - your personal vault for rewards, scores, and progress. Let's gear up and dive in.
        </p>
        <img data-bp="1009-001" src="/images/game/create-btn.svg" onClick={handleLogin} className="w-[260px] h-[50px] m-auto mt-[60px] cursor-pointer hover:scale-110 transition-transform duration-200" />
        <Captcha />
      </div>
    </div>
  );

  return mounted ? createPortal(content, document.body) : null;
}