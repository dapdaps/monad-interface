import FlexTable, { Column } from "@/components/flex-table";
import Modal from "@/components/modal";
import { memo, useEffect } from "react";
import { useFaucetContext } from "../context";
import useCheckinList from "../hooks/use-checkin-list";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default memo(function HistoryModal() {
  const { showHistory, setShowHistory } = useFaucetContext();
  const { loading, checkinList, getCheckinList } = useCheckinList();

  const Columns: Column[] = [
    {
      title: "Action",
      dataIndex: "action",
      align: "left",
      width: "40%",
      render: (text: string, record: any) => {
        return (
          <div className="text-white font-Unbounded text-[14px] font-light leading-[150%]">
            Receive <span className="font-bold">{record?.reward_amount}</span>{" "}
            MON
          </div>
        );
      }
    },
    {
      title: "Check-in Time",
      dataIndex: "time",
      align: "left",
      width: "40%",
      render: (text: string, record: any) => {
        return (
          <div className="text-white font-Unbounded text-[14px] font-light leading-[150%]">
            {dayjs.utc(record?.created_at).format("YYYY-MM-DD HH:mm:ss UTC")}
          </div>
        );
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "left",
      width: "20%",
      render: (text: string, record: any) => {
        return record?.tx_hash ? (
          <div className="flex items-center gap-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
            >
              <path d="M2 7L8.5 13.5L20 2" stroke="#78FEFF" strokeWidth="3" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="cursor-pointer"
              onClick={() => {
                window.open(
                  "https://testnet.monadexplorer.com/tx/" + record?.tx_hash
                );
              }}
            >
              <path
                d="M5.36364 9.18182L13 1M13 1H7M13 1V7M4.81818 1H1V13H13V9.18182"
                stroke="#A9ADB8"
              />
            </svg>
          </div>
        ) : (
          <div className="text-[#A5FFFD] font-Unbounded text-[14px] font-light leading-[150%]">
            Pending
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    showHistory && getCheckinList();
  }, [showHistory]);
  return (
    <Modal
      open={showHistory}
      isForceNormal={true}
      closeIcon={
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.25 0.25H2.5V4.75H0.25V0.25ZM2.5 4.75H4.75V7H2.5V4.75ZM4.75 7H7V9.25H4.75V7ZM7 7V4.75H9.25V7H7ZM9.25 4.75V0.25H11.5V4.75H9.25ZM7 9.25H9.25V11.5H7V9.25ZM9.25 11.5H11.5V16H9.25V11.5ZM4.75 9.25V11.5H2.5V9.25H4.75ZM2.5 11.5V16H0.25V11.5H2.5Z"
            fill="#A5FFFD"
          />
        </svg>
      }
      className="flex items-center justify-center"
      closeIconClassName="absolute md:right-[17px] right-[25px] top-[12px] cursor-pointer"
      onClose={() => {
        setShowHistory(false);
      }}
    >
      <div className="md:w-[368px] w-[650px] md:h-[258px] h-[587px] text-[#A5FFFD] font-Unbounded">
        <div className="absolute md:-left-[10px] -left-[20px] md:-top-[10px] -top-[20px] md:w-[390px] w-[692px] md:h-[400px] h-[629px]">
          <img src="/images/faucet/history_bg.svg" />
        </div>
        <div className="absolute md:p-[40px_14px_0] p-[21px_28px]  left-0 top-0 right-0 bottom-0">
          <div className="mb-[31px] text-white text-[20px] font-medium leading-[100%]">
            Check-in History
          </div>
          <FlexTable
            loading={loading}
            columns={Columns}
            list={checkinList}
            bodyClassName="h-[424px] overflow-auto"
            renderEmpty={() => (
              <div className="flex justify-center ">
                <div className="mt-[80px] w-[161px]">
                  <img src="/images/faucet/empty.svg" alt="empty" />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </Modal>
  );
});
