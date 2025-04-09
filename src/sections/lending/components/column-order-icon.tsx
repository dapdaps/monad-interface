import clsx from 'clsx';

const ColumnOrderIcon = (props: any) => {
  const { className } = props;

  return (
    <button
      type="button"
      className={clsx("", className)}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 1V9M5 9L1 5.78947M5 9L9 5.78947"
          stroke="#A6A6DB"
          stroke-width="1.2"
          stroke-linecap="square"
        />
      </svg>
    </button>
  );
};

export default ColumnOrderIcon;
