import clsx from 'clsx';
import { POST_LIMIT_SECONDS, useLimit } from '@/sections/terminal/hooks/use-limit';
import { useEffect, useMemo, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useInterval, useRequest } from 'ahooks';
import { FE_SYSTEM, FE_SYSTEM_KEY, START_DATE } from '@/sections/terminal/config';
import { useChatStore } from '@/stores/chat';
import { uniqBy } from 'lodash';
import Big from 'big.js';
import Item from '@/sections/terminal/components/content/item';
import Level from '@/sections/terminal/components/content/level';
import { motion } from 'framer-motion';

const ChatContent = (props: any) => {
  const {
    className,
    sendMessage,
    messages,
    onScroll,
    messagesEndRef,
    currentUser,
    setInputMessage,
    inputMessage,
    scrollToBottom,
  } = props;

  const [currentTime, setCurrentTime] = useState(dayjs());
  const { data: currentDay } = useRequest(async () => {
    return dayjs(currentTime).diff(START_DATE, "day");
  }, { refreshDeps: [currentTime] });

  useInterval(() => {
    setCurrentTime(dayjs());
  }, 1000);

  const chatStore: any = useChatStore();
  const { limitProgress, currentUserLimit } = useLimit({ precision: 0 });
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
        setDisplayedAllHistoryMessages(false);
      }
    } else {
      // init
      if (displayedMessages.length <= 0 && mergedMessages?.length > 0) {
        setDisplayedMessageIndex(0);
        setDisplayedMessages([mergedMessages[0]]);
      }
    }
  }, [displayedMessages, mergedMessages, displayedAllHistoryMessages, displayedMessageIndex]);

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
    <div className={clsx("w-full h-full p-[30px] relative flex flex-col justify-between items-stretch", className)}>
      <div className="px-[30px] pt-[10px]">
        <img src="/images/logo-pixel.svg" alt="" className="shrink-0 w-[129px] h-[55px] object-contain object-center" />
      </div>
      <div
        className="flex-1 h-0 overflow-y-auto px-[30px] py-[15px] text-[!E7E2FF]"
        onScroll={onScroll}
        onDoubleClick={() => {
          inputRef.current?.focus();
        }}
      >
        {displayedMessages?.map?.((message: any, index: number) => (
          <Item
            key={index}
            isTypewriter={!(message.from === FE_SYSTEM_KEY && message.type === "buffer")}
            roleColor="text-[#8D7CFF]"
            className="!text-[14px]"
            message={message}
            user={message.from === FE_SYSTEM_KEY ? FE_SYSTEM : chatStore.users[message.from.toLowerCase()]}
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
        <div className="flex items-center gap-[8px] text-[#0F1]">
          <div className="shrink-0">
            [{currentUser.name}] <Level level={currentUser.level} />:
          </div>

          <>
            {
              !inputFocused && (
                <motion.div
                  className="shrink-0 w-[1px] h-[16px] bg-[#0F1]"
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
              className="bg-transparent flex-1 text-[14px] text-[#0F1] placeholder:text-[#8D7CFF]"
              autoFocus
              disabled={Big(limitProgress || 100).lt(100)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
            />
          </>
        </div>
        {/*{
          Big(limitProgress || 100).lt(100) && (
            <div className="relative">
              <Item
                isTypewriter={false}
                roleColor="text-[#8D7CFF]"
                className="!text-[14px]"
                message={{
                  timestamp: currentUserLimit?.lastPostTime,
                  text: `BUFFER: ${limitProgress}%`,
                }}
                user={FE_SYSTEM}
              />
              <motion.img
                src="/images/terminal/icon-target2.svg"
                alt=""
                className="absolute left-[280px] top-1/2 -translate-y-1/2 shrink-0 w-[36px] h-[36px] object-cover object-center"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </div>
          )
        }*/}
        <div ref={messagesEndRef} />
      </div>
      <div className="shrink-0 flex justify-between items-center px-[30px] pt-[10px] pb-[16px] border-t border-dashed border-[#836EF9] text-[12px] font-Pixelmix text-[#8D7CFF] leading-[200%]">
        <div className="">
          MONADVERSE: DAY {currentDay} {dayjs(currentTime).format("HH:mm:ss")}
        </div>
        <div className="">
          SIGNAL DELAY: {POST_LIMIT_SECONDS}s
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
