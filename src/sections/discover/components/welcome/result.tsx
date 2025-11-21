import { useEffect, useMemo, useState } from "react";
import WelcomeTypewriter from "./typewriter";
import { useRouter } from "next-nprogress-bar";
import Big from "big.js";
import { numberFormatter } from "@/utils/number-formatter";
import { useWelcomeContext } from "./context";
import { useNftStore } from "@/stores/nft";

const WelcomeResult = (props: any) => {
  const { bonus } = props;

  const router = useRouter();
  const { setShareOpen } = useWelcomeContext();
  const { setWelcomeOpen } = useNftStore();

  const [showMessages, setShowMessages] = useState<any>([]);

  const totalRP = useMemo(() => {
    let sum = Big(0);
    const bonusList = Object.entries(bonus ?? {});
    bonusList.forEach(([key, value]) => {
      if (!/_rp$/.test(key)) {
        return;
      }
      sum = sum.plus(Big(value as number));
    });
    return sum;
  }, [bonus]);

  useEffect(() => {
    let timer: any = null;
    const insertMessage = (index: number) => {
      setShowMessages((prev: any) => [
        ...prev,
        {
          ...Messages[index],
          timestamp: Date.now(),
        }
      ]);
      if (index + 1 <= Messages.length - 1) {
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
    <div className="w-full flex justify-between gap-[10px] mt-[10px] pl-[34px] pr-[24px]">
      <div className="w-0 flex-1">
        {
          showMessages.map((message: any, index: any) => {
            let suffix = (
              <div className="text-[20px]">{numberFormatter(totalRP, 2, true)} RP</div>
            );
            if (index === 1) {
              suffix = (
                <button
                  type="button"
                  onClick={() => {
                    router.push("/rank");
                    setWelcomeOpen?.(false);
                  }}
                  className="underline"
                >
                  [RANKING]
                </button>
              );
            }
            return (
              <MessageItem
                key={index}
                message={message}
                suffix={suffix}
              />
            );
          })
        }
      </div>
      <div className="shrink-0 flex justify-end items-center gap-[6px]">
        <button
          type="button"
          className="h-[32px] border border-[#BFFF60] flex justify-center items-center px-[11px] text-[14px] text-[#BFFF60] font-[400]"
          onClick={() => {
            setShareOpen?.({ open: true, type: "share" });
          }}
        >
          SHARE
        </button>
        <button
          type="button"
          className="h-[32px] border border-[#BFFF60] flex justify-center items-center px-[10px] text-[14px] text-[#BFFF60] font-[400]"
          onClick={() => {
            setShareOpen?.({ open: true, type: "download" });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 0V8.5M6.5 8.5L2 4M6.5 8.5L11 4M0 11.5H13" stroke="#BFFF60" stroke-width="1.6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WelcomeResult;

const MessageItem = (props: any) => {
  const { message, suffix } = props;

  const [typeComplete, setTypeComplete] = useState(false);

  return (
    <div className="flex gap-[5px]">
      <WelcomeTypewriter
        message={message}
        className="text-[#8D7CFF] !w-[unset]"
        onAnimationComplete={() => {
          setTypeComplete(true);
        }}
      />
      {typeComplete && suffix}
    </div>
  );
};

const Messages = [
  {
    text: "CONGRATZ! YOU”VE EARNED A TOTAL OF",
    role: "SYSTEM",
    timestamp: Date.now(),
  },
  {
    text: "CHECK YOUR RANK NOW AT",
    role: "SYSTEM",
    timestamp: Date.now(),
  },
];
