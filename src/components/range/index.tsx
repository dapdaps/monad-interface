import clsx from "clsx";
import "./index.css";
export default function Range({ value, onChange, style, className }: any) {
  return (
    <div style={style} className={clsx("range relative", className)}>
      <input
        type="range"
        value={value}
        onChange={onChange}
        className="appearance-none"
      />
      <div
        className={clsx(
          "absolute top-0 left-0 h-[4px] rounded-[16px] bg-[#A6A6DB]"
        )}
        style={{ width: value + "%" }}
      />
    </div>
  );
}
