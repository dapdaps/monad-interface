export default function CustomerBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-[100px] relative">
            <div className="absolute top-0 left-0 w-full h-full z-[-1] pointer-events-none">
                <img src="/images/mainnet/wallet/customer-bg.png" className="w-full h-full" />
            </div>
            {children}
        </div>
    );
}