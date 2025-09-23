import InputNumber from "@/components/input-number";
import { useCreate } from "./hooks/use-create";
import { RPSMoves } from "./config";
import clsx from "clsx";
import HexagonButton from "@/components/button/hexagon";

const RPS = (props: any) => {

  const {
    moves,
    onSelectMove,
    onCreate,
    amount,
    setAmount,
    token,
    balance,
    buttonValid,
  } = useCreate();

  return (
    <div className="mainnet-content text-white flex flex-col gap-[10px]">
      <div className="border border-white p-1">
        <h3>List</h3>
        <div className=""></div>
      </div>
      <div className="border border-white p-1">
        <h3>Create</h3>
        <div className="">
          <div className="">
            <InputNumber
              value={amount}
              onNumberChange={setAmount}
              className="bg-[rgba(0,0,0,0.50)] w-full border border-white rounded-sm p-2"
            />
            <div className="flex items-center justify-between">
              <div className="">
                {token?.symbol}
              </div>
              <div className="">
                {balance}
              </div>
            </div>
          </div>
          <ul className="mt-[10px]">
            {
              [...new Array(3).fill(0)].map((_, index) => (
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
                            moves[index] === item.value ? "border-[#BFFF60] bg-[#BFFF60] text-black" : "border-white text-white"
                          )}
                          onClick={() => {
                            onSelectMove(item.value, index);
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
            onClick={onCreate}
            loading={buttonValid.loading}
            disabled={buttonValid.disabled}
          >
            {buttonValid.text}
          </HexagonButton>
        </div>
      </div>
      <div className="border border-white p-1">
        <h3>Play</h3>
        <div className=""></div>
      </div>
      <div className="border border-white p-1">
        <h3>History</h3>
        <div className=""></div>
      </div>
    </div>
  );
};

export default RPS;
