import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInterval } from "ahooks";
import { useTerminalStore } from "@/stores/terminal";
import {
  FE_SYSTEM,
  FE_SYSTEM_KEY,
  START_DATE
} from "@/sections/terminal/config";
import { useChatStore } from "@/stores/chat";
import { uniqBy } from "lodash";
import Item from "@/sections/terminal/components/content/item";
import Level from "@/sections/terminal/components/content/level";
import { motion } from "framer-motion";
import ChatFooter from "./footer";
import useIsMobile from "@/hooks/use-isMobile";
import DisableMask from "./disable-mask";

const ChatContent = (props: any) => {
  const {
    className,
    sendMessage,
    messagesRef,
    messages,
    previousPageMessages,
    onScroll,
    messagesEndRef,
    currentUser,
    setInputMessage,
    inputMessage,
    scrollToBottom
  } = props;
  const terminalStore: any = useTerminalStore();
  const [remainTime, setRemainTime] = useState(0);
  const isMobile = useIsMobile();

  useInterval(
    () => {
      setRemainTime(remainTime - 300);
    },
    remainTime < 0 ? undefined : 300
  );

  const chatStore: any = useChatStore();
  const mergedMessages = useMemo(() => uniqBy(messages, "id"), [messages]);
  const mergedPreviousPageMessages = useMemo(
    () => uniqBy(previousPageMessages, "id"),
    [previousPageMessages]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const [displayedMessages, setDisplayedMessages] = useState<any>([]);
  const [displayedMessageIndex, setDisplayedMessageIndex] = useState<any>(0);
  const [displayedAllHistoryMessages, setDisplayedAllHistoryMessages] =
    useState<any>(false);

  useEffect(() => {
    if (displayedAllHistoryMessages) {
      if (mergedMessages.length - 1 > displayedMessageIndex) {
        const _displayedMessageIndex = displayedMessageIndex + 1;
        setDisplayedMessageIndex(_displayedMessageIndex);
        setDisplayedMessages((prev: any) => [
          ...prev,
          mergedMessages[_displayedMessageIndex]
        ]);
        setDisplayedAllHistoryMessages(false);
      }
    } else {
      // init
      if (displayedMessages.length <= 0 && mergedMessages?.length > 0) {
        setDisplayedMessageIndex(0);
        setDisplayedMessages([mergedMessages[0]]);
      }
    }
  }, [
    displayedMessages,
    mergedMessages,
    displayedAllHistoryMessages,
    displayedMessageIndex
  ]);

  useEffect(() => {
    if (!inputRef.current) return;
    if (remainTime < 0) {
      inputRef.current.focus();
      terminalStore.set({
        remainSeconds: 0
      });
    } else {
      inputRef.current.blur();
    }
  }, [remainTime, inputRef.current]);

  useEffect(() => {
    if (!terminalStore.remainSeconds) return;
    ``;
    setRemainTime(terminalStore.remainSeconds * 1000);
  }, [terminalStore.remainSeconds]);

  return (
    <div
      className={clsx(
        "w-full h-full p-[30px] md:p-0 relative md:flex md:flex-col md:items-stretch",
        className
      )}
    >
      <div className="px-[30px] md:pl-[15px] pt-[10px] md:pt-0 md:translate-y-[-24px]">
        <img
          src="/images/logo-white.svg"
          alt=""
          className="shrink-0 w-[129px] h-[55px] md:w-[88px] md:h-[37px] object-contain object-center"
        />
      </div>
      <div className="w-full h-[calc(100%_-_65px_-_100px)] absolute top-[80px] left-0 z-[10]">
        <DisableMask />
      </div>
      <div className="w-full h-[calc(100%_-_65px_-_51px)] blur-[10px] md:h-0 md:flex-1 pt-[25px] md:pt-0 pb-[15px] md:pb-0 md:translate-y-[-10px] ">
        <div
          ref={messagesRef}
          className="w-full h-full overflow-y-auto px-[30px] md:px-0 text-[!E7E2FF]"
          onScroll={(e) => {
            const element = e.target as HTMLDivElement;
            if (element.scrollTop < 5) {
              element.scrollTo({ top: 10, behavior: "smooth" });
            }
            onScroll?.(e);
          }}
          onDoubleClick={() => {
            inputRef.current?.focus();
          }}
        >
          {mergedPreviousPageMessages?.map((message: any, index: number) => (
            <Item
              key={`previousPage-${index}`}
              isTypewriter={false}
              roleColor="text-[#8D7CFF]"
              className="!text-[14px] md:px-[15px]"
              message={message}
              user={chatStore.users[message.from?.toLowerCase()]}
            />
          ))}
          {displayedMessages?.map?.((message: any, index: number) => (
            <Item
              key={index}
              isTypewriter={
                !(
                  message.from === FE_SYSTEM_KEY && message.type === "buffer"
                ) && !message.isSlient
              }
              roleColor="text-[#8D7CFF]"
              className="!text-[14px] md:px-[15px]"
              message={message}
              user={
                message.from === FE_SYSTEM_KEY
                  ? FE_SYSTEM
                  : chatStore.users[message.from?.toLowerCase()]
              }
              onAnimationComplete={() => {
                scrollToBottom();
                if (mergedMessages.length - 1 > displayedMessageIndex) {
                  const _displayedMessageIndex = displayedMessageIndex + 1;
                  setDisplayedMessageIndex(_displayedMessageIndex);
                  setDisplayedMessages((prev: any) => [
                    ...prev,
                    mergedMessages[_displayedMessageIndex]
                  ]);
                  return;
                }
                setDisplayedAllHistoryMessages(true);
              }}
            />
          ))}
          {remainTime > 0 && (
            <div className="relative md:px-[15px]">
              <Item
                isTypewriter={false}
                roleColor="text-[#8D7CFF]"
                className="!text-[14px]"
                message={{
                  timestamp: terminalStore?.postTime,
                  text: `BUFFER: ${(((5000 - remainTime) / 5000) * 100).toFixed(
                    0
                  )}%`
                }}
                user={FE_SYSTEM}
              />
              <motion.img
                src="/images/terminal/icon-target2.svg"
                alt=""
                className="absolute left-[280px] top-1/2 -translate-y-1/2 shrink-0 w-[36px] h-[36px] object-cover object-center"
                animate={{
                  opacity: [1, 0, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              />
            </div>
          )}
          {/* {!isMobile && (
            <CurrentUserInput
              currentUser={currentUser}
              inputRef={inputRef}
              remainTime={remainTime}
              sendMessage={sendMessage}
              setInputMessage={setInputMessage}
              inputMessage={inputMessage}
            />
          )} */}

          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* {isMobile && (
        <CurrentUserInput
          currentUser={currentUser}
          inputRef={inputRef}
          remainTime={remainTime}
          sendMessage={sendMessage}
          setInputMessage={setInputMessage}
          inputMessage={inputMessage}
          className="h-[56px] shrink-0 !items-start"
        />
      )} */}
      {!isMobile && <ChatFooter />}
    </div>
  );
};

export default ChatContent;

const CurrentUserInput = (props: any) => {
  const {
    className,
    currentUser,
    inputRef,
    remainTime,
    sendMessage,
    setInputMessage,
    inputMessage
  } = props;

  const [inputFocused, setInputFocused] = useState<any>(true);

  useEffect(() => {
    const handleFocus = () => {
      setInputFocused(true);
    };
    const handleBlur = () => {
      setInputFocused(false);
    };

    const input: any = inputRef.current;
    input?.addEventListener("focus", handleFocus);
    input?.addEventListener("blur", handleBlur);

    return () => {
      input?.removeEventListener("focus", handleFocus);
      input?.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div
      className={clsx(
        "flex items-center gap-[8px] text-[#0F1] md:border-t md:border-[#836EF9] md:border-dashed md:px-[15px]",
        className
      )}
    >
      <div className="shrink-0">
        [{currentUser.name}] <Level level={currentUser.level} />:
      </div>
      <>
        {!inputFocused && (
          <motion.div
            className="shrink-0 w-[1px] h-[16px] md:h-[15px] bg-[#0F1] md:translate-y-[6px]"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: [0, 1, 0]
            }}
            transition={{
              type: "none",
              repeat: Infinity,
              duration: 1
            }}
          />
        )}
        <textarea
          ref={inputRef}
          className="bg-transparent flex-1 w-0 text-[14px] text-[#0F1] placeholder:text-[#8D7CFF] resize-none h-[28px] border-0 outline-none md:h-full scrollbar-hide md:leading-[120%] md:pt-[5px]"
          autoFocus
          disabled={remainTime > 0}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage}
        />
      </>
    </div>
  );
};
