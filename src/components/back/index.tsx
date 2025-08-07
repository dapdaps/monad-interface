"use client";

import { useProgressRouter } from "@/hooks/use-progress-router";

const PageBack = (props: Props) => {
  const { className, style, onBack, showBackText = true } = props;

  const router = useProgressRouter();

  const handleClick = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.back();
  };

  return (
    <>
      <button
        type="button"
        className={`items-center gap-[14px] text-center font-CherryBomb text-[20px] text-black font-[400] hidden lg:flex ${className}`}
        data-click-sound="/audios/press_button.mp3"
        style={style}
        onClick={handleClick}
      >
        <img
          src="/images/back.svg"
          width={27}
          height={16}
          className="translate-y-[2px]"
        />
        {showBackText && <span>back</span>}
      </button>
      <button
        type="button"
        className={`w-[32px] h-[32px] rounded-[16px] bg-[#FFF5A9] items-center justify-center border border-black hidden md:flex ${className}`}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
        >
          <path
            d="M7 14L2 8L7 2"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </>
  );
};

export default PageBack;

interface Props {
  className?: string;
  style?: React.CSSProperties;
  isBlack?: boolean;
  onBack?(): void;
  showBackText?: boolean;
}
