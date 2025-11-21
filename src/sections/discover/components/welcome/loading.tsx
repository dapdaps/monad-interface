import { useEffect, useMemo, useState } from "react";
import WelcomeTypewriter from "./typewriter";
import { BoosterItems } from "@/sections/ranking/config";

interface WelcomeLoadingProps {
  progress?: number;
  bonus?: any;
}

const loadingDuration = 1000;

const WelcomeLoading = (props: WelcomeLoadingProps) => {
  const { progress = 0, bonus } = props;

  console.log("bonus: %o", bonus);

  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [showMessages, setShowMessages] = useState<any>([]);

  useEffect(() => {
    let timer: any = null;
    let completedTimer: any = null;
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
        return;
      }
      completedTimer = setTimeout(() => {
        clearTimeout(completedTimer);
        setLoadingCompleted(true);
      }, loadingDuration);
    };

    insertMessage(0);

    return () => {
      clearTimeout(timer);
      clearTimeout(completedTimer);
      setShowMessages([]);
    };
  }, []);

  useEffect(() => {
    if (!bonus || !loadingCompleted) {
      return;
    }

    const hasNFT = Object.values(bonus || {}).some((it: any) => it === true);
    const detectedMessages = hasNFT ? DetectedMessages : NotFoundMessages;
    let timer: any = null;

    const insertMessage = (index: number) => {
      const curr: any = detectedMessages[index];
      if (curr.bonusKey) {
        if (!bonus[curr.bonusKey]) {
          if (index + 1 <= detectedMessages.length - 1) {
            timer = setTimeout(() => {
              clearTimeout(timer);
              insertMessage(index + 1);
            }, 500);
          }
          return;
        }
      }
      setShowMessages((prev: any) => [
        ...prev,
        {
          ...detectedMessages[index],
          timestamp: Date.now(),
        }
      ]);
      if (index + 1 <= detectedMessages.length - 1) {
        timer = setTimeout(() => {
          clearTimeout(timer);
          insertMessage(index + 1);
        }, 500);
      }
    };

    insertMessage(0);

    return () => {
      clearTimeout(timer);
    };
  }, [bonus, loadingCompleted]);

  return (
    <div className="w-full px-[24px] mt-[170px]">
      <div className="w-full border-t border-b border-dashed border-[#6750FF] py-[10px]">
        <div className="w-full h-[222px] p-[14px_23px_12px] bg-black/50 border-t border-b border-dashed border-[#6750FF]">
          {
            showMessages.map((message: any, index: any) => {
              return (
                <WelcomeTypewriter
                  key={index}
                  message={message.isProgress ? { ...message, text: `STATUS_${progress}%...` } : message}
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
];

const DetectedMessages = [
  ...BoosterItems.map((item, index) => {
    let charStyle = [[...new Array(27).fill(0)].map(() => ({ color: "#BFFF60", textTransform: "uppercase" }))];
    if (index === 1) {
      charStyle = [[...new Array(18).fill(0)].map(() => ({ color: "#BFFF60", textTransform: "uppercase" }))];
    }
    if (index === 2) {
      charStyle = [[...new Array(17).fill(0)].map(() => ({ color: "#BFFF60", textTransform: "uppercase" }))];
    }
    return {
      text: `[${item.label}] DETECTED!`,
      role: "SYSTEM",
      timestamp: Date.now(),
      charStyle,
      bonusKey: item.key,
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
    isProgress: true,
  },
];

const NotFoundMessages = [
  {
    text: "No assets found",
    role: "SYSTEM",
    timestamp: Date.now(),
    charStyle: [[...new Array(15).fill(0)].map(() => ({ color: "#FF7260", textTransform: "uppercase" }))],
  },
  {
    text: "WALLET IS INELIGIBLE FOR FILES DROP",
    role: "SYSTEM",
    timestamp: Date.now(),
    charStyle: [[...[...new Array(10).fill(0)].map(() => ({})), ...[...new Array(25).fill(0)].map(() => ({ color: "#FF7260", textTransform: "uppercase" }))]],
  },
  {
    text: "TERMINAL WILL CLOSE IN 10S...",
    role: "SYSTEM",
    timestamp: Date.now(),
  },
];
