interface Props {
  name: string;
  value: string;
  valueClassName?: string;
}

export default function Route({ name, value, valueClassName }: Props) {
  return (
    <div className="flex items-center justify-between py-[5px] font-Unbounded">
      <div className="flex items-center gap-[10px]">
        <div className="text-[12px] text-[#75759D]">{name}</div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right text-white">
          <div className={`text-[12px] ${valueClassName}`}>{value}</div>
        </div>
      </div>
    </div>
  );
}
