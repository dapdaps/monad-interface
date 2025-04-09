import clsx from 'clsx';
import { LendingOrderDirection } from '@/sections/lending/config';

const ColumnOrderIcon = (props: any) => {
  const { className, dataIndex, orderKey, direction, onClick } = props;

  return (
    <button
      type="button"
      className={clsx(
        "opacity-30 transition-all duration-150",
        className,
        dataIndex === orderKey && "!opacity-100",
        dataIndex === orderKey && direction === LendingOrderDirection.Asc && 'rotate-180'
      )}
      onClick={() => {
        onClick({ orderKey: dataIndex });
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 1V9M5 9L1 5.78947M5 9L9 5.78947"
          stroke="#FFF"
          stroke-width="1.2"
          stroke-linecap="square"
        />
      </svg>
    </button>
  );
};

export default ColumnOrderIcon;
