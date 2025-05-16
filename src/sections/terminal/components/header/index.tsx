import Logo from "./logo";
import ExitIcon from "./exit-icon";
import { useDisconnect } from "wagmi";

export default function Header({ currentUser }: any) {
  const { disconnect } = useDisconnect();
  return (
    <div className="mx-[50px] flex">
      <Logo />
      <div className="flex justify-end items-center gap-[4px] border-b border-[#7B23FF] grow translate-y-[-10px]">
        <span className="text-[14px] text-white">
          ACCOUNT: {currentUser.name} | {currentUser.address.slice(0, 4)}...
          {currentUser.address.slice(-4)}
        </span>
        <button
          className="button"
          onClick={() => {
            disconnect?.();
          }}
        >
          <ExitIcon />
        </button>
      </div>
    </div>
  );
}
