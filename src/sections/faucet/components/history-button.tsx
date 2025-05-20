import { memo } from "react";
import { useFaucetContext } from "../context";
export default memo(function HistoryButton() {
  const { setShowHistory } = useFaucetContext();

  return (
    <div className='flex justify-center'>
      <div
        className='cursor-pointer underline text-[#A5FFFD] text-[12px] font-DogicaPixel leading-[150%]'
        onClick={() => {
          setShowHistory(true)
        }}
      >History</div>
    </div>
  )
})
