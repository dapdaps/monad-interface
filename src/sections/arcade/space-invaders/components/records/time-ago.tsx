import { useTimeAgo } from "../../hooks/use-time-ago";

const TimeAgo = (props: any) => {
  const { date, className } = props;

  const { timeAgo } = useTimeAgo({ date });

  return (
    <div className={className}>{timeAgo}</div>
  );
};

export default TimeAgo;
