import React from "react";

export default function VideoAd({ src, tipContent }: { src: string, tipContent: React.ReactNode }) {
    return (
        <div className="relative w-[520px] h-[400px] -translate-x-1/2 bg-[url('/images/mainnet/arcade-video-bg.png')] bg-no-repeat bg-[size:100%_100%] bg-center">
            <div className="absolute top-[8px] left-[46px] pl-[10px] right-[46px] text-[#00FFF9] text-[18px] font-[500]">{tipContent}</div>
            <video src={src} preload="auto" autoPlay muted loop className="w-[488px] h-[262px] absolute top-[55px] left-[16px]" />
        </div>
    )
}