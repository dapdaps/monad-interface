export default function ExchangeIcon({ onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="h-[8px] flex justify-center items-center duration-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="36"
          height="36"
          rx="7"
          fill="#75759D"
          stroke="#2C2A4B"
          strokeWidth="2"
        />
        <path
          d="M19.4999 14V24.5M19.4999 24.5L14 19M19.4999 24.5L25 19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
