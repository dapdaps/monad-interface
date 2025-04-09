import clsx from 'clsx';

const LabelValue = (props: any) => {
  const { className, label, children, labelClassName, valueClassName } = props;

  return (
    <div className={clsx("flex justify-between items-center", className)}>
      <div className={clsx("text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal", labelClassName)}>
        {label}
      </div>
      <div className={clsx("flex items-center gap-[4px] text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal", valueClassName)}>
        {children}
      </div>
    </div>
  );
};

export default LabelValue;
