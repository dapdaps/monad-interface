import clsx from "clsx";

export default function Tip({ content, className }: { content: any, className?: string }) {
    return <div className={clsx("absolute top-0 -translate-y-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100]", className)}>
        <div className="relative px-4 py-3 whitespace-nowrap">
            <div
                className="absolute inset-0 bg-[#0a0f1a]"
                style={{
                    clipPath: "polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)",
                }}
            />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-[12px] right-0 h-[1px] bg-[#13AEAF]" />
                <div className="absolute right-0 top-0 bottom-[12px] w-[1px] bg-[#13AEAF]" />
                <div className="absolute bottom-0 left-0 right-[12px] h-[1px] bg-[#13AEAF]" />
                <div className="absolute left-0 top-[12px] bottom-0 w-[1px] bg-[#13AEAF]" />
                <div
                    className="absolute top-[12px] left-0"
                    style={{
                        width: "17px",
                        height: "1px",
                        background: "#00FFF9",
                        transform: "rotate(-45deg)",
                        transformOrigin: "top left",
                    }}
                />
                <div
                    className="absolute bottom-[12px] right-0"
                    style={{
                        width: "17px",
                        height: "1px",
                        background: "#00FFF9",
                        transform: "rotate(-45deg)",
                        transformOrigin: "bottom right",
                    }}
                />
            </div>
            <div className="relative z-10 text-[#00FFF9] text-[18px] font-[500]">
                { content }
            </div>
        </div>
    </div>
}