import Loading from "@/components/loading";
import Empty from "@/components/empty";

export default function Tokens(props: any) {
    const { tokens, isLoading } = props;

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

                        </tr>
                    </thead>
                    <tbody className="" >
                        {
                            isLoading && (
                                <tr>
                                    <td colSpan={4} className="py-4">
                                        <div className="flex justify-center items-center">
                                            <Loading />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        {
                            !isLoading && tokens.map((token: any) => (
                                <tr className="hover:bg-[#23263B] transition" key={token.symbol}>
                                    <td className="py-4 pl-[30px]" >
                                        <div className="flex items-center gap-2">
                                            {
                                                token.icon && (
                                                    <img src={token.icon} alt={token.name} className="w-6 h-6" />
                                                ) 
                                            }
                                            <span>{ token.name }</span>
                                        </div>
                                    </td>
                                    <td className="pl-[30px]">${ token.price || '-' }</td>
                                    <td className="pl-[30px]">{ token.balance || '-' }</td>
                                    <td className="pl-[30px]">${ token.value || '-' }</td>

                                </tr>
                            ))
                        }
                        {
                            !isLoading && tokens.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-[40px]">
                                        <div className="flex justify-center items-center">
                                            <Empty />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    )
}