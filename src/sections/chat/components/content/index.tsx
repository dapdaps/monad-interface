import Item from "./item";
import { uniqBy } from "lodash";
import { useMemo, useRef } from "react";
import { useChatStore } from "@/stores/chat";
import Level from "./level";

export default function Content({
  messages,
  sendMessage,
  onScroll,
  messagesEndRef,
  currentUser,
  setInputMessage,
  inputMessage
}: any) {
  const chatStore: any = useChatStore();
  const mergedMessages = useMemo(() => uniqBy(messages, "id"), [messages]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="mx-[50px] h-[calc(100%-100px)] overflow-y-auto"
      onScroll={onScroll}
      onDoubleClick={() => {
        inputRef.current?.focus();
      }}
    >
      {mergedMessages.map((message: any, index) => (
        <Item
          key={index}
          message={message}
          user={chatStore.users[message.from.toLowerCase()]}
        />
      ))}

      <div className="flex gap-[8px] text-[16px] leading-[200%] text-white">
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
          <input
            ref={inputRef}
            className="bg-transparent"
            autoFocus
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            onChange={(e) => setInputMessage(e.target.value)}
            value={inputMessage}
          />
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
