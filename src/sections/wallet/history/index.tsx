import Transaction from "./transaction";
import Gaming from "./gaming";

export default function History({ type }: { type: number }) {
    return (
        <div className="pb-[20px]">
            <div className="rounded-lg overflow-hidden shadow-lg">
                {
                    type === 1 && <Transaction />
                }

                {
                    type === 2 && <Gaming />
                }
            </div>
        </div>
    )
}