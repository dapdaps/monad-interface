import Pagination from "@/components/pagination";
import useGameRecord from "../hooks/use-game-record";

export default function Gaming() {
    const { gameRecord, isLoading, fetchGameRecord, page, pageTotal, PAGE_SIZE, setPage } = useGameRecord();

    return (
        <div>
            <table className="min-w-[600px] w-full text-[18px] max-h-[180px] overflow-y-auto">
                <thead className="sticky top-0 z-10 text-[18px]">
                    <tr className=" text-left font-[400] text-[#727D97]">
                        <th className="py-4 pl-[30px]">Type</th>
                        <th className="py-4 pl-[30px]">Assets</th>
                        <th className="py-4 pl-[30px]">Amount</th>
                        <th className="py-4 pl-[30px]">Value</th>
                        <th className="py-4 pl-[30px]">Time</th>
                        <th className="py-4 pl-[30px]">Wallet</th>
                    </tr>
                </thead>
                <tbody className="text-[16px]" >
                    <tr className=" hover:bg-[#23263B] transition" >
                        <td className="py-4 pl-[30px]" >
                            <div className="flex items-center gap-2">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_40235_1981)">
                                        <rect x="11" y="11" width="26" height="26" rx="4" fill="#101113" />
                                        <rect x="10.5" y="10.5" width="27" height="27" rx="4.5" stroke="#34304B" />
                                    </g>
                                    <path d="M31 30.4746V32H17V30.4746H31ZM24.4912 17V26.5389L27.8965 23.3152L28.9189 24.4315L23.7412 29.3335L18.5635 24.4315L19.585 23.3152L22.9912 26.5399V17H24.4912Z" fill="#727D97" />
                                    <defs>
                                        <filter id="filter0_d_40235_1981" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset />
                                            <feGaussianBlur stdDeviation="5" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_40235_1981" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_40235_1981" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                                <span>Sent</span>
                            </div>
                        </td>
                        <td className="pl-[30px]">Mon</td>
                        <td className="pl-[30px]">230.56</td>
                        <td className="pl-[30px]">$744.71</td>
                        <td className="pl-[30px] text-[#727D97]">
                            2025/10/03 20:39
                        </td>
                        <td className="pl-[30px]">
                            <div className="flex items-center gap-2">
                                <span className="text-[#727D97]">From</span>
                                <span>0x...2b35</span>
                                <svg className="cursor-pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.65217 9L13 1M13 1H6.46692M13 1V7.26087M3.6087 1H1V13H13V10.5" stroke="#727D97" stroke-width="1.5" />
                                </svg>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex justify-end">
                <Pagination
                    page={page}
                    totalPage={pageTotal}
                    pageSize={PAGE_SIZE}
                    onPageChange={(_page: number) => {
                        setPage(_page);
                    }}
                />
            </div>
        </div>
    )
}