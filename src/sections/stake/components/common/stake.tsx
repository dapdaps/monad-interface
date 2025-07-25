import clsx from "clsx";
import { useStakeContext } from "../../context";

const CommonStake = (props: any) => {
  const { className } = props;

  const { } = useStakeContext();

  return (
    <div className={clsx("", className)}>
      Stake
    </div>
  );
};

export default CommonStake;
