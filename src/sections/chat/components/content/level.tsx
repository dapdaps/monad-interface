import icons from "./level-icon";
import { memo } from "react";

export default memo(function LevelIcon({ level }: any) {
  if (!level) return "";

  return level.split(",").map((it: string, i: number) => `[${icons[it]}]`);
});
