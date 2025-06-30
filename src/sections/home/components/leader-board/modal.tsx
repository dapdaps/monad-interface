import React, { useMemo } from "react";
import { useLeaderBoardDapp } from "./useLeaderBoard";
import { addressFormated } from "@/utils/balance";
import CircleLoading from "@/components/circle-loading";
interface LeaderBoardItem {
  dapp: string;
  uniqueNads: number;
  transactions: number;
  volume: number;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  type: 'dapp' | 'nadsa';
}

const AscIcon = () => {
  return <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.18912 12.8764C4.58825 13.4295 5.41175 13.4295 5.81088 12.8764L8.1861 9.58521C8.6634 8.92384 8.19083 8 7.37522 8H2.62478C1.80917 8 1.3366 8.92384 1.8139 9.58521L4.18912 12.8764Z" fill="#836EF9" />
    <path d="M4.18912 1.1236C4.58825 0.570536 5.41175 0.570536 5.81088 1.12359L8.1861 4.41479C8.6634 5.07616 8.19083 6 7.37522 6H2.62478C1.80917 6 1.3366 5.07616 1.8139 4.41479L4.18912 1.1236Z" fill="#3E347C" />
  </svg>
}

const DescIcon = () => {
  return <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.18911 12.8764C3.58824 13.4295 4.41174 13.4295 4.81087 12.8764L7.18609 9.58521C7.66339 8.92384 7.19082 8 6.37521 8H1.62477C0.809163 8 0.336593 8.92384 0.813893 9.58521L3.18911 12.8764Z" fill="#3E347C" />
    <path d="M3.18911 1.1236C3.58824 0.570537 4.41174 0.570537 4.81087 1.12359L7.18609 4.41479C7.66339 5.07616 7.19082 6 6.37521 6H1.62477C0.809163 6 0.336593 5.07616 0.813893 4.41479L3.18911 1.1236Z" fill="#836EF9" />
  </svg>
}

const Sort = ({ sortType }: { sortType: 'asc' | 'desc' | null }) => {
  if (sortType === 'asc') {
    return <AscIcon />
  }

  if (sortType === 'desc') {
    return <DescIcon />
  }

  return <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.18912 12.8764C4.58825 13.4295 5.41175 13.4295 5.81088 12.8764L8.1861 9.58521C8.6634 8.92384 8.19083 8 7.37522 8H2.62478C1.80917 8 1.3366 8.92384 1.8139 9.58521L4.18912 12.8764Z" fill="#3E347C" />
    <path d="M4.18912 1.1236C4.58825 0.570536 5.41175 0.570536 5.81088 1.12359L8.1861 4.41479C8.6634 5.07616 8.19083 6 7.37522 6H2.62478C1.80917 6 1.3366 5.07616 1.8139 4.41479L4.18912 1.1236Z" fill="#3E347C" />
  </svg>

}

const names = {
  dapp: 'dapp',
  nadsa: 'nad',
}

const nameKeys = {
  dapp: 'users',
  nadsa: 'address',
}

const Modal: React.FC<ModalProps> = ({ open, onClose, type }) => {
  if (!open) return null;

  const { leaderboard, maxUniqueNads, maxTransactions, sortType, item, sort, userFront3, transactionsFront3, loading } = useLeaderBoardDapp({ type, defaultItem: type === 'dapp' ? 'user' : 'transactions' });

  return (
    <div className="fixed inset-0 z-50 flex items-center font-Unbounded text-[12px] text-[#D7D7F6] justify-end pr-[200px]" onClick={() => {
      onClose();
    }}>
      <div className="bg-[#2B294A] rounded-xl border border-[#2B294A] shadow-lg w-full max-w-2xl relative" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-x-auto min-h-[400px]">
          {
            loading && <div className="flex justify-center items-center min-h-[400px]">
              <CircleLoading size={20} />
            </div>
          }

          {
            !loading && <table className="min-w-full text-left text-[#D7D7F6]">
              <thead>
                <tr className="border-b border-[#38365E]">
                  <th className="py-2 px-3">{names[type]}</th>
                  {
                    type === 'dapp' && <th className="py-2 px-3 cursor-pointer select-none" onClick={() => sort('user')}>
                      <div className="flex gap-2 items-center">
                        <div>Unique nads</div>
                        <Sort sortType={item === 'user' ? sortType : null} />
                      </div>
                    </th>
                  }

                  <th className="py-2 px-3 cursor-pointer select-none" onClick={() => sort('transactions')}>
                    <div className="flex gap-2 items-center">
                      <div>Transactions</div>
                      <Sort sortType={item === 'transactions' ? sortType : null} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item, idx) => (
                  <tr key={item.id} className="border-b border-[#38365E] last:border-0">
                    <td className="py-2 px-3 whitespace-nowrap">
                      {
                        type === 'dapp' ? item.name : addressFormated(item.address)
                      }
                    </td>
                    {
                      type === 'dapp' && <td className="py-2 px-3">
                        <div className="flex items-center gap-2 relative">
                          <span className="min-w-[48px] relative z-10 pl-[5px] pt-[2px]">{item.users}</span>
                          <div className="flex-1 absolute top-0 left-0 w-full">
                            <div
                              className={`h-5 ${item.users >= userFront3 ? 'bg-[#836EF9]' : 'bg-[#474590]'}`}
                              style={{ width: `${(item.users / maxUniqueNads) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    }
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2 relative">
                        <span className="min-w-[48px] relative z-10 pl-[5px] pt-[2px]">{item.transactions.toLocaleString()}</span>
                        <div className="flex-1 absolute top-0 left-0 w-full">
                          <div
                            className={`h-5 ${item.transactions >= transactionsFront3 ? 'bg-[#836EF9]' : 'bg-[#474590]'}`}
                            style={{ width: `${(item.transactions / maxTransactions) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;
