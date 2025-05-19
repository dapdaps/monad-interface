import clsx from 'clsx';
import { LEVELS } from '@/sections/terminal/config';

export default function LevelPanel(props: any) {
  const { className } = props;

  return (
    <div className={clsx("w-[412px] bg-[#18162B] p-[14px_24px_16px_15px] text-[#CEB4F5] text-[14px] leading-[30px]", className)}>
      {
        Object.values(LEVELS).map((it, idx) => {
          return (
            <>
              ({it.value})"{it.name}": {it.condition} {idx < Object.values(LEVELS).length - 1 && <br />}
            </>
          );
        })
      }
    </div>
  );
}
