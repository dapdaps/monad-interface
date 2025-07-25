import clsx from "clsx";
import { useStakeContext } from "../../context";

const CommonWithdraw = (props: any) => {
  const { className } = props;

  const { } = useStakeContext();

  return (
    <div className={clsx("", className)}>
      Withdraw
    </div>
  );
};

export default CommonWithdraw;
