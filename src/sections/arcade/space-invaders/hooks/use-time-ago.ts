import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function useTimeAgo({ date }: { date: string | dayjs.Dayjs }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = dayjs();
      const targetDate = dayjs(date);
      const diff = now.diff(targetDate, 'second');

      if (diff < 60) {
        // Within 1 minute, display "Xs ago"
        setTimeAgo(`${diff}s ago`);
      } else if (diff < 3600) {
        // Within 1 hour, display "Xmins ago"
        const minutes = Math.floor(diff / 60);
        setTimeAgo(`${minutes}min${minutes > 1 ? 's' : ''} ago`);
      } else if (diff < 86400) {
        // Within 1 day, display "Xhr ago"
        const hours = Math.floor(diff / 3600);
        setTimeAgo(`${hours}hr${hours > 1 ? 's' : ''} ago`);
      } else if (diff < 2592000) {
        // Within 1 month, display "Xd ago"
        const days = Math.floor(diff / 86400);
        setTimeAgo(`${days}d ago`);
      } else if (diff < 31536000) {
        // Within 1 year, display "Xmonth ago"
        const months = Math.floor(diff / 2592000);
        setTimeAgo(`${months}month${months > 1 ? 's' : ''} ago`);
      } else {
        // Over 1 year, display "X years ago"
        const years = Math.floor(diff / 31536000);
        setTimeAgo(`${years} year${years > 1 ? 's' : ''} ago`);
      }
    };

    // Update immediately
    updateTimeAgo();

    // If time difference is less than 1 minute, update every second
    const targetDate = dayjs(date);
    const diff = dayjs().diff(targetDate, 'second');
    if (diff < 60) {
      const interval = setInterval(updateTimeAgo, 1000);
      return () => clearInterval(interval);
    }
  }, [date]);

  return {
    timeAgo,
  };
}
