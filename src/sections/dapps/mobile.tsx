import { IDapp } from '@/types';
import DappsFontSvg from '@public/images/dapps/mobile/dapps_font.svg';
import { memo } from "react";
import DappsEntry from './components/dapps-entry';
import RectangularButton from './components/rectangular-button';
import usePage from "./hooks/use-page";
export default memo(function Mobile() {
  const { dappsArray, activeType, handleClickButton } = usePage()

  return (
    <div className='flex flex-col gap-[20px] h-[calc(100dvh_-_40px)]'>
      <div className="h-[21px] flex justify-center">
        <DappsFontSvg />
      </div>
      <div className="flex-1 mb-[163px] overflow-auto">
        <div className='flex flex-col gap-[28px]'>
          {
            dappsArray?.map((dapps: IDapp, index: number) => (
              <DappsEntry direction={index % 2 ? "right" : "left"} dapps={dapps} />
            ))
          }
        </div>
      </div>

      <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2 z-20 w-[390px] h-[115px] bg-[url('/images/dapps/mobile/operation_panel.svg')] bg-center bg-contain bg-no-repeat">
        <div className="absolute left-[43px] top-[20px] flex items-center gap-[10px]">
          <RectangularButton
            type={1}
            clicked={activeType === "all"}
            className="w-[147px] h-[30px]"
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
            className="w-[71px] h-[20px]"
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
            className="w-[66px] h-[20px]"
            onClick={() => {
              handleClickButton("outlink");
            }}
          >
            <div className="flex items-center gap-[3px]">
              <span>Outlink</span>
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
            className="w-[48px] h-[30px]"
            onClick={() => handleClickButton("Dex")}
          >
            Dex
          </RectangularButton>
          <RectangularButton
            type={3}
            data-bp="1003-007"
            clicked={activeType === "Betting"}
            className="w-[57px] h-[30px]"
            onClick={() => handleClickButton("Betting")}
          >
            Betting
          </RectangularButton>
          <RectangularButton
            type={3}
            data-bp="1003-008"
            clicked={activeType === "NFT"}
            className="w-[55px] h-[30px]"
            onClick={() => handleClickButton("NFT")}
          >
            NFT
          </RectangularButton>
          <RectangularButton
            type={3}
            data-bp="1003-004"
            clicked={activeType === "Lending"}
            className="w-[55px] h-[30px]"
            onClick={() => handleClickButton("Lending")}
          >
            Lending
          </RectangularButton>
          <RectangularButton
            type={2}
            data-bp="1003-006"
            clicked={activeType === "other"}
            className="w-[57px] h-[30px]"
            onClick={() => handleClickButton("other")}
          >
            Other
          </RectangularButton>
        </div>
      </div>
    </div>
  )
})
