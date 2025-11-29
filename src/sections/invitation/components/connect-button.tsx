import Button from "./button";
import useCustomAccount from "@/hooks/use-account";
import { formatLongText } from "@/utils/utils";
import clsx from "clsx";
import { useAuth } from "@/context/auth";
import { useDisconnect } from "wagmi";

const ConnectButton = (props: any) => {
  const { className } = props;

  const { account } = useCustomAccount();
  const { login, isLogin } = useAuth();
  const { disconnect } = useDisconnect();

  return (
    <Button
      className={clsx(
        "!h-[46px] w-full flex justify-center items-center gap-[20px]",
        account && "!bg-[#6D7EA5]",
        className
      )}
      disabled={false}
      onClick={() => {
        if (!isLogin) {
          login();
          return;
        }
        disconnect();
      }}
    >
      <span>{account ? formatLongText(account, 5, 6) : "Connect Wallet"}</span>
      {account && (
        <button type="button" className="w-[16px] h-[16px] shrink-0">
          <img
            src="/images/invitation/icon-logout.svg"
            alt="logout"
            className="w-full h-full object-contain object-center"
          />
        </button>
      )}
    </Button>
  );
};

export default ConnectButton;
