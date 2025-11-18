import { create } from 'zustand';

export interface INotification {
  content: string;
  created_at: string;
  link: string;
  logo: string;
  title: string;
  unread: boolean;
}

interface INotificationStore {
  unread: number;
  setUnread: (unread: number) => void;
  list: INotification[];
  setList: (list: INotification[], options?: { hasMore?: boolean; isFirst?: boolean; }) => void;
  hasMore: boolean;
}

export const useNotificationStore = create<INotificationStore>((set) => ({
  unread: 0,
  setUnread: (unread) => set({ unread }),
  list: [],
  hasMore: true,
  setList: (list, options) => set((state) => {
    const { hasMore, isFirst } = options ?? {};

    let _list = state.list.slice();
    if (isFirst) {
      _list = list;
    } else {
      _list = [..._list, ...list];
    }

    return {
      ...state,
      list: _list,
      hasMore: hasMore ?? false,
    };
  }),
}));
