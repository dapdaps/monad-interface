import { timeswap } from '@/sections/lending/column/timeswap';

export default {
  timeswap
} as Record<string, any>;

export interface Column {
  title: string | (() => any);
  dataIndex: string;
  width?: number | string;
  key?: string;
  align?: "left" | "center" | "right";
  render?: (record: any, index: number) => any;
}
