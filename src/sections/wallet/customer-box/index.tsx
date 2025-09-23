export default function CustomerBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-[100px] relative">
            <div className="absolute left-8 right-8 top-0 h-[2px] bg-[#34304B] z-[2]" />
            <div className="absolute left-8 right-8 bottom-0 h-[2px] bg-[#34304B] z-[2]" />
            <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-[#34304B] z-[2]" />
            <div className="absolute right-0 top-8 bottom-8 w-[2px] bg-[#34304B] z-[2]" />


            <div
                className="w-full h-full"
                style={{
                    background: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.4) 59.87%)",
                    clipPath: "polygon(32px 0, calc(100% - 32px) 0, 100% 32px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 32px 100%, 0 calc(100% - 32px), 0 32px)"
                }}
            >
                <div
                    className="absolute left-0 top-0 w-[45px] h-[45px] border-t border-t-[#34304B] z-[20] pointer-events-none overflow-hidden translate-x-[11px] translate-y-[9px] -rotate-45 origin-center"
                />

                <div
                    className="absolute right-0 top-0 w-[45px] h-[45px] border-t border-t-[#34304B] z-[20] pointer-events-none overflow-hidden translate-x-[-9px] translate-y-[10px] rotate-45 origin-center"
                >
                    <div
                        className="absolute right-0 left-0 top-0 h-[5px] [background:radial-gradient(71.18%_76.92%_at_81.66%_19.06%,_#AA9BFF_0%,_rgba(102,93,153,0)_100%)] shadow-[0_0_10px_0_#2701FF]"
                    ></div>
                </div>

                <div
                    className="absolute right-0 bottom-0 w-[45px] h-[45px] border-r border-r-[#34304B]  z-[20] pointer-events-none overflow-hidden translate-x-[-11px] translate-y-[-9px] rotate-45 origin-center"
                >
                  
                </div>

                <div
                    className="absolute left-0 bottom-0 w-[45px] h-[45px] border-l border-l-[#34304B]   z-[20] pointer-events-none overflow-hidden translate-x-[10px] translate-y-[-9px] -rotate-45 origin-center"
                />

               

                <div className="relative z-[3]">
                    {children}
                </div>
            </div>
        </div>
    );
}