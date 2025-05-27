import { useChatStore } from "@/stores/chat";
import { get } from "@/utils/http";
import { uniq } from "lodash";

export default function useUsersInfo() {
  const chatStore: any = useChatStore();

  const fetchUsersInfo = async (users: string[], opts?: { from?: string }) => {
    const { from } = opts ?? {};
    console.log("reload users from :%o", from);
    const needFetchUsers = users.filter((user) => {
      if (!chatStore.users[user]) return true;
      return (
        chatStore.users[user].fetched_time < Date.now() - 1000 * 60 * 60 * 24
      );
    });
    if (needFetchUsers.length === 0) return;
    const usersInfo = await get(
      `/twitter/user/list?twitter_user_ids=${[...uniq(needFetchUsers)].join(
        ","
      )}`
    );

    const formattedUsers = usersInfo.data?.reduce(
      (acc: Record<string, any>, user: any) => {
        acc[user.twitter_user_id] = {
          name: user.twitter_user_name,
          id: user.twitter_user_id
        };
        return acc;
      },
      {}
    );
    chatStore.setUsers(formattedUsers);
  };

  return { fetchUsersInfo, users: chatStore.users };
}
