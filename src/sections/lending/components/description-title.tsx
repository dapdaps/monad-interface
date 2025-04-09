import clsx from 'clsx';
import PopoverCard from '@/sections/lending/components/popover-card';
import Popover, { PopoverPlacement, PopoverTrigger } from '@/components/popover';

const DescriptionTitle = (props: any) => {
  const {
    className,
    descriptionClassName,
    children,
    description,
    descriptionPlacement,
  } = props;

  return (
    <Popover
      content={(
        <PopoverCard className={clsx("", descriptionClassName)}>
          {description}
        </PopoverCard>
      )}
      trigger={PopoverTrigger.Hover}
      placement={descriptionPlacement || PopoverPlacement.TopLeft}
      contentClassName="z-[101]"
      closeDelayDuration={0}
    >
      <button
        type="button"
        className={clsx("underline underline-offset-4 decoration-dashed text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal", className)}
      >
        {children}
      </button>
    </Popover>
  );
};

export default DescriptionTitle;
