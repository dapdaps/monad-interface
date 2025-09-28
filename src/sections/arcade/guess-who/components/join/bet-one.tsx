import clsx from "clsx";

const BetOne = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("w-[250px] mx-auto h-[270px] bg-[url('/images/mainnet/arcade/guess-who/ufo2.png')] bg-no-repeat bg-top bg-[length:223px_auto]", className)}>
      <div className="w-full h-full flex flex-col justify-end items-center pb-[20px] bg-[url('/images/mainnet/arcade/guess-who/ufo-light2.png')] bg-no-repeat bg-[position:left_-16px_bottom_-15px] bg-[length:165px_213px]">
        <img
          src="/images/mainnet/arcade/guess-who/avatar-monster-pending.png"
          alt=""
          className="w-[128px] h-[96px] object-center object-contain shrink-0 translate-x-[-30px]"
        />
        <div className="text-[#BFFF60] text-[16px] mt-[16px] text-center translate-x-[-30px]">
          Wait for the last player
        </div>
      </div>
    </div>
  );
};

export default BetOne;
