import { useChatStore } from "@/stores/chat";
import { get } from "@/utils/http";
import { uniq } from "lodash";

export default function useUsersInfo() {
  const chatStore: any = useChatStore();

  const fetchUsersInfo = async (users: string[]) => {
    const needFetchUsers = users.filter((user) => {
      if (!chatStore.users[user]) return true;
      return (
        chatStore.users[user].fetched_time <
        Date.now() - 1000 * 60 * 60 * 24 * 7
      );
    });
    if (needFetchUsers.length === 0) return;
    const usersInfo = await get(
      `/chat/user/list?address=${[...uniq(needFetchUsers)].join(",")}`
    );

    const formattedUsers = usersInfo.data.reduce(
      (acc: Record<string, any>, user: any) => {
        acc[user.address.toLowerCase()] = user;
        return acc;
      },
      {}
    );
    chatStore.set({ users: formattedUsers });
  };

  return { fetchUsersInfo, users: chatStore.users };
}
