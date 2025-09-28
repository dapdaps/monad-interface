import clsx from "clsx";
import "./index.css";
export default function Range({ value, onChange, style, className, disabled }: any) {
  return (
    <div style={style} className={clsx("range relative cursor-pointer", disabled ? "opacity-50" : "", className)}>
      <input
        type="range"
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="appearance-none cursor-pointer"
      />
      <div
        className={clsx(
          "absolute top-0 left-0 h-[4px] rounded-[16px] bg-[#A6A6DB]",
        )}
        style={{ width: value + "%" }}
      />
    </div>
  );
}
