import Drawer from "@/components/drawer";
import { monadTestnet } from "viem/chains";
import { useDisconnect } from "wagmi";

const MobileUser = (props: Props) => {
  const {
    visible,
    onClose,
    setMobileUserInfoVisible,
    walletInfo,
    handleCopy,
    address,
    tokenLogoShown,
    balanceShown,
    tokenSymbolShown,
    chainId,
    userInfo,
    currentChainInfo
  } = props;

  const walletName = walletInfo?.name || "";

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      size="406px"
      className="bg-[url(/images/mobile/modal-account.svg)] bg-no-repeat bg-cover"
    >
      <div className="mt-[72px] px-[30px]">
        <div className="flex gap-2 items-center">
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-full text-[#A6A6DB] text-[12px] font-Unbounded text-nowrap leading-[1] overflow-hidden overflow-ellipsis">
              Connected with {walletName}
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-[#A6A6DB] border-opacity-[0.3]">
              <div className="text-white text-[18px] font-Unbounded leading-[1]">
                {address ? `${address.slice(0, 8)}...${address.slice(-6)}` : ""}
              </div>
              <div className="flex items-center gap-[18px]">
                <div className="click cursor-pointer" onClick={handleCopy}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.99707" y="5.26526" width="11.0018" height="11.735" rx="2" stroke="#A6A6DB" stroke-width="1.6"/>
                    <path d="M5.9978 3.66705V3C5.9978 1.89543 6.89323 1 7.9978 1H14.9996C16.1042 1 16.9996 1.89543 16.9996 3V10.735C16.9996 11.8396 16.1042 12.735 14.9996 12.735H13.9991" stroke="#A6A6DB" stroke-width="1.6"/>
                  </svg>
                </div>
                <DisconnectButton setMobileUserInfoVisible={setMobileUserInfoVisible} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full text-[#A6A6DB] text-[12px] font-Unbounded text-nowrap leading-[1]">Network</div>
          <div className="mt-2.5 flex items-center gap-2 pb-4 border-b border-[#A6A6DB] border-opacity-[0.3]">
            <img src="/images/mobile/monad-testnet.svg" alt="" />
            <div className="text-white font-Unbounded leading-[1] text-[14px]">
              {currentChainInfo?.id === monadTestnet.id ? "Monad" : currentChainInfo?.name || ""}{" "}
              {currentChainInfo?.testnet ? "Testnet" : "Mainnet"}
            </div>
          </div>
          <div className="mt-4 w-full text-[#A6A6DB] text-[12px] font-Unbounded text-nowrap leading-[1]">MON Amount</div>
        <div className="flex items-center justify-between mt-[10px] pb-4 border-b border-[#A6A6DB] border-opacity-[0.3]">
          <div className="flex items-center gap-2">
            <div
              className="relative w-[26px] h-[26px] rounded-full shrink-0"
              style={{
                backgroundImage: `url("${tokenLogoShown}")`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }} />
            <div className="text-white text-[14px] leading-[14px]">{tokenSymbolShown}</div>
          </div>
          <div className="text-white text-[16px] font-Unbounded flex-shrink-0 overflow-hidden text-nowrap">
            {balanceShown} 
          </div>
        </div>
      </div>
    </Drawer>
  );
};

const DisconnectButton = ({ setMobileUserInfoVisible }: any) => {
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
    setMobileUserInfoVisible(false);
  };
  return (
    <div
      className="cursor-pointer flex gap-2 items-center click transition-all duration-300"
      onClick={handleDisconnect}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.91613 16H10.5731C11.0656 16 11.4652 15.57 11.4652 15.04C11.4652 14.51 11.0656 14.08 10.5731 14.08H2.00906C1.92728 13.974 1.78417 13.662 1.78417 13.164V2.838C1.78417 2.34 1.92728 2.028 2.00906 1.92H10.5731C11.0656 1.92 11.4652 1.49 11.4652 0.96C11.4652 0.43 11.0656 0 10.5731 0H1.91613C0.823322 0 0 1.22 0 2.838V13.162C0 14.78 0.823322 16 1.91613 16ZM12.3929 12.2771L15.7266 8.69156L15.7383 8.67941C15.913 8.49136 16.0004 8.24579 16.0003 8.00023C16.0003 7.75467 15.913 7.5091 15.7383 7.32106L15.7237 7.30575L12.3948 3.72341C12.0454 3.34741 11.4823 3.34741 11.1329 3.72341C10.7835 4.09941 10.7835 4.70541 11.1329 5.08141L12.953 7.03906H6.83918C6.34667 7.03906 5.94709 7.46906 5.94709 7.99906C5.94709 8.52906 6.34667 8.95906 6.83918 8.95906H12.9542L11.1329 10.9191C10.7835 11.2951 10.7835 11.9011 11.1329 12.2771C11.3057 12.4651 11.5343 12.5591 11.7629 12.5591C11.9915 12.5591 12.2201 12.4651 12.3929 12.2771Z" fill="#FF689A"/>
        </svg>
    </div>
  );
};

export default MobileUser;

interface Props {
  visible: boolean;
  walletInfo: any;
  addressShown: any;
  address: any;
  tokenLogoShown: any;
  balanceShown: any;
  tokenSymbolShown: any;
  chainId: any;
  userInfo: any;
  setMobileUserInfoVisible: any;

  onClose(): void;
  handleDisconnect(): void;
  handleCopy(): void;
  currentChainInfo: any
}
