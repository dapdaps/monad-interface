import Link from "next/link";

const LaptopHeader = (props: any) => {
  const { className } = props;

  return (
    <div className="fixed pr-[14px] pl-[19px] z-[10] left-0 top-0 w-full h-[65px] flex justify-between items-center">
      <Link
        href="/"
        className="block"
      >
        <img
          src="/images/mainnet/logo.svg"
          alt=""
          className="w-[111px] h-[45px] object-center object-contain shrink-0"
        />
      </Link>
      <div className="flex items-center justify-end gap-[10px]">
        <div className="">
          0x39d...416b
        </div>
        <div className="w-[40px] h-[40px] rounded-[4px] border border-[#836EF9] bg-black/30 shrink-0"></div>
      </div>
    </div>
  );
};

export default LaptopHeader;
