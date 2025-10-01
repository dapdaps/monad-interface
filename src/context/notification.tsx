import GuessWhoNotification from "@/components/notification/guess-who";
import { useGuessWho } from "@/hooks/use-guess-who";
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export enum NotificationType {
  GuessWho = 1,
}

export interface INotification {
  id: string;
  type: NotificationType;
  data?: any;
}

interface INotificationContext {
  queue: INotification[];
  add: (notification: INotification) => void;
  update: (notification: Pick<INotification, "id" | "data">) => void;
  remove: (id: string) => void;
}

const NotificationContext = createContext<Partial<INotificationContext>>({});

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [queue, setQueue] = useState<INotification[]>([]);

  const add = (notification: INotification) => {
    setQueue((prev) => {
      const _queue = prev.slice();
      const currNotification = _queue.find((item) => item.id === notification.id);
      if (currNotification) {
        currNotification.data = {
          ...currNotification.data,
          ...notification.data,
        };
      } else {
        _queue.push(notification);
      }
      return _queue;
    });
  };

  const update = (notification: Pick<INotification, "id" | "data">) => {
    setQueue((prev) => {
      const _queue = prev.slice();
      const currNotification = _queue.find((item) => item.id === notification.id);
      if (currNotification) {
        currNotification.data = {
          ...currNotification.data,
          ...notification.data,
        };
      }
      return _queue;
    });
  };

  const remove = (id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const { data, onClose } = useGuessWho({ queue, update, remove });

  return (
    <NotificationContext.Provider
      value={{
        queue,
        add,
        update,
        remove,
      }}
    >
      {children}

      <GuessWhoNotification
        open={data.open}
        onClose={onClose}
        room={data.room}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
