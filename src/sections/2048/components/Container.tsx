import React from "react";

type ContainerProps = {
    children: React.ReactNode; // Accepts any valid React element(s)
};

export default function Container({ children }: ContainerProps) {
    return (
        <div className="h-full flex flex-col items-center justify-between overflow-hidden">
            <div className="absolute w-[449px] top-[50%] -translate-y-[50%] h-[677px] pl-[30px] pr-[40px] py-[30px]">
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
