import clsx from "clsx";
import Copyed from "../copyed";

const GameAccount = (props: any) => {
  const { className, address } = props;

  return (
    <div className={clsx("flex items-center w-full", className)}>
      <span className="mr-[clamp(1px,_0.694vw,_calc(var(--nadsa-laptop-width-base)*0.00694))] flex items-center justify-center">
        <svg
          className="w-[clamp(1px,_2.639vw,_calc(var(--nadsa-laptop-width-base)*0.02639))] h-[clamp(1px,_2.639vw,_calc(var(--nadsa-laptop-width-base)*0.02639))] shrink-0"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="19" cy="19" r="19" fill="black" />
          <path d="M19.0801 4C23.981 4 28.3342 6.33908 31.0879 9.96094L21.3447 19.6807L30.4229 29.0117C27.6594 32.1661 23.6035 34.1611 19.0801 34.1611C10.7507 34.1611 4 27.4094 4 19.0801C4.00024 10.7509 10.7528 4.00003 19.0801 4ZM31.0879 16.7881C31.8784 16.7881 32.6373 17.1022 33.1963 17.6611C33.7551 18.22 34.0683 18.9782 34.0684 19.7686C34.0684 20.5588 33.755 21.3171 33.1963 21.876C32.6373 22.4349 31.8784 22.749 31.0879 22.749C30.2976 22.7489 29.5393 22.4348 28.9805 21.876C28.4217 21.3171 28.1074 20.5589 28.1074 19.7686C28.1075 18.9782 28.4216 18.22 28.9805 17.6611C29.5393 17.1023 30.2976 16.7882 31.0879 16.7881ZM12.9961 10.043C12.3488 10.043 11.8223 10.5695 11.8223 11.2168V12.8301H10.209C9.56166 12.8301 9.03516 13.3566 9.03516 14.0039C9.03539 14.651 9.5618 15.1767 10.209 15.1768H11.8223V16.79C11.8223 17.4374 12.3488 17.9639 12.9961 17.9639C13.6434 17.9638 14.1689 17.4373 14.1689 16.79V15.1768H15.7832C16.4302 15.1765 16.9558 14.6509 16.9561 14.0039C16.9561 13.3567 16.4304 12.8303 15.7832 12.8301H14.1689V11.2168C14.1689 10.5695 13.6434 10.0431 12.9961 10.043Z" fill="#B16EF1" />
        </svg>
      </span>
      <div className="flex-1">
        <div className="text-[#A6A6DB] text-left">Game Account</div>
        <div className="text-white flex items-center mt-[clamp(1px,_0.0694vw,_calc(var(--nadsa-laptop-width-base)*0.000694))] cursor-pointer">
          <span>{address && address.slice(0, 5)}...{address && address.slice(-5)}</span>
          <div className="ml-[clamp(1px,_0.486vw,_calc(var(--nadsa-laptop-width-base)*0.00486))] text-[#a084ff]">
            <Copyed value={address || ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameAccount;
