import { memo, useMemo } from "react";
import { useCodesContext } from "../../context";

export default memo(function Transactions() {

  const {
    tradeInviteCodes,
  } = useCodesContext()

  const transactions = useMemo(() => {
    return [{
      label: "3 Transactions",
      value: "1 Code",
      completed: tradeInviteCodes?.length >= 1
    }, {
      label: "10 Transactions",
      value: "2 Codes",
      completed: tradeInviteCodes?.length >= 3
    }, {
      label: "20 Transactions",
      value: "3 Codes",
      completed: tradeInviteCodes?.length >= 6
    }, {
      label: "50 Transactions",
      value: "4 Codes",
      completed: tradeInviteCodes?.length >= 10
    }, {
      label: "100 Transactions",
      value: "5 Codes",
      completed: tradeInviteCodes?.length >= 15
    },]
  }, [tradeInviteCodes])

  return (
    <div className="w-[410px] flex flex-col gap-[11px] text-white font-Unbounded text-[14px]">
      {
        transactions?.map(transaction => (
          <div className="w-full h-[42px] px-[16px] rounded-[6px] border border-[#26274B] bg-[#31305A] flex items-center justify-between">
            <span className={transaction.completed ? "opacity-50" : ""}>{transaction?.label}</span>
            <div className="flex items-center gap-[7px]">
              {
                transaction.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                    <path d="M1 5.34783L6.77778 11L17 1" stroke="#78FEFF" strokeWidth="2" />
                  </svg>
                )
              }
              <span className={transaction.completed ? "opacity-50" : ""}>{transaction?.value}</span>
            </div>
          </div>
        ))
      }

      <div className="pl-[17px] leading-[42px] font-Unbounded text-[12px] text-[#A6A6DB]">*Every 20 txns since 100, Unlock +2 invite codes</div>
    </div>

  )
})
