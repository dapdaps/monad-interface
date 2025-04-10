import clsx from 'clsx';
import Loading from '@/components/loading';

const ActionVisibleButton = (props: any) => {
  const { className, onClick, children, icon, loading, ...restProps } = props;

  return (
    <button
      type="button"
      className={clsx("flex justify-center items-center gap-[4px] w-[114px] h-[32px] disabled:opacity-30 disabled:!cursor-not-allowed shrink-0 rounded-[6px] bg-[#8B87FF] text-[#FFF] text-center font-Unbounded text-[12px] font-normal leading-[120%]", className)}
      onClick={onClick}
      {...restProps}
    >
      {
        !!icon && (
          <img
            src={icon}
            alt=""
            className="shrink-0 object-center object-contain w-[10px]"
          />
        )
      }
      {
        loading && (
          <Loading size={12} />
        )
      }
      <div className="">{children}</div>
    </button>
  );
};

export default ActionVisibleButton;
