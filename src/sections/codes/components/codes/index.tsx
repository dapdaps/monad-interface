import { memo, useMemo } from "react";
import { useCodesContext } from "@/sections/codes/context";
import clsx from "clsx";
import useToast from "@/hooks/use-toast";

export default memo(function Codes(props: any) {
  const { className, listClassName } = props;

  const toast = useToast()
  const {
    inviteCodes,
    inviteCodesLoading
  } = useCodesContext()

  const availableCodes = useMemo(() => inviteCodes?.filter((code: any) => !code.used), [inviteCodes])

  function handleCopy(code: any) {
    navigator.clipboard.writeText(code as string);
    toast.success({
      title: `Copied code ${code}`
    });
  }
  function handleCopyAll() {
    const str = availableCodes?.map((code: any) => code.code).join(" ")
    navigator.clipboard.writeText(str);
    toast.success({
      title: `Copied all`
    });
  }

  return (
    <div className={clsx("w-[422px] h-[307px] bg-black border border-[#55648A] shadow-[3px_3px_0px_0px_#2C3635_inset] bg-[url('/images/codes/codes_bg.svg')] bg-center bg-no-repeat bg-cover rounded-[6px]", className)}>
      {
        inviteCodesLoading ? (
          <></>
        ) : inviteCodes?.length > 0 ? (
          <>
            <div className="mx-[1px] mt-[1px] rounded-t-[6px] border-b border-[#03E212] h-[43px] px-[24px] bg-[#000] flex items-center justify-between text-[#03E212] text-[12px] font-HackerNoonV2">
              <div className="flex items-center gap-[6px]"><span className="text-[18px] [text-shadow:0_0_10px_rgba(3,226,18,0.5)]">{availableCodes?.length}</span>Available Codes</div>
              <div className="flex items-center gap-[6px] cursor-pointer" onClick={handleCopyAll}>
                <span className="[text-shadow:0_0_10px_rgba(3,226,18,0.5)]">Copy all</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="5" y="5" width="9" height="9" rx="2" stroke="#03E212" />
                  <path d="M10 5.5V3C10 1.89543 9.10457 1 8 1H3C1.89543 1 1 1.89543 1 3V8C1 9.10457 1.89543 10 3 10H5.5" stroke="#03E212" />
                </svg>
              </div>
            </div>
            <div className={clsx("overflow-auto h-[248px] p-[17px_24px] grid grid-cols-2 grid-rows-[auto_1fr] gap-[16px_24px] text-[#03E212] text-[18px] font-HackerNoonV2 leading-[120%]", listClassName)}>
              {
                inviteCodes?.map((code: any) => (
                  <div className="flex items-center gap-[12px] border p-[8px_0_8px_8px] h-[37px] border-[#03E212] bg-[rgba(0,0,0,0.72)]">
                    <span className={clsx(code?.used ? "text-[#005D06] line-through" : "[text-shadow:0_0_10px_rgba(3,226,18,0.5)]")}>{code.code}</span>
                    {
                      !code?.used && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"
                          className="cursor-pointer"
                          onClick={() => {
                            handleCopy(code.code)
                          }}
                        >
                          <rect x="5" y="5" width="9" height="9" rx="2" stroke="#03E212" />
                          <path d="M10 5.5V3C10 1.89543 9.10457 1 8 1H3C1.89543 1 1 1.89543 1 3V8C1 9.10457 1.89543 10 3 10H5.5" stroke="#03E212" />
                        </svg>
                      )
                    }
                  </div>
                ))
              }
            </div>
          </>
        ) : (
          <div className="mt-[88px] flex flex-col gap-[20px] items-center justify-center">
            <div className="w-[50px]">
              <img src="/images/codes/no_codes.gif" />
            </div>
            <span className="text-[#03E212] [text-shadow:0_0_10px_rgba(3,226,18,0.5)] font-HackerNoonV2 text-[18px] leading-[120%]">No codes yet</span>
          </div>
        )
      }

    </div>
  )
})
