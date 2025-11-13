import clsx from "clsx";
import TabTable from "./table";
import dayjs from "dayjs";
import { numberFormatter } from "@/utils/number-formatter";
import { GridTableAlign } from "@/components/flex-table/grid-table";
import Popover, { PopoverPlacement } from "@/components/popover";
import { EHistoryType, TypeOptions } from "../../config";
import { useEffect, useRef } from "react";
import { useHistory } from "../../hooks/use-history";

const History = () => {
  const {
    historyList,
    getHistoryList,
    loading,
    historyListPage,
    onHistoryListPageChange,
    onHistoryListTypeChange,
  } = useHistory();
  const typeRef = useRef<any>(null);

  const currentType = TypeOptions[historyListPage.type as EHistoryType];

  useEffect(() => {
    getHistoryList();
  }, []);

  return (
    <div className="w-full pt-[20px]">
      <div className="flex justify-end items-center gap-[20px]">
        <div className="">
          Filter:
        </div>
        <div className="flex items-center gap-[15px]">
          {/* <div className="flex items-center gap-[10px]">
            <div className="">
              Time
            </div>
            <div className="h-[28px] w-[125px] text-white text-[14px] leading-[100%] font-[400] border border-[#34304B] bg-[#191627] backdrop-blur-[15px] shrink-0 flex items-center justify-between px-[10px]">
              <div className="">
                2025/11/24
              </div>
              <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.10116 6.17081C3.49398 6.78933 4.39665 6.78933 4.78946 6.17081L7.73289 1.53611C8.15571 0.870343 7.67742 0 6.88874 0H1.00188C0.213202 0 -0.265085 0.870343 0.157732 1.53611L3.10116 6.17081Z" fill="#727D97" />
              </svg>
            </div>
          </div> */}
          <div className="flex items-center gap-[10px]">
            <div className="">
              Type
            </div>
            <Popover
              ref={typeRef}
              placement={PopoverPlacement.BottomRight}
              content={(
                <div
                  className={clsx(
                    "w-[134px] rounded-[4px] border border-[#34304B] p-[7px]",
                    "bg-[#252532]",
                    "shadow-[0_0_10px_0_rgba(0,0,0,0.25)]",
                    // "backdrop-blur-[15px]",
                  )}
                  style={{ fontStyle: "normal" }}
                >
                  {Object.values(TypeOptions).sort((a, b) => a.sort - b.sort).map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={clsx(
                        "w-full h-[36px] rounded-[4px] border text-white font-Oxanium text-[14px] font-[400] leading-[100%] hover:border-[#212A32] hover:bg-[#14171A]",
                        historyListPage.type === option.value ? "border-[#212A32] bg-[#14171A]" : "border-[rgba(0,0,0,0)]",
                      )}
                      disabled={loading}
                      onClick={() => {
                        typeRef.current?.onClose();
                        onHistoryListTypeChange(option.value);
                      }}>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            >
              <div className="cursor-pointer h-[28px] min-w-[75px] text-white text-[14px] leading-[100%] font-[400] border border-[#34304B] bg-[#191627] backdrop-blur-[15px] shrink-0 flex items-center justify-between gap-[5px] px-[10px]">
                <div className="">
                  {currentType?.label}
                </div>
                <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.10116 6.17081C3.49398 6.78933 4.39665 6.78933 4.78946 6.17081L7.73289 1.53611C8.15571 0.870343 7.67742 0 6.88874 0H1.00188C0.213202 0 -0.265085 0.870343 0.157732 1.53611L3.10116 6.17081Z" fill="#727D97" />
                </svg>
              </div>
            </Popover>
          </div>
        </div>
      </div >
      <TabTable
        className="!border-0"
        headerRowClassName="!pt-[10px] !pb-[0px]"
        columns={[
          {
            dataIndex: "type",
            title: "Type",
            width: 180,
            sort: false,
            render: (record: any) => {
              const currentType = TypeOptions[record.category as EHistoryType];
              if ([EHistoryType.Game777, EHistoryType.GameChartVoyager, EHistoryType.GameGuessWho, EHistoryType.GameSpace].includes(record.category)) {
                return `Bid in ‘${currentType?.label || record.category}’`;
              }
              return currentType?.label || record.category;
            },
          },
          {
            dataIndex: "datetime",
            title: "Time",
            width: 180,
            sort: false,
            render: (record: any) => {
              return (
                <div className="text-[#A1AECB]">
                  {dayjs(record.created_at).format("YYYY/MM/DD HH:mm:ss")}
                </div>
              );
            },
          },
          {
            dataIndex: "amount",
            title: "Amount",
            width: 100,
            sort: false,
            render: (record: any) => {
              return (
                <div className="text-[#A1AECB]">
                  {numberFormatter(record.amount, 3, true, { isShort: true })} {record.token}
                </div>
              );
            },
          },
          {
            dataIndex: "valued",
            title: "Valued",
            width: 100,
            sort: false,
            render: (record: any) => {
              return (
                <div className="text-[#A1AECB]">
                  {numberFormatter(record.volume, 2, true, { isShort: true, prefix: "$" })}
                </div>
              );
            },
          },
          {
            dataIndex: "fees",
            title: "Fees",
            width: 80,
            sort: false,
            render: (record: any) => {
              return (
                <div className="text-[#A1AECB]">
                  {record.fee ? numberFormatter(record.fee, 2, true, { isShort: true, prefix: "$" }) : "-"}
                </div>
              );
            },
          },
          {
            dataIndex: "rp",
            title: "Collected",
            width: 110,
            sort: false,
            align: GridTableAlign.Right,
            render: (record: any) => {
              return (
                <div className="text-[#FFFFFF]">
                  {numberFormatter(record.rp, 2, true, { isShort: true })}
                </div>
              );
            },
          },
        ]}
        data={historyList}
        loading={loading}
        page={historyListPage.page}
        pageSize={historyListPage.pageSize}
        pageTotal={historyListPage.pageTotal}
        onPageChange={(page: number) => {
          onHistoryListPageChange(page);
        }}
      />
    </div >
  )
}

export default History;
