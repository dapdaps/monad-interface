export default function Simple({ pendingCount, historyCount, setIsOpen, setActiveTab }: { pendingCount: number, historyCount: number, setIsOpen: (isOpen: boolean) => void, setActiveTab: (tab: string) => void }) {
    return <div className="rounded-2xl p-4 relative font-Unbounded">
        <div className="absolute top-[30px] cursor-pointer right-[20px]" onClick={() => setIsOpen(true)}>
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_31923_1470)">
                    <path d="M8.73205 10C7.96225 11.3333 6.03775 11.3333 5.26795 10L1.80385 4C1.03405 2.66666 1.9963 0.999999 3.5359 0.999999L10.4641 1C12.0037 1 12.966 2.66667 12.1962 4L8.73205 10Z" fill="#BFFF60" />
                </g>
                <path d="M4.83494 10.25C5.79719 11.9167 8.20281 11.9167 9.16506 10.25L12.6292 4.25C13.5914 2.58333 12.3886 0.5 10.4641 0.5L3.5359 0.499999C1.6114 0.499999 0.408585 2.58333 1.37084 4.25L4.83494 10.25Z" stroke="black" />
                <defs>
                    <filter id="filter0_i_31923_1470" x="0.531372" y="0" width="12.9373" height="12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="-2" dy="-2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_31923_1470" />
                    </filter>
                </defs>
            </svg>
        </div>
        <div className="flex gap-3 mr-[100px] py-2">
            <div onClick={() => {
                setIsOpen(true)
                setActiveTab('pending')
            }} className="flex flex-1 items-center gap-2 cursor-pointer text-[#fff] px-4 text-[14px] border-r border-[#958FBC]">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{pendingCount} Pending</span>
            </div>

            <div onClick={() => {
                setIsOpen(true)
                setActiveTab('history')
            }} className="flex flex-1 items-center text-[#fff] gap-2 cursor-pointer px-4 border-r border-[#958FBC]">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{historyCount} History</span>
            </div>
        </div>
    </div>
  );
}
