export default function History() {
    return (
        <div className="pb-[20px]">
            <div className="rounded-lg overflow-hidden shadow-lg">
                <table className="min-w-[600px] w-full text-[18px] max-h-[180px] overflow-y-auto">
                    <thead className="sticky top-0 z-10">
                        <tr className=" text-left font-[400] text-[#727D97]">
                            <th className="py-4 pl-[30px]">Assets</th>
                            <th className="py-4 pl-[30px]">Price</th>
                            <th className="py-4 pl-[30px]">Balance</th>
                            <th className="py-4 pl-[30px]">Value</th>
                            <th className="py-4 pl-[30px]">7 days</th>
                        </tr>
                    </thead>
                    <tbody className="" >
                        <tr className=" hover:bg-[#23263B] transition" >
                            <td className="py-4 pl-[30px]" >
                                <div className="flex items-center gap-2">
                                    <img src="/images/tokens/mon.png" alt="MON" className="w-6 h-6" />
                                    <span>MON</span>
                                </div>
                            </td>
                            <td className="pl-[30px]">$3.23</td>
                            <td className="pl-[30px]">230.56</td>
                            <td className="pl-[30px]">$744.71</td>
                            <td className="pl-[30px]">
                                <span className="text-[#BFFF60] flex items-center gap-1">
                                    ▲ 1.23%
                                </span>
                            </td>
                        </tr>
                        <tr className="  hover:bg-[#23263B] transition" >
                            <td className="py-4 pl-[30px]" >
                                <div className="flex items-center gap-2">
                                    <img src="/images/tokens/eth.png" alt="ETH" className="w-6 h-6" />
                                    <span>ETH</span>
                                </div>
                            </td>
                            <td className="pl-[30px]">$4200.23</td>
                            <td className="pl-[30px]">0.12023</td>
                            <td className="pl-[30px]">$519.42</td>
                            <td className="pl-[30px]">
                                <span className="text-[#FF47AA] flex items-center gap-1">
                                    ▼ 0.23%
                                </span>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}