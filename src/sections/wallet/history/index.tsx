import Transaction from "./transaction";
import Gaming from "./gaming";

export default function History({ type, refresh }: { type: number, refresh: number }) {
    return (
        <div className="pb-[20px] h-full">
            <div className="rounded-lg overflow-hidden h-full">
                {
                    type === 1 && <Transaction refresh={refresh} />
                }

                {
                    type === 2 && <Gaming refresh={refresh} />
                }
            </div>
        </div>
    )
}