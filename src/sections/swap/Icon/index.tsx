import Image from "next/image";

export default function DappIcon({ dapp }: any) {
  return (
    <div className="absolute z-[3] w-[235px] h-[70px] left-[145px] top-[-24px]">
      <div className="relative z-[2] flex h-full items-center justify-center gap-[4px]">
        <Image src={dapp.logo} alt={dapp.name} width={33} height={30} />
        <div className="text-[18px] font-semibold">{dapp.name}</div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="253"
        height="70"
        viewBox="0 0 253 70"
        fill="none"
        className="absolute z-[1] left-[0px] top-[0px]"
      >
        <g filter="url(#filter0_d_31892_170)">
          <path
            d="M24.7455 12.5543C25.8686 10.9532 27.7017 10 29.6574 10H223.343C225.298 10 227.131 10.9532 228.255 12.5543L241.583 31.5543C243.034 33.6224 243.034 36.3776 241.583 38.4457L228.255 57.4457C227.131 59.0468 225.298 60 223.343 60H29.6574C27.7017 60 25.8686 59.0468 24.7455 57.4457L11.4171 38.4457C9.96639 36.3776 9.96639 33.6224 11.4171 31.5543L24.7455 12.5543Z"
            fill="#A6A6DB"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_31892_170"
            x="0.329102"
            y="0"
            width="252.342"
            height="70"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_31892_170"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_31892_170"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
