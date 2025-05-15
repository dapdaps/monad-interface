import Logo from "./logo";
import ExitIcon from "./exit-icon";

export default function Header() {
  return (
    <div className="mx-[50px] flex">
      <Logo />
      <div className="flex justify-end items-center gap-[4px] border-b border-[#7B23FF] grow translate-y-[-10px]">
        <span className="text-[14px] text-white">
          ACCOUNT: MENCY | 0x35b...e717
        </span>
        <button className="button">
          <ExitIcon />
        </button>
      </div>
    </div>
  );
}
