import { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import WelcomeTypewriter from "./typewriter";
import { useRouter } from "next-nprogress-bar";
import Big from "big.js";
import { numberFormatter } from "@/utils/number-formatter";
import { useWelcomeContext } from "./context";
import { useNftStore } from "@/stores/nft";
import React from "react";
import { EWelcomeStatus } from "./config";

const WelcomeDownloadTerminal = (props: any, ref: any) => {
  const { bonusList, downloadedBonusList } = props;

  const router = useRouter();
  const { setShareOpen, setStatus } = useWelcomeContext();
  const { setWelcomeOpen } = useNftStore();

  const messagesRef = useRef<any>(null);
  const messagesTimerRef = useRef<any>(null);

  const [showMessages, setShowMessages] = useState<any>([]);

  const [totalRP, totalBoost, downloadedCount] = useMemo(() => {
    let sum = Big(0);
    let boost = Big(0);
    downloadedBonusList.forEach((item: any) => {
      sum = sum.plus(Big(item.rp));
      boost = boost.plus(Big(item.boost));
    });
    return [sum, boost, downloadedBonusList?.length || 0];
  }, [downloadedBonusList]);

  const [totalCount] = useMemo(() => {
    return [
      bonusList?.length || 0,
    ];
  }, [bonusList]);

  const scrollToBottom = () => {
    clearTimeout(messagesTimerRef.current);
    messagesTimerRef.current = null;
    messagesTimerRef.current = setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
      clearTimeout(messagesTimerRef.current);
      messagesTimerRef.current = null;
    }, 300);
  };

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
      clearTimeout(messagesTimerRef.current);
      messagesTimerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (downloadedCount <= 0) {
      return;
    }
    setShowMessages((prev: any) => {
      const next = [...prev];
      const currIndex = next.findIndex((it: any) => it.key === "totalRP");
      const nextRP = numberFormatter(totalRP, 2, true);
      const nextBoost = numberFormatter(totalBoost, 2, true);
      const nextText = `CONGRATZ! YOU”VE EARNED A TOTAL OF ${nextRP} RP, boost ${nextBoost}x`;
      const totalMessage = {
        key: "totalRP",
        text: nextText,
        role: "SYSTEM",
        timestamp: Date.now(),
        charStyle: [[...new Array(nextText.length).fill(0)].map((_, idx) => {
          let startIdx = 34;
          if (idx <= startIdx) {
            return {};
          }
          startIdx = startIdx + nextRP.length + 3;
          if (idx <= startIdx) {
            return { color: "#BFFF60", fontSize: "18px" };
          }
          startIdx = startIdx + 8;
          if (idx <= startIdx) {
            return {};
          }
          startIdx = startIdx + nextBoost.length + 1;
          if (idx <= startIdx) {
            return { color: "#BFFF60", fontSize: "18px" };
          }
        })],
      }
      if (currIndex > -1) {
        // next.splice(currIndex, 1);
      }
      return [...next, totalMessage];
    });
    scrollToBottom();
  }, [downloadedCount]);

  useEffect(() => {
    if (downloadedCount <= 0 || downloadedCount !== totalCount) {
      return;
    }
    setStatus?.(EWelcomeStatus.OPENED);
    setShowMessages((prev: any) => {
      const next = [...prev];
      const nextText = `CHECK YOUR RANK NOW AT `;
      const rankLinkMessage = {
        key: "rankLink",
        text: nextText,
        role: "SYSTEM",
        timestamp: Date.now(),
      }
      return [...next, rankLinkMessage];
    });
    scrollToBottom();
  }, [downloadedCount, totalCount]);

  const refs = {
    onDownload: (bonu: any) => {
      setShowMessages((prev: any) => [
        ...prev,
        {
          text: `DOWNLOADING ${bonu.name}.exe...`,
          role: "SYSTEM",
          timestamp: Date.now(),
        },
      ]);
      scrollToBottom();
    },
  };
  useImperativeHandle(ref, () => refs);

  return (
    <div className="w-full h-[70px] flex justify-between gap-[10px] mt-[10px] pl-[34px] pr-[24px]">
      <div ref={messagesRef} className="w-0 h-full overflow-y-auto flex-1">
        {
          showMessages.map((message: any, index: any) => {
            let suffix = null;
            if (message.key === "rankLink") {
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
      {
        downloadedCount > 0 && (
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
        )
      }
    </div>
  );
};

export default React.forwardRef(WelcomeDownloadTerminal);

const MessageItem = (props: any) => {
  const { message, suffix } = props;

  const [typeComplete, setTypeComplete] = useState(false);

  return (
    <div className="flex gap-[5px] uppercase">
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
    text: "Clicke to download the FILes...",
    role: "SYSTEM",
    timestamp: Date.now(),
  },
];

