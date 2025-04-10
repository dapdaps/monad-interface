import clsx from 'clsx';
import Loading from '@/components/loading';
import { AnimatePresence, motion } from 'framer-motion';

function ExpandTable<Item = any>(props: Props<Item>) {
  const {
    className,
    columns,
    loading,
    data,
    current,
    primaryKey = "id",
    onCurrentChange,
    expand,
  } = props;

  return (
    <div className={clsx("", className)}>
      <div className="flex items-center h-[46px] px-[10px] bg-[rgba(255,255,255,0.05)] border-[#4f4c70] border-t-[1px] border-b-[1px]">
        {
          columns?.map((column: Column) => (
            <div
              className={clsx(
                "h-full flex items-center gap-[5px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal px-[10px]",
                column.align === "right" ? "justify-end" : (column.align === "center" ? "justify-center" : "justify-start"),
              )}
              style={column.width ? {
                width: column.width,
                flexBasis: column.width,
                flexShrink: 0,
                flexGrow: 0,
              } : {
                flex: 1,
              }}
            >
              {typeof column.title === "function" ? column.title() : column.title}
            </div>
          ))
        }
      </div>
      <div className="">
        {
          loading ? (
            <div className="flex justify-center items-center h-[100px]">
              <Loading size={16} />
            </div>
          ) : data.map((row: any, rowIndex: number) => {
            const isExpanded = (current as any)?.[primaryKey] === row[primaryKey];

            return (
              <div className="overflow-hidden">
                <div
                  className={clsx(
                    "relative z-[2] flex items-center px-[10px] py-[14px] border-[#4f4c70] cursor-pointer transition-[background-color] duration-[150ms] ease-in-out]",
                    isExpanded ? "bg-[rgba(255,255,255,0.05)] border-b-0" : "bg-[#2B294A] border-b-[1px]",
                  )}
                  onClick={() => {
                    if (isExpanded) {
                      onCurrentChange?.();
                      return;
                    }
                    onCurrentChange?.(row);
                  }}
                >
                  {
                    columns?.map((column: Column, columnIndex: number) => (
                      <div
                        key={`${rowIndex}-${columnIndex}`}
                        className={clsx(
                          "flex items-center px-[10px]",
                          column.align === "right" ? "justify-end" : (column.align === "center" ? "justify-center" : "justify-start"),
                        )}
                        style={column.width ? {
                          width: column.width,
                          flexBasis: column.width,
                          flexShrink: 0,
                          flexGrow: 0,
                        } : {
                          flex: 1,
                        }}
                      >
                        {typeof column.render === "function" ? column.render(row, rowIndex) : (row as any)[column.dataIndex]}
                      </div>
                    ))
                  }
                </div>
                <AnimatePresence>
                  {
                    isExpanded && expand && (
                      <motion.div
                        className="relative z-[1] overflow-hidden flex justify-between gap-[35px] items-end px-[10px] pt-[10px] pb-[18px] bg-[rgba(255,255,255,0.05)] border-[#4f4c70] border-b-[1px]"
                        initial={{
                          y: -100,
                          opacity: 0,
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                        }}
                        exit={{
                          y: -100,
                          opacity: 0,
                        }}
                      >
                        {expand({ row, rowIndex })}
                      </motion.div>
                    )
                  }
                </AnimatePresence>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default ExpandTable;

interface Props<Item> {
  className?: string;
  columns: Column[];
  loading?: boolean;
  data: Item[];
  current?: Item;
  // default value is `id`
  primaryKey?: string;
  onCurrentChange?: (row?: Item) => void;
  expand?(params: { row: Item; rowIndex: number; }): any;
}

export interface Column {
  title: string | (() => any);
  dataIndex: string;
  width?: number | string;
  key?: string;
  align?: "left" | "center" | "right";
  render?: (record: any, index: number) => any;
}
