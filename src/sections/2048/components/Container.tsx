import React, { useEffect, useState } from "react";
import useIsMobile from "@/hooks/use-isMobile";

type ContainerProps = {
    children: React.ReactNode; // Accepts any valid React element(s)
};

export default function Container({ children }: ContainerProps) {
    const isMobile = useIsMobile();
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (isMobile) {
            setSize({ width: window.innerWidth, height: window.innerHeight * 0.7 });
        }
    }, [isMobile]);

    return (
        <div className="h-full flex flex-col items-center justify-between">
            <div
                className="absolute w-[449px] top-[50%] -translate-y-[50%] h-[677px] pl-[30px] pr-[40px] py-[30px]"
                style={
                    isMobile
                        ? {
                            transform: `translateY(-50%) scale(${window.innerHeight * 0.7 / 677})`,
                            transformOrigin: "center"
                        }
                        : {}
                }
            >
                <img src="/images/2048/bg-circle-1.svg" className="w-[427px] absolute top-[-50px] left-[-130px]" />
                <img src="/images/2048/bg-circle-2.svg" className="w-[427px] absolute bottom-[-30px] right-[-70px]" />
                <img src="/images/2048/bg.png" className="w-full h-full absolute top-0 left-0" />
                <div className="pt-4 text-center relative z-10">
                    <div className="text-[36px] font-HackerNoonV2 text-[#000000]">
                        2048 on MONAD
                    </div>
                </div>
                <div className="flex-1 w-full mt-[30px] flex flex-col justify-between overflow-hidden relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
