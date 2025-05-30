import { memo, useMemo } from "react";
import { useCodesContext } from "../../context";

export default memo(function Transactions() {

  const {
    inviteCodes,
  } = useCodesContext()

  const transactions = useMemo(() => {
    console.log('====inviteCodes.length', inviteCodes?.length ?? 0)
    return [{
      label: "3 Transactions",
      value: "1 Code",
      completed: inviteCodes?.length >= 1
    }, {
      label: "10 Transactions",
      value: "2 Codes",
      completed: inviteCodes?.length >= 3
    }, {
      label: "20 Transactions",
      value: "3 Codes",
      completed: inviteCodes?.length >= 6
    }, {
      label: "50 Transactions",
      value: "4 Codes",
      completed: inviteCodes?.length >= 10
    }, {
      label: "100 Transactions",
      value: "5 Codes",
      completed: inviteCodes?.length >= 15
    },]
  }, [inviteCodes])

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

      <div className="leading-[42px] font-Unbounded text-[14px] text-[#8e8d9e]">*From 100 txns, for each 20 txns: +2 invite codes</div>
    </div>

  )
})
