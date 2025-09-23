import CustomerBox from "./customer-box";

export default function WalletView() {

    
  return (
    <div className="px-[28px]">
      <CustomerBox>
        <div className="pb-[10px] text-white flex pr-[30px]">
            <div className="w-[302px]">
                <img src="/images/mainnet/wallet/main-nft.png" className="w-full h-auto" />
            </div>
            <div>

            </div>
        </div>
      </CustomerBox>
    </div>
  );
}