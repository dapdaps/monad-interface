import React from "react";

interface LeaderBoardItem {
  dapp: string;
  uniqueNads: number;
  transactions: number;
  volume: number;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  data?: LeaderBoardItem[];
}

const getMax = (data: LeaderBoardItem[], key: keyof LeaderBoardItem) => {
  return Math.max(...data.map((item) => item[key] as number));
};


const Modal: React.FC<ModalProps> = ({ open, onClose, data = leaderboardData }) => {
  if (!open) return null;

  const maxUniqueNads = getMax(data, "uniqueNads");
  const maxTransactions = getMax(data, "transactions");
  const maxVolume = getMax(data, "volume");

  return (
    <div className="fixed inset-0 z-50 flex items-center font-Unbounded text-[12px] text-white justify-center">
      <div className="bg-[#2B294A] rounded-xl border border-[#2B294A] shadow-lg w-full max-w-2xl relative">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-white">
            <thead>
              <tr className="border-b border-[#38365E]">
                <th className="py-2 px-3">dapp</th>
                <th className="py-2 px-3">Unique nads</th>
                <th className="py-2 px-3">Transactions</th>
                <th className="py-2 px-3">Volume (MON)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.dapp} className="border-b border-[#38365E] last:border-0">
                  <td className="py-2 px-3 whitespace-nowrap">{item.dapp}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <span className="min-w-[48px] font-mono">{item.uniqueNads.toLocaleString()}</span>
                      <div className="flex-1 h-2 bg-purple-900 rounded">
                        <div
                          className="h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded"
                          style={{ width: `${(item.uniqueNads / maxUniqueNads) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <span className="min-w-[48px] font-mono">{item.transactions.toLocaleString()}</span>
                      <div className="flex-1 h-2 bg-purple-900 rounded">
                        <div
                          className="h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded"
                          style={{ width: `${(item.transactions / maxTransactions) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <span className="min-w-[48px] font-mono">{item.volume.toLocaleString()}</span>
                      <div className="flex-1 h-2 bg-purple-900 rounded">
                        <div
                          className="h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded"
                          style={{ width: `${(item.volume / maxVolume) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const leaderboardData: LeaderBoardItem[] = [
  { dapp: "Uniswap", uniqueNads: 5823, transactions: 39688, volume: 5336 },
  { dapp: "Pancake", uniqueNads: 4823, transactions: 25449, volume: 6174 },
  { dapp: "LFG", uniqueNads: 3602, transactions: 24375, volume: 42035 },
  { dapp: "Kuru", uniqueNads: 2521, transactions: 39524, volume: 6409 },
  { dapp: "Timeswap", uniqueNads: 1923, transactions: 51568, volume: 63582 },
  { dapp: "Magic Eden", uniqueNads: 1602, transactions: 25707, volume: 7764 },
  { dapp: "WooFi", uniqueNads: 1289, transactions: 1289, volume: 48900 },
  { dapp: "LootGo", uniqueNads: 1002, transactions: 25510, volume: 2257 },
  { dapp: "Kizzy", uniqueNads: 845, transactions: 10680, volume: 126 },
  { dapp: "Opensea", uniqueNads: 623, transactions: 4235, volume: 4523 },
];

export default Modal;
