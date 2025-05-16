import Item from "./item";
import { uniqBy } from "lodash";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useChatStore } from "@/stores/chat";
import Level from "./level";
import { motion } from "framer-motion";
import { useLimit } from '@/sections/terminal/hooks/use-limit';
import Big from 'big.js';

export default function Content({
  messages,
  sendMessage,
  onScroll,
  messagesEndRef,
  currentUser,
  setInputMessage,
  inputMessage,
  scrollToBottom
}: any) {
  const chatStore: any = useChatStore();
  const { limitProgress } = useLimit();
  const mergedMessages = useMemo(() => uniqBy(messages, "id"), [messages]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [displayedMessages, setDisplayedMessages] = useState<any>([]);
  const [displayedMessageIndex, setDisplayedMessageIndex] = useState<any>(0);
  const [displayedAllHistoryMessages, setDisplayedAllHistoryMessages] = useState<any>(false);
  const [inputFocused, setInputFocused] = useState<any>(true);

  useEffect(() => {
    if (displayedAllHistoryMessages) {
      if (mergedMessages.length - 1 > displayedMessageIndex) {
        const _displayedMessageIndex = displayedMessageIndex + 1;
        setDisplayedMessageIndex(_displayedMessageIndex);
        setDisplayedMessages((prev: any) => [...prev, mergedMessages[_displayedMessageIndex]]);
      }
    } else {
      // init
      if (displayedMessages.length <= 0 && mergedMessages?.length > 0) {
        setDisplayedMessageIndex(0);
        setDisplayedMessages([mergedMessages[0]]);
      }
    }
  }, [displayedMessages, mergedMessages, displayedAllHistoryMessages]);

  useEffect(() => {
    const handleFocus = () => {
      setInputFocused(true);
    };
    const handleBlur = () => {
      setInputFocused(false);
    };

    const input: any = inputRef.current;
    input?.addEventListener('focus', handleFocus);
    input?.addEventListener('blur', handleBlur);

    return () => {
      input?.removeEventListener('focus', handleFocus);
      input?.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;
    if (Big(limitProgress || 100).gte(100)) {
      inputRef.current.focus();
    }
  }, [limitProgress, inputRef.current]);

  return (
    <div
      className="mx-[50px] h-[calc(100%-100px)] overflow-y-auto"
      onScroll={onScroll}
      onDoubleClick={() => {
        inputRef.current?.focus();
      }}
    >
      {displayedMessages?.map((message: any, index: number) => (
        <Item
          key={index}
          message={message}
          user={chatStore.users[message.from.toLowerCase()]}
          onAnimationComplete={() => {
            scrollToBottom();
            if (mergedMessages.length - 1 > displayedMessageIndex) {
              const _displayedMessageIndex = displayedMessageIndex + 1;
              setDisplayedMessageIndex(_displayedMessageIndex);
              setDisplayedMessages((prev: any) => [...prev, mergedMessages[_displayedMessageIndex]]);
              return;
            }
            setDisplayedAllHistoryMessages(true);
          }}
        />
      ))}

      <div className="flex items-center gap-[8px] text-[16px] leading-[200%] text-white">
        <div className="shrink-0">
          [{currentUser.name}] <Level level={currentUser.level} />:
        </div>

        {(!currentUser.level || currentUser.level?.includes("NGMI")) &&
        !currentUser?.role ? (
          <span className="text-[#FFBF49]">
            You don’t have chat permission, you will be able to chat wen 5 txns
            on testnet
          </span>
        ) : (
          <>
            {
              !inputFocused && (
                <motion.div
                  className="shrink-0 w-[1px] h-[24px] bg-white"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    type: "none",
                    repeat: Infinity,
                    duration: 1,
                  }}
                />
              )
            }
            <input
              ref={inputRef}
              className="bg-transparent flex-1"
              autoFocus
              disabled={Big(limitProgress || 100).lt(100)}
              placeholder={Big(limitProgress || 100).lt(100) ? `Signal reconnecting ${limitProgress}%` : ""}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
            />
          </>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
