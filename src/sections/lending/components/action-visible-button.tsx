import clsx from 'clsx';

const ActionVisibleButton = (props: any) => {
  const { className, onClick, children, icon } = props;

  return (
    <button
      type="button"
      className={clsx("flex justify-center items-center gap-[4px] w-[114px] h-[32px] shrink-0 rounded-[6px] bg-[#8B87FF] text-[#FFF] text-center font-Unbounded text-[12px] font-normal leading-[120%]", className)}
      onClick={onClick}
    >
      <img
        src={icon}
        alt=""
        className="shrink-0 object-center object-contain w-[10px]"
      />
      <div className="">{children}</div>
    </button>
  );
};

export default ActionVisibleButton;
