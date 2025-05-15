import Item from "./item";
import { uniqBy } from "lodash";
import { useMemo } from "react";

export default function Content({
  messages,
  sendMessage,
  onScroll,
  messagesEndRef,
  chatStore
}: any) {
  const mergedMessages = useMemo(() => uniqBy(messages, "id"), [messages]);

  return (
    <div className="mx-[50px] h-[calc(100%-100px)]" onScroll={onScroll}>
      {mergedMessages.map((message: any, index) => (
        <Item
          key={index}
          message={message}
          user={chatStore.users[message.from]}
        />
      ))}

      <div className="flex gap-[8px] text-[16px] leading-[200%] text-white">
        <div className="shrink-0">[{chatStore.name}][✿]:</div>
        <input
          className="bg-transparent"
          autoFocus
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}
