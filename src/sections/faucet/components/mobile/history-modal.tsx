import FlexTable, { Column } from "@/components/flex-table";
import Modal from "@/components/modal";
import HistoryBgSvg from '@public/images/faucet/history_bg.svg';
import { memo, useEffect } from "react";
import { useFaucetContext } from "@/sections/faucet/context";
import useCheckinList from "@/sections/faucet/hooks/use-checkin-list";
import { format } from 'date-fns';
export default memo(function HistoryModal() {
  const { showHistory, setShowHistory } = useFaucetContext();
  const { loading, checkinList, getCheckinList } = useCheckinList()

  const Columns: Column[] = [{
    title: 'Action',
    dataIndex: 'action',
    align: 'left',
    width: '40%',
    render: (text: string, record: any) => {
      return (
        <div className='text-white font-Unbounded text-[14px] font-light leading-[150%]'>
          <span className="font-bold">{record?.reward_amount}</span> MON
        </div>
      );
    },
  }, {
    title: 'Check-in Time',
    dataIndex: 'time',
    align: 'left',
    width: '40%',
    render: (text: string, record: any) => {
      return (
        <div className='text-white font-Unbounded text-[14px] font-light leading-[150%]'>
          {format(record?.created_at, "yyyy-MM-dd hh:mm:ss")}
        </div>
      );
    },
  }, {
    title: 'Status',
    dataIndex: 'status',
    align: 'left',
    width: '20%',
    render: (text: string, record: any) => {
      return record?.tx_hash ? (
        <div className='flex items-center gap-[16px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d="M2 7L8.5 13.5L20 2" stroke="#78FEFF" strokeWidth="3" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="cursor-pointer" onClick={() => {
            window.open("https://testnet.monadexplorer.com/tx/" + record?.tx_hash)
          }}>
            <path d="M5.36364 9.18182L13 1M13 1H7M13 1V7M4.81818 1H1V13H13V9.18182" stroke="#A9ADB8" />
          </svg>
        </div>
      ) : (
        <div className="text-[#A5FFFD] font-Unbounded text-[14px] font-light leading-[150%]">Pending</div>
      );
    },
  }];
  function onClose() {
    setShowHistory(false);
  }
  useEffect(() => {
    showHistory && getCheckinList()
  }, [showHistory])
  return (
    <Modal
      open={showHistory}
      onClose={onClose}
    >
      <div
        className="relative w-full drop-shadow-[0_0_10px_rgba(0,0,0,0.05)] h-[634px]"
      >
        <div className="flex flex-col absolute left-0 -top-[10px] right-0 bottom-0 z-10">
          <div className="w-full">
            <img className="w-full" src="/images/dapps/mobile/modal_top.svg" alt="modal_top" />
          </div>
          <div className="w-full flex-1 bg-[#2B294A]" />
        </div>
        <div className="absolute p-[17px_24px] left-0 top-0 bottom-0 right-0 z-20">
          <div className="text-white font-Unbounded text-[16px] font-medium leading-[100%]">Check-in History</div>
          <FlexTable
            loading={loading}
            columns={Columns}
            list={checkinList}
            headClass="!px-0"
            bodyClassName="h-[524px] overflow-auto scrollbar-hide"
            bodyClass="!px-0"
            renderEmpty={() => (
              <div className="flex justify-center ">
                <div className="mt-[80px] w-[161px]">
                  <img src="/images/faucet/empty.svg" alt="empty" />
                </div>
              </div>
            )}
          />
        </div>
        <svg onClick={onClose} className="absolute right-[17px] top-[13px] z-20" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
          <g filter="url(#filter0_i_33330_3208)">
            <path d="M5.26795 10C6.03775 11.3333 7.96225 11.3333 8.73205 10L12.1962 4C12.966 2.66666 12.0037 1 10.4641 1L3.5359 1C1.9963 1 1.03405 2.66667 1.80385 4L5.26795 10Z" fill="#BFFF60" />
          </g>
          <path d="M9.16506 10.25C8.20281 11.9167 5.79719 11.9167 4.83494 10.25L1.37083 4.25C0.408585 2.58333 1.61139 0.5 3.5359 0.5L10.4641 0.5C12.3886 0.5 13.5914 2.58333 12.6292 4.25L9.16506 10.25Z" stroke="black" />
          <defs>
            <filter id="filter0_i_33330_3208" x="0.531433" y="0" width="12.9371" height="12" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-2" dy="-2" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_33330_3208" />
            </filter>
          </defs>
        </svg>
      </div>
    </Modal>
  )

})
