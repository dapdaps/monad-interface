"use client";

import {
  Realtime,
  TextMessage,
  MessageQueryDirection
  // @ts-ignore
} from "leancloud-realtime";
import LC from "leancloud-storage";
import { useEffect, useState, useRef } from "react";
import { useDebounceFn, useRequest } from 'ahooks';
import useUsersInfo from "../hooks/use-users-info";
import { redirect } from "next/navigation";
import { useTerminalStore } from '@/stores/terminal';
import useCustomAccount from '@/hooks/use-account';
import ChatCard from '@/sections/terminal/chat-v2/card';
import ChatHeader from '@/sections/terminal/chat-v2/header';
import ChatContent from '@/sections/terminal/chat-v2/content';
import ChatBg from '@/sections/terminal/chat-v2/bg';
import { FE_SYSTEM_KEY, VERSION } from '@/sections/terminal/config';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { POST_LIMIT_SECONDS, useLimit } from '@/sections/terminal/hooks/use-limit';
import Big from 'big.js';

const realtime = new Realtime({
  appId: process.env.NEXT_PUBLIC_LEANCLOUD_APP_ID!,
  appKey: process.env.NEXT_PUBLIC_LEANCLOUD_APP_KEY!,
  server: process.env.NEXT_PUBLIC_LEANCLOUD_SERVER_URL
});

LC.init({
  appId: process.env.NEXT_PUBLIC_LEANCLOUD_APP_ID!,
  appKey: process.env.NEXT_PUBLIC_LEANCLOUD_APP_KEY!,
  serverURL: process.env.NEXT_PUBLIC_LEANCLOUD_SERVER_URL
});

// Chat room ID
const CHAT_ROOM_ID = process.env.NEXT_PUBLIC_LEANCLOUD_ROOM_ID;

const START_TIMESTAMP = dayjs();

const SYSTEM_CHECK_MESSAGES = [
  {
    id: uuidv4(),
    timestamp: dayjs(START_TIMESTAMP),
    text: `NADSA COMMUNICATION SYSTEM v${VERSION}`,
    from: FE_SYSTEM_KEY,
  },
  {
    id: uuidv4(),
    timestamp: dayjs(START_TIMESTAMP).add(1, "seconds"),
    text: `INITIALIZING...`,
    from: FE_SYSTEM_KEY,
  },
  {
    id: uuidv4(),
    timestamp: dayjs(START_TIMESTAMP).add(2, "seconds"),
    text: `MEMORY CHECK: OK`,
    from: FE_SYSTEM_KEY,
  },
  {
    id: uuidv4(),
    timestamp: dayjs(START_TIMESTAMP).add(3, "seconds"),
    text: `COMMUNICATION ARRAY: ONLINE`,
    from: FE_SYSTEM_KEY,
  },
  {
    id: uuidv4(),
    timestamp: dayjs(START_TIMESTAMP).add(4, "seconds"),
    text: `ENCRYPTION MODULES: ACTIVE`,
    from: FE_SYSTEM_KEY,
  },
  {
    id: uuidv4(),
    timestamp: dayjs(START_TIMESTAMP).add(5, "seconds"),
    text: `SYSTEM READY`,
    from: FE_SYSTEM_KEY,
  },
  {
    id: uuidv4(),
    timestamp: dayjs(START_TIMESTAMP).add(6, "seconds"),
    text: `ESTABLISHING CONNECTION...`,
    from: FE_SYSTEM_KEY,
  },
];

export default function ChatView({ currentUser }: any) {
  const [messages, setMessages] = useState<TextMessage[]>([...SYSTEM_CHECK_MESSAGES]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const conversationRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMoreRef = useRef(true);
  const [onlineUsers, setOnlineUsers] = useState(0);

  const { account } = useCustomAccount();
  const { fetchUsersInfo } = useUsersInfo();
  const { limitProgress, currentUserLimit } = useLimit({ precision: 0, updateDuration: 300 });
  const setLimit = useTerminalStore((store) => store.setLimit);

  const { run: scrollToBottom } = useDebounceFn(() => {
    if (!messagesEndRef.current) {
      return;
    }
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, { wait: 300 });

  const fetchHistoryMessages = async (isFresh?: boolean) => {
    if (!conversationRef.current) {
      return;
    }

    // https://leancloud.github.io/js-realtime-sdk/docs/ChatRoom.html#queryMessages
    let options: any = {
      limit: 20,
      direction: MessageQueryDirection.NEW_TO_OLD
    };

    if (messages.length > 0 && !isFresh) {
      options.endMessageId = messages.filter((m) => m.from !== FE_SYSTEM_KEY)[0].id;
      options.endTime = messages.filter((m) => m.from !== FE_SYSTEM_KEY)[0].timestamp;
    }

    const historyMessages = await conversationRef.current.queryMessages(
      options
    );

    hasMoreRef.current = historyMessages.length >= 20;

    const sortedMessages = historyMessages.sort(
      (a: any, b: any) => a.timestamp - b.timestamp
    );

    await fetchUsersInfo(
      sortedMessages.map((message: TextMessage) => message.from)
    );

    setMessages((prevMessages) => {
      const nextMessages = [...prevMessages, ...sortedMessages] as TextMessage[];
      return [
        ...nextMessages.slice(0, SYSTEM_CHECK_MESSAGES.length),
        ...nextMessages.slice(SYSTEM_CHECK_MESSAGES.length - 1).sort((a: any, b: any) => a.timestamp - b.timestamp),
      ];
    });
  };

  const { run: fetchHistoryMessagesDebounced } = useDebounceFn(
    (e: any) => {
      const element = e.target as HTMLDivElement;
      if (element.scrollTop < 30 && hasMoreRef.current) {
        fetchHistoryMessages(false);
      }
    },
    {
      wait: 500
    }
  );

  useEffect(() => {
    if (!currentUser.address) {
      redirect("/chat/login");
    }

    let client: any;
    realtime
      .createIMClient(String(currentUser.address))
      .then(async (_client: any) => {
        client = _client;
        console.log("IM client created successfully");

        try {
          if (!CHAT_ROOM_ID) {
            throw Error("room not esit");
          }
          // Try to get the terminal room
          const existingConversation = await _client.getConversation(
            CHAT_ROOM_ID
          );
          console.log(
            "Chat room retrieved successfully:",
            existingConversation
          );
          if (!existingConversation) {
            throw new Error("Chat room not found");
          }
          return existingConversation;
        } catch (error) {
          console.error("Failed to get terminal room:", error);

          // Create a new terminal room if it doesn't exist
          console.log("Attempting to create a new terminal room");
          try {
            const newChatRoom = await _client.createChatRoom({
              name: "One Won Chat"
            });
            console.log("New terminal room created successfully:", newChatRoom.id);
            return newChatRoom;
          } catch (createError) {
            console.error("Failed to create terminal room:", createError);
            throw createError;
          }
        }
      })
      .then(async (chatroom: any) => {
        conversationRef.current = chatroom;
        console.log("conversationRef.current", conversationRef.current);
        console.log("Chat room connected successfully:", chatroom.id);

        try {
          // Join the terminal room
          await chatroom.join();
          console.log("Successfully joined the terminal room");
          setIsConnected(true);

          await fetchHistoryMessages(true);
          scrollToBottom();
          // Listen for new messages
          chatroom.on("message", (message: TextMessage) => {
            console.log("New message received:", message);
            setMessages((prev) => [...prev, message]);
          });

          chatroom.count().then((res: any) => {
            setOnlineUsers(res);
          });

          return chatroom;
        } catch (error) {
          console.error("Failed to join terminal room:", error);

          throw error;
        }
      })
      .catch((error: any) => {
        console.error("Chat room setup error:", error);
      });

    return () => {
      if (client) {
        client.close();
      }
    };
  }, [currentUser]);

  const { runAsync: sendMessage, loading: sending } = useRequest(async () => {
    if (
      !conversationRef.current ||
      !inputMessage.trim() ||
      !isConnected ||
      !currentUser.address
    ) {
      return;
    }

    try {
      console.log("Preparing to send message...");
      const message = new TextMessage(inputMessage);
      console.log("Message object created successfully:", message);

      const lastPostTime = dayjs();
      setLimit(account, { lastPostTime: lastPostTime.valueOf() });
      setMessages((prev) => [...prev, message, {
        timestamp: lastPostTime,
        type: "buffer",
        text: `BUFFER: ${0}%`,
        from: FE_SYSTEM_KEY,
        id: uuidv4(),
      }]);

      scrollToBottom();
      await conversationRef.current.send(message);
      console.log("Message sent successfully");

      setInputMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, { manual: true, throttleWait: 1000 });

  useEffect(() => {
    if (!currentUserLimit || !messages) return;
    const getCurrentBufferMessage = (_messages: any) => {
      return _messages.find((m: any) => dayjs(m.timestamp).valueOf() === currentUserLimit.lastPostTime && m.from === FE_SYSTEM_KEY);
    };
    const currentBufferMessage = getCurrentBufferMessage(messages);
    const currTime = Date.now();
    const diff = Math.max(currTime - currentUserLimit.lastPostTime, 0);
    if (!currentBufferMessage || (Big(diff).gt(Big(POST_LIMIT_SECONDS || 5).times(1000)) && /100%$/.test(currentBufferMessage.text))) {
      return;
    }

    setMessages((prev) => {
      const currentBUFFERMessage = getCurrentBufferMessage(prev);
      if (!currentBUFFERMessage) {
        return prev;
      }
      currentBUFFERMessage.text = `BUFFER: ${limitProgress}%`;
      return [...prev];
    });
  }, [currentUserLimit, limitProgress, messages]);

  return (
    <div className="relative w-full h-screen bg-[#010101] font-Pixelmix text-[#8D7CFF] text-[14px] font-[400] leading-[200%] overflow-y-auto cursor-pointer terminal">
      <ChatHeader currentUser={currentUser} onlineUsers={onlineUsers} />
      <ChatCard className="mt-[45px]">
        <ChatContent
          sendMessage={sendMessage}
          messages={messages}
          onScroll={fetchHistoryMessagesDebounced}
          messagesEndRef={messagesEndRef}
          currentUser={currentUser}
          setInputMessage={setInputMessage}
          inputMessage={inputMessage}
          scrollToBottom={scrollToBottom}
        />
      </ChatCard>
      <ChatBg />
    </div>
  );
}
