import clsx from "clsx";

const AllInFire = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx(
      "w-[40vw] h-[40vw] absolute pointer-events-none flex justify-center items-center",
      className
    )}>
      <img
        src="/images/game/Fire.gif"
        alt=""
        className="object-center object-contain shrink-0 w-full h-full"
      />
      <img
        src="/images/game/all-in.png"
        alt=""
        className="w-[17.95vw] h-[8.21vw] object-contain object-center shrink-0 absolute z-[1] left-[17vw] bottom-[11vw]"
      />
    </div>
  );
};

export default AllInFire;
