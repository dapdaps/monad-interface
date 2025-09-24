import InputNumber from "@/components/input-number";
import { useCreate } from "./hooks/use-create";
import { RPS_MOVES_ROUND, RPSMoves } from "./config";
import clsx from "clsx";
import HexagonButton from "@/components/button/hexagon";
import { useRPS } from "./hooks";
import { useHistory } from "./hooks/use-history";
import GridTable from "@/components/flex-table/grid-table";
import { formatLongText } from "@/utils/utils";
import { numberFormatter } from "@/utils/number-formatter";
import Pagination from "@/components/pagination";
import dayjs from "dayjs";
import { useJoin } from "./hooks/use-join";
import JoinRoomModal from "./components/join/modal";
import { useClaim } from "./hooks/use-claim";

const RPS = (props: any) => {

  const rps = useRPS();
  const create = useCreate(rps);
  const history = useHistory(rps);
  const join = useJoin(rps);
  const claim = useClaim(rps, history);

  return (
    <div className="mainnet-content text-white flex flex-col gap-[10px] overflow-y-auto pr-2 pb-[100px]">
      <div className="border border-white p-1">
        <h3 className="flex items-center gap-2">
          <div className="">List</div>
          <HexagonButton
            onClick={() => {
              rps.getList();
            }}
            loading={rps.loading}
            disabled={rps.loading}
            height={24}
          >
            Reload
          </HexagonButton>
        </h3>
        <div className="">
          <GridTable
            columns={[
              {
                dataIndex: "room_id",
                title: "Room",
                width: 100,
              },
              {
                dataIndex: "address",
                title: "Creator",
                width: 180,
                render: (record: any) => {
                  return `${formatLongText(record.address, 5, 4)}${record.isOwn ? " (Your Own)" : ""}`;
                },
              },
              {
                dataIndex: "bet_amount",
                title: "Bet",
                width: 100,
                render: (record: any) => {
                  return numberFormatter(record.bet_amount, 2, true);
                },
              },
              {
                dataIndex: "create_time",
                title: "Create Time",
                width: 200,
                render: (record: any) => {
                  return dayjs.utc(record.create_time * 1000).format("M/D/YYYY, HH:mm:ss UTC");
                },
              },
              {
                dataIndex: "join",
                title: "Join",
                width: 200,
                render: (record: any) => {
                  return (
                    <>
                      <HexagonButton
                        onClick={() => {
                          join.onJoinCheck(record);
                        }}
                        loading={record.loading}
                        disabled={record.loading}
                        height={24}
                        className="!text-[16px]"
                      >
                        Join
                      </HexagonButton>
                    </>
                  );
                },
              },
            ]}
            data={rps.list.data}
            loading={rps.loading}
          />
          <div className="flex justify-end items-center">
            <Pagination
              page={rps.list.page}
              totalPage={rps.list.pageTotal}
              pageSize={rps.list.pageSize}
              onPageChange={(_page: number) => {
                rps.onPageChange(_page);
              }}
            />
          </div>
        </div>
      </div>
      <div className="border border-white p-1">
        <h3>Create</h3>
        <div className="">
          <div className="">
            <InputNumber
              value={create.amount}
              onNumberChange={create.setAmount}
              className="bg-[rgba(0,0,0,0.50)] w-full border border-white rounded-sm p-2"
            />
            <div className="flex items-center justify-between">
              <div className="">
                {rps.betToken.symbol}
              </div>
              <div className="">
                {rps.betTokenBalance}
              </div>
            </div>
          </div>
          <ul className="mt-[10px]">
            {
              [...new Array(RPS_MOVES_ROUND).fill(0)].map((_, index) => (
                <li key={index}>
                  <h4>Round {index + 1}</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {
                      Object.values(RPSMoves).map((item) => (
                        <button
                          type="button"
                          key={item.value}
                          className={clsx(
                            "w-[80px] h-[80px] flex justify-center items-center border rounded-sm",
                            create.moves[index] === item.value ? "border-[#BFFF60] bg-[#BFFF60] text-black" : "border-white text-white"
                          )}
                          onClick={() => {
                            create.onSelectMove(item.value, index);
                          }}
                        >
                          {item.label}
                        </button>
                      ))
                    }
                  </div>
                </li>
              ))
            }
          </ul>
          <HexagonButton
            className="mt-[10px] w-full"
            onClick={create.onCreate}
            loading={create.buttonValid.loading}
            disabled={create.buttonValid.disabled}
          >
            {create.buttonValid.text}
          </HexagonButton>
        </div>
      </div>
      <div className="border border-white p-1">
        <h3 className="flex items-center gap-2">
          <div className="">History</div>
          <HexagonButton
            onClick={() => {
              history.getList();
            }}
            loading={history.loading}
            disabled={history.loading}
            height={24}
          >
            Reload
          </HexagonButton>
        </h3>
        <div className="">
          <GridTable
            columns={[
              {
                dataIndex: "address",
                title: "Creator",
                width: 100,
                render: (record: any) => {
                  return `${formatLongText(record.address, 5, 4)}${record.isCreatorOwn ? " (Your Own)" : ""}`;
                },
              },
              {
                dataIndex: "player_address",
                title: "Player",
                width: 100,
                render: (record: any) => {
                  return `${formatLongText(record.player_address, 5, 4)}${record.isPlayerOwn ? " (Your Own)" : ""}`;
                },
              },
              {
                dataIndex: "bet_amount",
                title: "Bet",
                width: 100,
                render: (record: any) => {
                  return numberFormatter(record.bet_amount, 2, true);
                },
              },
              {
                dataIndex: "result",
                title: "Result",
                width: 100,
                render: (record: any) => {
                  return numberFormatter(record.bet_amount, 2, true);
                },
              },
              {
                dataIndex: "verify",
                title: "Verification",
                width: 100,
                render: (record: any) => {
                  return (
                    <HexagonButton
                      onClick={() => {
                        window?.open(`https://testnet.monadexplorer.com/tx/${record.end_tx_hash}`, "_blank");
                      }}
                      loading={false}
                      disabled={false}
                      height={24}
                      className="!text-[16px]"
                    >
                      Verification
                    </HexagonButton>
                  );
                },
              },
            ]}
            data={history.list.data}
            loading={history.loading}
          />
          <div className="flex justify-end items-center">
            <Pagination
              page={history.list.page}
              totalPage={history.list.pageTotal}
              pageSize={history.list.pageSize}
              onPageChange={(_page: number) => {
                history.onPageChange(_page);
              }}
            />
          </div>
        </div>
      </div>
      <JoinRoomModal
        open={join.open}
        onClose={join.onClose}
        room={join.room}
        moves={join.moves}
        onSelectMove={join.onSelectMove}
        buttonValid={join.buttonValid}
        onJoin={join.onJoin}
        betTokenBalance={rps.betTokenBalance}
        betToken={rps.betToken}
      />
    </div>
  );
};

export default RPS;
