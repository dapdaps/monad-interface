import GridTable from "@/components/flex-table/grid-table";
import Pagination from "@/components/pagination";
import clsx from "clsx";

const TabTable = (props: any) => {
  const {
    data,
    columns,
    loading,
    page,
    pageSize,
    pageTotal,
    onPageChange,
    className,
    headerRowClassName,
    bodyRowClassName,
    bodyClassName,
    showPage = true,
    emptyText = "No data yet...",
  } = props;

  return (
    <div className="">
      <GridTable
        className={clsx("border-t border-b border-[#836EF9]", className)}
        bodyClassName={clsx("text-[14px] font-Oxanium font-[400]", bodyClassName)}
        headerRowClassName={clsx("", headerRowClassName)}
        bodyRowClassName={clsx("odd:!bg-[rgba(131,110,249,0.20)]", bodyRowClassName)}
        columns={columns}
        data={data}
        loading={loading}
        emptyText={emptyText}
      />
      
      {
        showPage && (
          <div className="flex justify-start items-center pl-[10px] py-[10px]">
            <Pagination
              page={page}
              totalPage={pageTotal}
              pageSize={pageSize}
              onPageChange={(_page: number) => {
                onPageChange(_page);
              }}
            />
          </div>
        )
      }
    </div>
  );
};

export default TabTable;
