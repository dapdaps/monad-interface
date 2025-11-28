import useToast from "@/hooks/use-toast";

const Price = (props: any) => {
  const { } = props;

  const toast = useToast();

  return (
    <div className="w-0 flex-1">
      <div className="pl-[clamp(1px,_2.31vw,_calc(var(--pc-1512)*0.0231))]">
        <div className="w-full flex justify-between items-center pl-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] pr-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] h-[clamp(1px,_4.96vw,_calc(var(--pc-1512)*0.0496))] bg-[url('/images/mainnet/discover/bg-card-border-full-2-min.png')] bg-no-repeat bg-center bg-[length:100%_100%]">
          <div className="flex items-center gap-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))]">
            <img
              src="/images/mainnet/discover/token-the-black-currency-min.png"
              alt=""
              className="shrink-0 object-center object-contain w-[clamp(1px,_3.84vw,_calc(var(--pc-1512)*0.0384))] h-[clamp(1px,_3.84vw,_calc(var(--pc-1512)*0.0384))]"
            />
            <div className="">
              <div className="text-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] text-white font-[500]">
                The Black Currency
              </div>
              <div className="mt-[clamp(1px,_0.20vw,_calc(var(--pc-1512)*0.0020))] flex items-stretch h-[clamp(1px,_1.98vw,_calc(var(--pc-1512)*0.0198))]">
                <div className="h-full flex justify-center items-center bg-[rgba(131,110,249,0.50)] text-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] font-[500] px-[clamp(1px,_0.60vw,_calc(var(--pc-1512)*0.0060))]">
                  BC
                </div>
                <div className="h-full flex items-center gap-[clamp(1px,_0.40vw,_calc(var(--pc-1512)*0.0040))] px-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] text-[#A6A6DB] bg-[rgba(131,110,249,0.25)]">
                  <div className="">
                    0x350...0023
                  </div>
                  <button
                    type="button"
                    className="shrink-0"
                    onClick={() => {
                      navigator.clipboard.writeText("0x350...0023");
                      toast.success({
                        title: "Copied to clipboard",
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6.66406 2.82324C7.78463 2.82348 8.6932 3.73115 8.69336 4.85156V9.9707C8.69326 11.0912 7.78467 11.9998 6.66406 12H2.0293C0.90851 12 0.000101409 11.0913 0 9.9707V4.85156C0.000164901 3.73103 0.908548 2.82327 2.0293 2.82324H6.66406ZM2.0293 4.23438C1.68829 4.2344 1.4113 4.51064 1.41113 4.85156V9.9707C1.41123 10.3117 1.68825 10.5879 2.0293 10.5879H6.66406C7.00493 10.5877 7.28115 10.3116 7.28125 9.9707V4.85156C7.28109 4.51077 7.0049 4.23461 6.66406 4.23438H2.0293ZM9.97363 0C11.0945 2.79673e-05 12.0029 0.908621 12.0029 2.0293V7.14746C12.0029 8.26814 11.0945 9.17673 9.97363 9.17676H9.31055V7.76562H9.97363C10.3147 7.7656 10.5918 7.48852 10.5918 7.14746V2.0293C10.5918 1.68823 10.3147 1.41116 9.97363 1.41113H5.33984C4.99871 1.41113 4.72168 1.68822 4.72168 2.0293V2.46973H3.30957V2.0293C3.30957 0.908604 4.21897 0 5.33984 0H9.97363Z" fill="#A6A6DB" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[#A6A6DB] pt-[clamp(1px,_1.98vw,_calc(var(--pc-1512)*0.0198))]">
            Created 2d ago
          </div>
        </div>
        <div className="w-full px-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] pt-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))]">
          <div className="w-full flex justify-between items-end">
            <div className="">
              <div className="flex items-center gap-[clamp(1px,_0.46vw,_calc(var(--pc-1512)*0.0046))]">
                <div className="text-white font-[500] text-[clamp(1px,_1.59vw,_calc(var(--pc-1512)*0.0159))]">
                  $0.0004524
                </div>
                <div className="px-[clamp(1px,_0.33vw,_calc(var(--pc-1512)*0.0033))] rounded-[clamp(1px,_0.26vw,_calc(var(--pc-1512)*0.0026))] bg-[rgba(191,255,96,0.10)] h-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] flex justify-center items-center gap-[clamp(1px,_0.13vw,_calc(var(--pc-1512)*0.0013))] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] text-[#BFFF60] leading-[100%] font-[300]">
                  <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.03519 0.146447C3.83993 -0.0488156 3.52335 -0.0488155 3.32809 0.146447L0.146107 3.32843C-0.0491553 3.52369 -0.0491553 3.84027 0.146107 4.03553C0.341369 4.2308 0.657952 4.2308 0.853214 4.03553L3.68164 1.20711L6.51007 4.03553C6.70533 4.2308 7.02191 4.2308 7.21717 4.03553C7.41244 3.84027 7.41244 3.52369 7.21717 3.32843L4.03519 0.146447ZM3.68164 8.5L4.18164 8.5L4.18164 0.5L3.68164 0.5L3.18164 0.5L3.18164 8.5L3.68164 8.5Z" fill="#BFFF60" />
                  </svg>
                  <div className="">
                    40%
                  </div>
                </div>
              </div>
              <div className="text-[#727D97] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))]">
                Nov 28, 2025 3:36 PM
              </div>
            </div>
            <div className="flex justify-end items-end gap-[clamp(1px,_4.63vw,_calc(var(--pc-1512)*0.0463))]">
              <div className="text-white">
                <div className="">
                  $956.2K
                </div>
                <div className="text-[#727D97] text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))]">
                  1D Volume
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border mt-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] h-[clamp(1px,_12.70vw,_calc(var(--pc-1512)*0.1270))]">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
