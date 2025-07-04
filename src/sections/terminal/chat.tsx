"use client";

import Header from "./components/header";
import Content from "./components/content";
import Footer from "./components/footer";
import {
  Realtime,
  TextMessage,
  MessageQueryDirection
} from "leancloud-realtime";
import LC from "leancloud-storage";
import { useEffect, useState, useRef } from "react";
import { useDebounceFn } from "ahooks";
import useUsersInfo from "./hooks/use-users-info";
import { redirect } from "next/navigation";
import { useTerminalStore } from "@/stores/terminal";
import useCustomAccount from "@/hooks/use-account";

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

export default function ChatView({ currentUser }: any) {
  const [messages, setMessages] = useState<TextMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const conversationRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMoreRef = useRef(true);
  const [onlineUsers, setOnlineUsers] = useState(0);

  const { account } = useCustomAccount();
  const { fetchUsersInfo } = useUsersInfo();
  const setLimit = useTerminalStore((store: any) => store.setLimit);

  const { run: scrollToBottom } = useDebounceFn(
    () => {
      if (!messagesEndRef.current) {
        return;
      }
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    },
    { wait: 300 }
  );

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
      options.endMessageId = messages[0].id;
      options.endTime = messages[0].timestamp;
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

    setMessages([...sortedMessages, ...messages] as TextMessage[]);
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
            console.log(
              "New terminal room created successfully:",
              newChatRoom.id
            );
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

  const sendMessage = async () => {
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

      setMessages((prev) => [...prev, message]);

      scrollToBottom();
      await conversationRef.current.send(message);
      console.log("Message sent successfully");

      setInputMessage("");
      setLimit(account, { lastPostTime: Date.now() });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[2] flex flex-col h-screen w-screen overflow-hidden pt-[36px] bg-[#010101] font-SpaceMono cursor-pointer terminal">
      <Header currentUser={currentUser} />
      <Content
        sendMessage={sendMessage}
        messages={messages}
        onScroll={fetchHistoryMessagesDebounced}
        messagesEndRef={messagesEndRef}
        currentUser={currentUser}
        setInputMessage={setInputMessage}
        inputMessage={inputMessage}
        scrollToBottom={scrollToBottom}
      />
      <Footer onlineUsers={onlineUsers} />
    </div>
  );
}
