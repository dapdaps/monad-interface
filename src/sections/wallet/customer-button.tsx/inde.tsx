export default function CustomerButton({ children }: { children: React.ReactNode }) {
    return (
        <button className="w-[131px] relative h-[50px] text-[18px] font-[500] text-white cursor-pointer bg-[url('/images/mainnet/wallet/customer-btn-bg.png')] bg-no-repeat bg-center bg-contain hover:bg-[url('/images/mainnet/wallet/customer-btn-bg-hover.png')] group">
            {children}
            <div className="absolute top-1/2 -translate-y-1/2 right-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_40077_3240)">
                        <path d="M22 16.9282L10 23.8564L14 16.9282L10 10L22 16.9282Z" fill="#BFFF60" />
                    </g>
                    <defs>
                        <filter id="filter0_d_40077_3240" x="0" y="0" width="32" height="33.8564" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.74902 0 0 0 0 1 0 0 0 0 0.376471 0 0 0 0.6 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40077_3240" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40077_3240" result="shape" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </button>
    )
}