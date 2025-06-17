import clsx from "clsx";

const CodesDescription = (props: any) => {
  const { titleClassName,className } = props;

  return (
    <>
      <div className={clsx("text-white font-Unbounded text-[18px]", titleClassName)}>Global Crew Mission</div>
      <div className={clsx("m-[18px_0_28px] text-[#A6A6DB] font-Unbounded text-[12px] font-light text-center", className)}>
        Unlock Access codes by using the platform.<br />Earn MON by inviting new crew members.
      </div>
    </>
  );
};

export default CodesDescription;
