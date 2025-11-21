import { useEffect, useMemo, useState } from "react";
import WelcomeTypewriter from "./typewriter";
import { BoosterItems } from "@/sections/ranking/config";

interface WelcomeLoadingProps {
  progress?: number;
}

const WelcomeLoading = (props: WelcomeLoadingProps) => {
  const { progress = 0 } = props;

  const [showMessages, setShowMessages] = useState<any>([]);

  useEffect(() => {
    let timer: any = null;
    const insertMessage = (index: number) => {
      setShowMessages((prev: any) => [
        ...prev,
        {
          ...LoadingMessages[index],
          timestamp: Date.now(),
        }
      ]);
      if (index + 1 <= LoadingMessages.length - 1) {
        timer = setTimeout(() => {
          clearTimeout(timer);
          insertMessage(index + 1);
        }, 500);
      }
    };

    insertMessage(0);

    return () => {
      clearTimeout(timer);
      setShowMessages([]);
    };
  }, []);

  return (
    <div className="w-full px-[24px] mt-[170px]">
      <div className="w-full border-t border-b border-dashed border-[#6750FF] py-[10px]">
        <div className="w-full h-[222px] p-[14px_23px_12px] bg-black/50 border-t border-b border-dashed border-[#6750FF]">
          {
            showMessages.map((message: any, index: any) => {
              return (
                <WelcomeTypewriter
                  key={index}
                  message={index === 6 ? { ...message, text: `STATUS_${progress}%...` } : message}
                  className="text-[#8D7CFF]"
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default WelcomeLoading;

const LoadingMessages = [
  {
    text: "ONBOARDING PROCESS INTIATED...",
    role: "SYSTEM",
    timestamp: Date.now(),
  },
  {
    text: "SCANNING WALLET FOR FILES DROP...",
    role: "SYSTEM",
    timestamp: Date.now(),
  },
  ...BoosterItems.map((item, index) => {
    let charStyle = [[...new Array(21).fill(0)].map(() => ({ color: "#BFFF60" }))];
    if (index === 1) {
      charStyle = [[...new Array(18).fill(0)].map(() => ({ color: "#BFFF60" }))];
    }
    if (index === 2) {
      charStyle = [[...new Array(17).fill(0)].map(() => ({ color: "#BFFF60" }))];
    }
    return {
      text: `[${item.label}] DETECTED!`,
      role: "SYSTEM",
      timestamp: Date.now(),
      charStyle,
    };
  }),
  {
    text: "DOWNLOADING RESPECTED FILES...",
    role: "SYSTEM",
    timestamp: Date.now(),
  },
  {
    text: `STATUS_${0}%...`,
    role: "SYSTEM",
    timestamp: Date.now(),
    charStyle: [[{}, {}, {}, {}, {}, {}, {}, { color: "#BFFF60" }, { color: "#BFFF60" }, { color: "#BFFF60" }, { color: "#BFFF60" }]],
  },
];
