import { IDapp } from '@/types';
import DappsFontSvg from '@public/images/dapps/mobile/dapps_font.svg';
import { memo } from "react";
import DappsEntry from './components/dapps-entry';
import RectangularButton from './components/rectangular-button';
import usePage from "./hooks/use-page";
export default memo(function Mobile() {
  const {
    dappsArray,
    activeType,
    scroll,
    scrollSize,
    containerSize,
    entryScrollRef,
    entryContainerRef,

    handleClickButton
  } = usePage()

  return (
    <div ref={entryContainerRef} className='relative flex flex-col gap-[20px] overflow-x-hidden scrollbar-hide overflow-y-auto h-[calc(100vh_-_213px)]'>
      <div className="h-[21px] flex justify-center">
        <DappsFontSvg />
      </div>
      <div className='flex flex-col gap-[28px]' ref={entryScrollRef}>
        {
          dappsArray?.map((dapps: IDapp, index: number) => (
            <DappsEntry direction={index % 2 ? "right" : "left"} dapps={dapps} />
          ))
        }
      </div>


      {
        scrollSize?.height > (containerSize?.height + scroll?.top) && (
          <div className="cursor-pointer fixed right-[15px] bottom-[176px] z-20 w-[36px] h-[60px] flex items-center justify-center rounded-[18px] border border-[#A5FFFD] bg-[rgba(255,255,255,0.10)]">
            <div className="w-[30px]">
              <img src="/images/dapps/icon_scroll_down.gif" alt="icon_scroll_down" />
            </div>
          </div>
        )
      }
      <div className="fixed bottom-[50px] left-1/2 -translate-x-1/2 z-20 w-[390px] h-[115px] bg-[url('/images/dapps/mobile/operation_panel.svg')] bg-center bg-contain bg-no-repeat">
        <div className="absolute left-[43px] top-[20px] flex items-center gap-[10px]">
          <RectangularButton
            type={1}
            clicked={activeType === "all"}
            className="w-[127px] h-[30px] uppercase"
            onClick={() => {
              handleClickButton("all");
            }}
          >
            All
          </RectangularButton>

          <RectangularButton
            type={3}
            data-bp="1003-002"
            clicked={activeType === "instation"}
            className="w-[81px] h-[20px]"
            onClick={() => {
              handleClickButton("instation");
            }}
          >
            Instant
          </RectangularButton>
          <RectangularButton
            type={2}
            data-bp="1003-003"
            clicked={activeType === "outlink"}
            className="w-[76px] h-[20px]"
            onClick={() => {
              handleClickButton("outlink");
            }}
          >
            <div className="flex items-center gap-[3px]">
              <span>External</span>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8L8 1M8 1H1.63636M8 1V7.36364" stroke="black" strokeWidth="1.6" />
              </svg>
            </div>
          </RectangularButton>
        </div>

        <div className="absolute left-[38px] top-[59px] flex gap-[10px]">
          <RectangularButton
            type={1}
            data-bp="1003-005"
            clicked={activeType === "Dex"}
            className="w-[48px] h-[30px] uppercase"
            onClick={() => handleClickButton("Dex")}
          >
            Dex
          </RectangularButton>
          <RectangularButton
            type={3}
            data-bp="1003-007"
            clicked={activeType === "Betting"}
            className="w-[67px] h-[30px] uppercase"
            onClick={() => handleClickButton("Betting")}
          >
            Betting
          </RectangularButton>
          <RectangularButton
            type={3}
            data-bp="1003-008"
            clicked={activeType === "NFT"}
            className="w-[55px] h-[30px] uppercase"
            onClick={() => handleClickButton("NFT")}
          >
            NFT
          </RectangularButton>
          <RectangularButton
            type={3}
            data-bp="1003-004"
            clicked={activeType === "Lending"}
            className="w-[65px] h-[30px] uppercase"
            onClick={() => handleClickButton("Lending")}
          >
            Lending
          </RectangularButton>
          <RectangularButton
            type={2}
            data-bp="1003-006"
            clicked={activeType === "other"}
            className="w-[47px] h-[30px] uppercase"
            onClick={() => handleClickButton("other")}
          >
            Other
          </RectangularButton>
        </div>
      </div>
    </div>
  )
})
