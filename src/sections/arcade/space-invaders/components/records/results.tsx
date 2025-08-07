import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";
import { motion } from "framer-motion";
import FlexTable from "@/components/flex-table";
import { useUserData } from "../../hooks/use-user";
import { useEffect, useMemo } from "react";
import { numberFormatter } from "@/utils/number-formatter";
import Big from "big.js";
import { formatLongText } from "@/utils/utils";
import useToast from "@/hooks/use-toast";
import { LastGameStatusMap, LastGameStatus } from "../../config";
import { monadTestnet } from "viem/chains";
import Pagination from "@/components/pagination";
import Skeleton from "react-loading-skeleton";
import TimeAgo from "./time-ago";

const Results = (props: any) => {
  const { className } = props;

  const {
    formatRows,
    onVerifierOpen,
  } = useSpaceInvadersContext();
  const {
    userStatistics,
    userStatisticsLoading,
    getUserStatistics,
    userResultsPage,
    userResultsPageTotal,
    setUserResultsPage,
    userResultsPageSize,
    getUserResults,
    userResults,
    userResultsLoading,
  } = useUserData();
  const toast = useToast();

  const statistics = useMemo(() => {
    return [
      {
        label: "Profit / Loss",
        value: (
          <div className={clsx(Big(userStatistics?.profit || 0).gte(0) ? "text-[#BFFF60]" : "text-[#FF4A4A]")}>
            {
              numberFormatter(
                userStatistics?.profit,
                2,
                true,
                {
                  isLessPrecision: false,
                  prefix: Big(userStatistics?.profit || 0).gte(0) ? "+" : "",
                }
              )
            } MON
          </div>
        )
      },
      {
        label: "Total wagered",
        value: `${numberFormatter(userStatistics?.total_wagered, 2, true, { isLessPrecision: false })} MON`
      },
      {
        label: "Total played",
        value: numberFormatter(userStatistics?.total_played, 0, true, { isLessPrecision: false })
      },
    ];
  }, [userStatistics]);

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      width: 85,
      render: (text: any, record: any, idx: number) => {
        return (
          <div className="flex items-center gap-[5px]">
            <div className="">{formatLongText(record.game_id)}</div>
            <button
              type="button"
              className="w-[12px] h-[12px] flex-0 bg-[url('/images/arcade/space-invaders/icon-copy.png')] bg-no-repeat bg-center bg-contain"
              onClick={async () => {
                navigator.clipboard.writeText(record.game_id as string);
                toast.success({
                  title: `Copied game id ${record.game_id}`,
                }, "bottom-right");
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      width: 100,
      render: (text: any, record: any, idx: number) => {
        return <TimeAgo date={record.created_at} />;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 60,
      render: (text: any, record: any, idx: number) => {
        return (
          <div className={clsx(record.status === LastGameStatus.Lose ? "text-[#FF4A4A]" : "text-[#BFFF60]")}>
            {LastGameStatusMap[record.status as LastGameStatus]}
          </div>
        );
      },
    },
    {
      title: "Bet",
      dataIndex: "bet",
      width: 50,
      render: (text: any, record: any, idx: number) => {
        return numberFormatter(record.bet_amount, 2, true);
      },
    },
    {
      title: "Result",
      dataIndex: "result",
      width: 80,
      render: (text: any, record: any, idx: number) => {
        const resultMON = Big(record.bet_amount || 0).times(record.final_multiplier || 1).minus(record.bet_amount || 0);
        return (
          <div className={clsx(record.status === LastGameStatus.Lose ? "text-[#FF4A4A]" : "text-[#BFFF60]")}>
            {numberFormatter(resultMON, 2, true, { isLessPrecision: false, prefix: Big(resultMON).gte(0) ? "+" : "" })}
          </div>
        );
      },
    },
    {
      title: "Multiplier",
      dataIndex: "multiplier",
      width: 90,
      render: (text: any, record: any, idx: number) => {
        return numberFormatter(record.final_multiplier, 2, true) + "x";
      },
    },
    {
      title: "Floors",
      dataIndex: "floors",
      width: 70,
      render: (text: any, record: any, idx: number) => {
        const select_tiles = record.select_tiles?.split(",") || [];
        return select_tiles.length;
      },
    },
    {
      title: "Payout TX",
      dataIndex: "payout TX",
      width: 100,
      render: (text: any, record: any, idx: number) => {
        return (
          <div className="flex items-center gap-[20px] pl-[4px]">
            <button
              type="button"
              className="w-[12px] h-[12px] flex-0 bg-[url('/images/game/icon-link.png')] bg-no-repeat bg-center bg-contain"
              onClick={async () => {
                window.open(`${monadTestnet.blockExplorers?.default.url}/tx/${record.create_hash}`, "_blank");
              }}
            />
            <button
              type="button"
              className="w-[12px] h-[12px] flex-0 bg-[url('/images/arcade/space-invaders/icon-copy.png')] bg-no-repeat bg-center bg-contain"
              onClick={async () => {
                navigator.clipboard.writeText(record.create_hash as string);
                toast.success({
                  title: `Copied payout tx ${record.create_hash}`,
                }, "bottom-right");
              }}
            />
          </div>
        )
      },
    },
    {
      title: "Verify",
      dataIndex: "verify",
      width: 80,
      render: (text: any, record: any, idx: number) => {
        return (
          <div className="">
            <button
              type="button"
              className="rounded-[4px] flex items-center justify-center border border-[#A6A6DB] opacity-50 w-[49px] h-[22px] flex-shrink-0 text-[#A6A6DB] text-[12px] transition-all duration-300 hover:border-[#ACACE2] hover:bg-[#4D4D73] hover:text-white hover:opacity-100"
              onClick={() => {
                const rows = formatRows?.(record.rows, record.select_tiles?.split(",")?.map(((tile: string) => Number(tile))), record.deathfun_id);
                if (!rows) return;
                onVerifierOpen?.({
                  rows,
                  seed: record.seed,
                  seed_hash: record.seed_hash,
                });
              }}
            >
              Verify
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getUserResults();
    getUserStatistics();
  }, [userResultsPage]);

  return (
    <motion.div
      key="results"
      className={clsx("mt-[27px]", className)}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
    >
      <div className="px-[30px] grid grid-cols-3 gap-[15px]">
        {
          statistics.map((_statistic) => (
            <div className="rounded-[6px] bg-black/30 h-[72px] flex flex-col justify-center items-center gap-[4px]">
              <div className="text-[#A6A6DB]">{_statistic.label}</div>
              <div className="text-[18px] font-[600]">
                {
                  userStatisticsLoading ? (
                    <Skeleton width={100} height={20} borderRadius={6} />
                  ) : _statistic.value
                }
              </div>
            </div>
          ))
        }
      </div>
      <div className="mt-[10px]">
        <FlexTable
          columns={columns}
          list={userResults}
          loading={userResultsLoading}
          headClass="!px-[30px] !py-[6px]"
          bodyClass="!px-[30px] !py-[12px] !rounded-[0]"
          bodyClassName="max-h-[40dvh] overflow-y-auto overflow-x-hidden"
          loadingClassName="!py-[100px]"
        />
        <Pagination
          className="justify-end pr-[30px] mt-[10px]"
          page={userResultsPage}
          totalPage={userResultsPageTotal}
          pageSize={userResultsPageSize}
          onPageChange={(_page: number) => {
            setUserResultsPage(_page);
          }}
        />
      </div>
    </motion.div>
  );
};

export default Results;
