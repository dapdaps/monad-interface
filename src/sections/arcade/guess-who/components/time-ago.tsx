import { useTimeAgo } from "@/hooks/use-time-ago";

const TimeAgo = (props: any) => {
  const { record, className } = props;

  const { timeAgo } = useTimeAgo({ date: record.create_time * 1000 });

  return (
    <div className={className}>
      {timeAgo}
    </div>
  );
};

export default TimeAgo;
