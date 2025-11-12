import { numberFormatter } from "@/utils/number-formatter";
import { formatLongText } from "@/utils/utils";
import clsx from "clsx";
import { EMilitaryRank, MilitaryRank } from "../../config";
import TabTable from "./table";
import { GridTableAlign } from "@/components/flex-table/grid-table";

const Leaderboard = () => {
  const userInfo = {
    level: 6,
  };
  const topUsers = [
    {
      img: '/images/mainnet/arcade/guess-who/avatar-user-1.png',
      address: "0x635fa4477c7f9681a4ac88fa6147f441114e8655",
      level: 6,
      rp: 780,
    },
    {
      img: '/images/mainnet/arcade/guess-who/avatar-user-2.png',
      address: "0x635fa4477c7f9681a4ac88fa6147f441114e8656",
      level: 5,
      rp: 750,
    },
    {
      img: '/images/mainnet/arcade/guess-who/avatar-user-3.png',
      address: "0x635fa4477c7f9681a4ac88fa6147f441114e8657",
      level: 4,
      rp: 730,
    },
  ];
  const militaryRankList = Object.values(MilitaryRank);

  return (
    <div className="w-full">
      <div className="flex justify-center items-end gap-[78px] mt-[26px]">
        <TopUser user={topUsers[1]} rank={2} />
        <TopUser user={topUsers[0]} rank={1} />
        <TopUser user={topUsers[2]} rank={3} />
      </div>
      <div
        className="relative mt-[22px] h-[96px] grid gap-x-[4px]"
        style={{
          gridTemplateColumns: `repeat(${militaryRankList.length}, 1fr)`,
        }}
      >
        <button
          type="button"
          className="absolute top-[-34px] right-0 flex items-center gap-[4px] text-[14px] text-white font-Oxanium font-[400] leading-[100%]"
        >
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.11328 12.4502C7.31872 12.4502 7.51587 12.5325 7.66113 12.6777C7.80626 12.823 7.8877 13.0202 7.8877 13.2256C7.88758 13.4307 7.80612 13.6273 7.66113 13.7725C7.51587 13.9177 7.31872 14 7.11328 14H2.69043C2.48506 13.9999 2.2878 13.9177 2.14258 13.7725C1.99764 13.6273 1.91613 13.4307 1.91602 13.2256C1.91602 13.0203 1.99751 12.823 2.14258 12.6777C2.2878 12.5325 2.48506 12.4502 2.69043 12.4502H7.11328ZM7.80859 0.0683594C9.13648 -0.319018 10.3141 1.01608 9.76367 2.28516L6.44922 9.92773C5.88047 11.2379 4.0218 11.238 3.45312 9.92773L0.138672 2.28516C-0.411328 1.01601 0.766357 -0.318926 2.09473 0.0683594L4.49414 0.768555C4.79289 0.855715 5.11044 0.85577 5.40918 0.768555L7.80859 0.0683594Z" fill="currentColor" />
          </svg>
          <div className="">
            My Ranking
          </div>
        </button>
        {
          militaryRankList.reverse().map((rank) => (
            <div
              key={rank.value}
              className={clsx(
                "flex flex-col justify-center items-center gap-[9px] border",
                userInfo.level === rank.value ? "bg-[radial-gradient(50%_66%_at_47.77%_50%,_#553BE4_0%,_#221662_100%)] border-[#836EF9]" : "border-[rgba(131,110,249,0.25)] bg-[rgba(131,110,249,0.25)]",
              )}
            >
              <img src={rank.icon} alt="" className="w-[24px] h-[39px] object-center object-contain shrink-0" />
              <div className="text-center text-[16px] text-white font-Oxanium font-[600] leading-[100%]">
                {rank.name}
              </div>
            </div>
          ))
        }
      </div>
      <TabTable
        headerRowClassName="!pt-[19px] !pb-[15px]"
        columns={[
          {
            dataIndex: "rank",
            title: "Rank",
            width: 140,
            sort: false,
            render: (record: any) => {
              return (
                <div className="">
                  #{record.rank}
                </div>
              );
            },
          },
          {
            dataIndex: "user",
            title: "User",
            width: void 0,
            sort: false,
            render: (record: any) => {
              return (
                <div className="flex items-center gap-[10px]">
                  <div
                    className={clsx(
                      "rounded-full bg-center bg-no-repeat shrink-0",
                      record.rank === 1 ? "w-[32px] h-[32px] bg-[legnth:32px_32px] border-[2px] border-[#FED801]" : "w-[28px] h-[28px] bg-[legnth:28px_28px]"
                    )}
                    style={{
                      backgroundImage: `url(${record.avatar})`,
                    }}
                  />
                  <div className="">
                    {formatLongText(record.address, 5, 4)}
                  </div>
                </div>
              );
            },
          },
          {
            dataIndex: "military",
            title: "Military rank",
            width: 110,
            sort: false,
            render: (record: any) => {
              return (
                <div className="flex items-center gap-[5px]">
                  <img
                    src={MilitaryRank[record.level as EMilitaryRank].icon}
                    alt=""
                    className="w-[15px] h-[24px] object-center object-contain shrink-0"
                  />
                  <div className="">
                    {MilitaryRank[record.level as EMilitaryRank].name}
                  </div>
                </div>
              )
            },
          },
          {
            dataIndex: "reputationPoints",
            title: "Reputation Points",
            width: 140,
            sort: false,
            align: GridTableAlign.Right,
            render: (record: any) => {
              return (
                <div className="">
                  {numberFormatter(record.rp, 2, true, { isShort: true, isZeroPrecision: false })} RP
                </div>
              );
            },
          },
        ]}
        data={[
          { rank: 1, level: 1, rp: 10000, address: "0x1234567890123456789012345678901234567890", avatar: "/images/mainnet/arcade/guess-who/avatar-user-1.png" },
          { rank: 2, level: 2, rp: 8500, address: "0x9876543210987654321098765432109876543210", avatar: "/images/mainnet/arcade/guess-who/avatar-user-2.png" },
          { rank: 3, level: 3, rp: 7600, address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", avatar: "/images/mainnet/arcade/guess-who/avatar-user-3.png" },
          { rank: 4, level: 4, rp: 6920, address: "0x1234abcd5678ef901234abcd5678ef901234abcd", avatar: "/images/mainnet/arcade/guess-who/avatar-user-4.png" },
          { rank: 5, level: 5, rp: 5800, address: "0xaabbccddeeffaabbccddeeffaabbccddeeffaabb", avatar: "/images/mainnet/arcade/guess-who/avatar-user-5.png" },
          { rank: 6, level: 6, rp: 5100, address: "0x00112233445566778899aabbccddeeff00112233", avatar: "/images/mainnet/arcade/guess-who/avatar-user-6.png" },
          { rank: 7, level: 3, rp: 4800, address: "0x88889999aaaabbbbccccdddd88889999aaaabbbb", avatar: "/images/mainnet/arcade/guess-who/avatar-user-7.png" },
          { rank: 8, level: 2, rp: 4200, address: "0x55556666777788889999aaaabbbbccccdddd0000", avatar: "/images/mainnet/arcade/guess-who/avatar-user-1.png" },
          { rank: 9, level: 4, rp: 3700, address: "0xabcdef1234567890abcdef1234567890abcdef12", avatar: "/images/mainnet/arcade/guess-who/avatar-user-2.png" },
          { rank: 10, level: 1, rp: 3300, address: "0x123456abcdef123456abcdef123456abcdef1234", avatar: "/images/mainnet/arcade/guess-who/avatar-user-3.png" },
        ]}
        loading={false}
        page={1}
        pageSize={10}
        pageTotal={100}
        onPageChange={(page: number) => {
          console.log(page);
        }}
      />
    </div>
  )
}

export default Leaderboard;

const TopUser = (props: any) => {
  const { user, rank } = props;

  return (
    <div className="flex flex-col items-center gap-[30px]">
      <div
        className={clsx(
          "relative flex justify-center items-center w-[80px] h-[80px] border-[4px] rounded-full bg-center bg-[legnth:80px_80px] bg-no-repeat shrink-0",
          rank === 1 && "border-[#FED801] translate-y-[-10px]",
          rank === 2 && "border-[#DBDDDF]",
          rank === 3 && "border-[#D6B4A1]",
        )}
        style={{ backgroundImage: `url(${user.img})` }}
      >
        <img
          src={MilitaryRank[user.level as EMilitaryRank].icon}
          alt=""
          className="absolute w-[24px] h-[39px] object-center object-contain shrink-0 z-[1] bottom-[-20px]"
        />
      </div>
      <div className="text-center text-[16px] text-white font-Oxanium font-[600] leading-[100%]">
        <div className="">
          {formatLongText(user.address, 5, 4)}
        </div>
        <div className={clsx("mt-[8px]", rank === 1 && "text-[#FED801]")}>
          {numberFormatter(user.rp, 2, true)} RP
        </div>
      </div>
    </div>
  );
};
