import clsx from "clsx";

type Props = {
  size?: number;
  desc?: string;
  descClassName?: string;
  mt?: number;
  icon?: any;
};

export default function Empty({ size = 65, desc, mt, icon, descClassName }: Props) {
  return (
    <div className="flex flex-col items-center" style={{ marginTop: mt }}>
      {
        icon ? icon : (
          <img src="/images/arcade/space-invaders/icon-empty.png" className="w-[122px] h-[166px] object-center object-contain"/>
        )
      }
      <div className={clsx("text-white/50 text-[14px] mt-[8px]", descClassName)}>{desc}</div>
    </div>
  );
}
