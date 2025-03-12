export const FontClass = "text-[20px] text-black font-CherryBomb leading-[90%]"

/**
 * @param size 设计稿中的像素尺寸
 * @returns 格式化的 calc 表达式，可在 Tailwind 类名中使用
 */
export const xrem = (size: number) => {
    return `calc(${size}/14.4*var(--rem))`;
  };