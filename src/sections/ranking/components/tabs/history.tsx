import clsx from "clsx";
import TabTable from "./table";
import dayjs from "dayjs";
import { numberFormatter } from "@/utils/number-formatter";
import { GridTableAlign } from "@/components/flex-table/grid-table";
import Popover from "@/components/popover";
import { EHistoryType, TypeOptions } from "../../config";
import { useState } from "react";

const History = () => {
  const [type, setType] = useState<EHistoryType>(EHistoryType.All);

  return (
    <div className="w-full pt-[20px]">
      <div className="flex justify-end items-center gap-[20px]">
        <div className="">
          Filter:
        </div>
        <div className="flex items-center gap-[15px]">
          <div className="flex items-center gap-[10px]">
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
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="">
              Type
            </div>
            <Popover
              content={(
                <div
                  className={clsx(
                    "w-[114px] h-[171px] rounded-[4px] border border-[#34304B] p-[7px]",
                    "bg-gradient-to-b from-[#1D1A2E] to-[#252532]",
                    "shadow-[0_0_10px_0_rgba(0,0,0,0.25)]",
                    "backdrop-blur-[15px]",
                  )}
                  style={{ fontStyle: "normal" }}
                >
                  {Object.values(TypeOptions).map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={clsx(
                        "w-full h-[36px] rounded-[4px] border text-white font-Oxanium text-[14px] font-[400] leading-[100%] hover:border-[#212A32] hover:bg-[#14171A]",
                        type === option.value ? "border-[#212A32] bg-[#14171A]" : "border-[rgba(0,0,0,0)]",
                      )}
                      onClick={() => setType(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            >
              <div className="cursor-pointer h-[28px] w-[75px] text-white text-[14px] leading-[100%] font-[400] border border-[#34304B] bg-[#191627] backdrop-blur-[15px] shrink-0 flex items-center justify-between px-[10px]">
                <div className="">
                  All
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
              return record.type;
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
                  {dayjs(record.datetime).format("YYYY/MM/DD HH:mm:ss")}
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
                  {numberFormatter(record.amount, 3, true, { isShort: true })} USDT
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
                  {numberFormatter(record.valued, 2, true, { isShort: true, prefix: "$" })}
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
                  {numberFormatter(record.fees, 2, true, { isShort: true, prefix: "$" })}
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
        data={[
          { type: "Swap", datetime: "2025-11-10T14:00:00Z", amount: "100000", valued: "100000", fees: "0.23", rp: 100 },
          { type: "Transfer", datetime: "2025-11-09T10:23:00Z", amount: "20000", valued: "20000", fees: "0.19", rp: 80 },
          { type: "Deposit", datetime: "2025-11-08T18:40:00Z", amount: "50000", valued: "50000", fees: "0.30", rp: 120 },
          { type: "Withdraw", datetime: "2025-11-07T09:10:00Z", amount: "30000", valued: "30000", fees: "0.22", rp: 90 },
          { type: "Stake", datetime: "2025-11-06T14:56:00Z", amount: "40000", valued: "40000", fees: "0.20", rp: 95 },
          { type: "Unstake", datetime: "2025-11-05T11:05:00Z", amount: "15000", valued: "15000", fees: "0.18", rp: 60 },
          { type: "Swap", datetime: "2025-11-04T16:17:00Z", amount: "120000", valued: "120000", fees: "0.25", rp: 130 },
          { type: "Transfer", datetime: "2025-11-03T19:38:00Z", amount: "32000", valued: "32000", fees: "0.17", rp: 75 },
          { type: "Deposit", datetime: "2025-11-02T12:15:00Z", amount: "53000", valued: "53000", fees: "0.21", rp: 110 },
          { type: "Withdraw", datetime: "2025-11-01T15:33:00Z", amount: "21000", valued: "21000", fees: "0.16", rp: 50 },
        ]}
        loading={false}
        page={1}
        pageSize={10}
        pageTotal={100}
        onPageChange={(page: number) => {
          console.log(page);
        }}
      />
    </div >
  )
}

export default History;
