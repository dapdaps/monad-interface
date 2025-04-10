import clsx from 'clsx';
import Loading from '@/components/loading';
import { AnimatePresence, motion } from 'framer-motion';
import Empty from '@/components/empty';
import useIsMobile from '@/hooks/use-isMobile';

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

  const isMobile = useIsMobile();

  return (
    <div className={clsx("", className)}>
      {
        !isMobile && (
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
        )
      }
      <div className="md:flex md:flex-col md:gap-[10px]">
        {
          loading ? (
            <div className="flex justify-center items-center h-[100px]">
              <Loading size={16} />
            </div>
          ) : (
            data?.length > 0 ? data.map((row: any, rowIndex: number) => {
              const isExpanded = (current as any)?.[primaryKey] === row[primaryKey];

              return (
                <div className="overflow-hidden md:px-[10px]">
                  <div
                    className={clsx(
                      "relative z-[2] flex items-center md:flex-wrap px-[10px] md:px-[2px] py-[14px] border-[#4f4c70] md:backdrop-blur-[10px] md:rounded-[6px] md:border-[#454556] cursor-pointer transition-[background-color] duration-[150ms] ease-in-out",
                      isExpanded ? "bg-[rgba(255,255,255,0.05)] md:bg-[rgba(45,48,79,0.60)] border-b-0 md:border md:border-b-0 md:rounded-b-[0]" : "bg-[#2B294A] md:bg-[rgba(45,48,79,0.60)] border-b-[1px] md:border-[1px]",
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
                            "flex items-center px-[10px] md:px-[6px]",
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
                          className="relative z-[1] overflow-hidden flex md:flex-col md:items-stretch justify-between gap-[35px] md:gap-[16px] items-end px-[10px] pt-[10px] pb-[18px] bg-[rgba(255,255,255,0.05)] md:bg-[rgba(49,53,86,0.60)] md:rounded-b-[6px] border-[#4f4c70] md:border-[#454556] border-b-[1px] md:border-[1px] md:border-t-0"
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
            }) : (
              <div className="w-full h-[200px] flex justify-center items-center">
                <Empty desc="No data" />
              </div>
            )
          )
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
