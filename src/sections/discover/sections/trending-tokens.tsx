import { useProgressRouter } from "@/hooks/use-progress-router";
import Card from "../components/card";
import Mouse from "../components/mouse";
import { formatLongText } from "@/utils/utils";
import { useState } from "react";
import { numberFormatter } from "@/utils/number-formatter";
import Big from "big.js";
import Skeleton from "react-loading-skeleton";
import SwapModal from "@/sections/swap/SwapModal";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRequest } from "ahooks";
import { get } from "@/utils/http";
import { monad } from "@/configs/tokens/monad-testnet";

// Initialize dayjs UTC plugin
dayjs.extend(utc);

const TrendingTokens = (props: any) => {
  const { } = props;

  const router = useProgressRouter();

  const { runAsync: getTokens, loading, data: tokens } = useRequest(async () => {
    try {
      const res = await get("/token/recommend");
      if (res.code !== 200) {
        return;
      }
      const _tokens = res.data || [];
      _tokens.forEach((token: any) => {
        const curr = Object.values(monad).find((_token: any) => _token.address.toLowerCase() === token.address.toLowerCase());
        token.icon = curr?.icon || "/assets/tokens/default_icon.png";
      });
      return _tokens;
    } catch (error) {
      console.log("get trending tokens failed: %o", error);
    }
  }, {
    refreshDeps: [],
  });

  const [showSwapModal, setShowSwapModal] = useState(false);
  const [clickedToken, setClickedToken] = useState<any>(null);

  return (
    <div className="pt-[clamp(1px,_5.16vw,_calc(var(--pc-1512)*0.0516))]">
      <div className="flex flex-col items-center">
        <div className="text-[18px] text-white font-[400] uppercase">
          Spotlight apps
        </div>
        <img
          src="/images/mainnet/discover/icon-down.svg"
          alt=""
          className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[16px] rotate-[180deg]"
        />
      </div>
      <Card
        title="Trending tokens"
        className="mx-auto"
        backdropClassName="!block [clip-path:polygon(0.9%_15%,99%_15%,99%_92.8%,96.7%_97.8%,78%_93.5%,76.5%_89.2%,70%_88.5%,60%_88%,50%_87.6%,35%_88%,23.4%_88.5%,21%_93%,2.7%_96.4%,2.7%_82%,0.9%_74.9%)]"
        onExploreAll={() => {
          router.push("/marketplace");
        }}
      >
        <div className="grid grid-cols-4 gap-x-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] gap-y-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] w-full pl-[100px] pr-[100px]">
          {
            loading ? [...new Array(12).fill(0)].map((_, idx) => (
              <TokenItemLoading key={idx} />
            )) : tokens?.map((token: any, index: number) => (
              <TokenItem
                key={index}
                token={token}
                onClick={() => {
                  setClickedToken(token);
                  setShowSwapModal(true);
                }}
              />
            ))
          }
        </div>
      </Card>
      <div className="flex flex-col items-center translate-y-[clamp(calc(var(--pc-1512)*-0.0397),_-3.97vw,_1px)]">
        <Mouse />
        <img
          src="/images/mainnet/discover/icon-down.svg"
          alt=""
          className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[20px]"
        />
        <div className="mt-[16px] text-[18px] text-white font-[400] uppercase">
          EXPLORE ALL APPS
        </div>
      </div>
      {showSwapModal && (
        <SwapModal
          show={showSwapModal}
          defaultOutputCurrency={clickedToken}
          outputCurrencyReadonly
          onClose={() => {
            setShowSwapModal(false);
          }}
          from="marketplace"
        />
      )}
    </div>
  );
};

export default TrendingTokens;

const PriceChart = ({ data }: { data: { price: string; symbol: string; timestamp: number; }[] }) => {
  if (!data || data.length === 0) {
    return <div className="w-[105px] h-[25px] bg-gray-800 rounded"></div>;
  }

  // Process data format, convert price to number and include timestamp
  const chartData = data.map((item, index) => ({
    value: parseFloat(item.price),
    timestamp: item.timestamp,
    index: index
  }));

  // Calculate price trend to determine line color
  const firstPrice = chartData[0]?.value || 0;
  const lastPrice = chartData[chartData.length - 1]?.value || 0;
  const isPositive = lastPrice >= firstPrice;

  // Calculate dynamic Y-axis range for better visualization
  const values = chartData.map(item => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;

  // Add padding to make fluctuations more visible
  const padding = range > 0 ? range * 0.1 : Math.max(minValue * 0.1, 0.01);
  const yAxisMin = Math.max(0, minValue - padding);
  const yAxisMax = maxValue + padding;

  return (
    <div className="w-[105px] h-[25px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <YAxis
            domain={[yAxisMin, yAxisMax]}
            hide={true}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                const timestamp = data?.timestamp;
                const utcTime = timestamp ? dayjs.utc(timestamp * 1000).format('YYYY-MM-DD HH:mm') : 'N/A';

                return (
                  <div className="whitespace-nowrap bg-black border border-gray-600 rounded px-2 py-1 text-xs shadow-lg z-10">
                    <p className="text-white">
                      Price: {numberFormatter(payload[0].value, 4, true, { prefix: "$", isZeroPrecision: true })}
                    </p>
                    <p className="text-gray-300">
                      Time: {utcTime}
                    </p>
                  </div>
                );
              }
              return null;
            }}
            cursor={{ stroke: '#666', strokeWidth: 1 }}
            position={{ x: 0, y: -50 }}
            allowEscapeViewBox={{ x: true, y: true }}
            wrapperStyle={{ zIndex: 1000 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#BFFF60" : "#FF008A"}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 3,
              fill: isPositive ? "#BFFF60" : "#FF008A",
              strokeWidth: 0
            }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const TokenItem = (props: any) => {
  const { token, onClick } = props;

  return (
    <div className="w-full flex flex-col gap-[clamp(1px,_0.99vw,_calc(var(--pc-1512)*0.0099))] p-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))_clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))_clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] border border-[#27272A] hover:border-[#7262FF] hover:bg-[rgba(53,52,112,0.60)] hover:bg-[url('')] transition-all duration-150 bg-black rounded-[8px] bg-[radial-gradient(21.57%_137.97%_at_2.76%_0%,_rgba(80,70,229,0.30)_0%,_rgba(1,1,1,0.30)_100%)]">
      <div className="w-full flex justify-between items-center gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))]">
        <div className="flex items-center gap-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] flex-1">
          <img
            src={token.icon}
            alt=""
            className="w-[clamp(1px,_2.51vw,_calc(var(--pc-1512)*0.0251))] h-[clamp(1px,_2.51vw,_calc(var(--pc-1512)*0.0251))] object-center object-contain shrink-0"
          />
          <div className="flex-1 w-0">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1px,_1.19vw,_calc(var(--pc-1512)*0.0119))] text-white font-[500]">
              {token.symbol}
            </div>
            <div className="flex-1 text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] font-[400] text-[#8E97AD] flex items-end gap-[clamp(1px,_0.33vw,_calc(var(--pc-1512)*0.0033))] whitespace-nowrap">
              <div className="max-w-[clamp(1px,_5.69vw,_calc(var(--pc-1512)*0.0569))] overflow-hidden text-ellipsis">
                {formatLongText(token.name, 5, 4)}
              </div>
              <div className="overflow-hidden text-ellipsis text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] translate-y-[-1px]">
                {formatLongText(token.address === "native" ? "0x0000000000000000000000000000000000000000" : token.address, 5, 4)}
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex justify-end items-center">
          <button
            type="button"
            className="group w-[clamp(1px,_2.31vw,_calc(var(--pc-1512)*0.0231))] h-[clamp(1px,_2.31vw,_calc(var(--pc-1512)*0.0231))] text-[#8E97AD] transition-all duration-150 hover:border-[#836EF9] hover:bg-[radial-gradient(50%_66%_at_46%_50%,_#553BE4_0%,_#221662_100%)] hover:text-[#FFF] flex justify-center items-center shrink-0 border border-[#2F3543] rounded-[6px] backdrop-blur-[15px] bg-[rgba(25,25,26,0.60)]"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] h-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] shrink-0 group-hover:[filter:drop-shadow(0_0_10px_rgba(255,255,255,0.60))]"
            >
              <path d="M9.5 5.06218C10.1667 5.44708 10.1667 6.40933 9.5 6.79423L2.23205 10.9904C1.34602 11.5019 0.354474 10.5104 0.866025 9.62436L2.71133 6.4282C2.88996 6.1188 2.88996 5.7376 2.71132 5.4282L0.866025 2.23205C0.354474 1.34602 1.34602 0.354474 2.23205 0.866025L9.5 5.06218Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))]">
        <div className="flex-1 flex items-center gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))]">
          <div className="text-white text-[clamp(1px,_1.19vw,_calc(var(--pc-1512)*0.0119))] font-[400]">
            {numberFormatter(token.price, 2, true, { isShort: true, prefix: "$", isZeroPrecision: true })}
          </div>
          <div className="flex items-center gap-[clamp(1px,_0.26vw,_calc(var(--pc-1512)*0.0026))]">
            <svg
              width="9"
              height="7"
              viewBox="0 0 9 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[clamp(1px,_0.60vw,_calc(var(--pc-1512)*0.0060))] h-[clamp(1px,_0.46vw,_calc(var(--pc-1512)*0.0046))] shrink-0"
              style={{
                color: Big(token.price_change_percent_24h || 0).gte(0) ? "#BFFF60" : "#FF008A",
                transform: Big(token.price_change_percent_24h || 0).gte(0) ? "rotate(0deg)" : "rotate(180deg)",
              }}
            >
              <path d="M4.5 0L8.39711 6.75H0.602886L4.5 0Z" fill="currentColor" />
            </svg>
            <div
              className="text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))]"
              style={{
                color: Big(token.price_change_percent_24h || 0).gte(0) ? "#BFFF60" : "#FF008A",
              }}
            >
              {numberFormatter(token.price_change_percent_24h, 2, true, { isShort: true, isZeroPrecision: true, isLessPrecision: false })}%
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <PriceChart data={token.price_7day || []} />
        </div>
      </div>
    </div>
  );
};

const TokenItemLoading = (props: any) => {
  const { } = props;

  return (
    <div className="w-full flex flex-col gap-[clamp(1px,_0.99vw,_calc(var(--pc-1512)*0.0099))] p-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))_clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))_clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] border border-[#27272A] hover:border-[#7262FF] hover:bg-[rgba(53,52,112,0.60)] hover:bg-[url('')] transition-all duration-150 bg-black rounded-[8px] bg-[radial-gradient(21.57%_137.97%_at_2.76%_0%,_rgba(80,70,229,0.30)_0%,_rgba(1,1,1,0.30)_100%)]">
      <div className="w-full flex justify-between items-center gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))]">
        <div className="flex items-center gap-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] flex-1">
          <Skeleton
            width="clamp(1px, 2.51vw, calc(var(--pc-1512)*0.0251))"
            height="clamp(1px, 2.51vw, calc(var(--pc-1512)*0.0251))"
            borderRadius="clamp(1px, 0.26vw, calc(var(--pc-1512)*0.0026))"
          />
          <div className="flex-1 w-0">
            <Skeleton
              width="clamp(1px, 3.97vw, calc(var(--pc-1512)*0.0397))"
              height="clamp(1px, 1.32vw, calc(var(--pc-1512)*0.0132))"
              borderRadius="clamp(1px, 0.26vw, calc(var(--pc-1512)*0.0026))"
            />
            <div className="flex-1 text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] font-[400] text-[#8E97AD] flex items-end gap-[clamp(1px,_0.33vw,_calc(var(--pc-1512)*0.0033))] whitespace-nowrap">
              <Skeleton
                width="clamp(1px, 4.43vw, calc(var(--pc-1512)*0.0443))"
                height="clamp(1px, 0.93vw, calc(var(--pc-1512)*0.0093))"
                borderRadius="clamp(1px, 0.26vw, calc(var(--pc-1512)*0.0026))"
              />
              <Skeleton
                width="clamp(1px, 3.31vw, calc(var(--pc-1512)*0.0331))"
                height="clamp(1px, 0.93vw, calc(var(--pc-1512)*0.0093))"
                borderRadius="clamp(1px, 0.26vw, calc(var(--pc-1512)*0.0026))"
              />
            </div>
          </div>
        </div>
        <div className="shrink-0 flex justify-end items-center">
          <Skeleton
            width="clamp(1px, 2.31vw, calc(var(--pc-1512)*0.0231))"
            height="clamp(1px, 2.31vw, calc(var(--pc-1512)*0.0231))"
            borderRadius="clamp(1px, 0.26vw, calc(var(--pc-1512)*0.0026))"
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))]">
        <div className="flex-1 flex items-center gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))]">
          <Skeleton
            width="clamp(1px, 3.97vw, calc(var(--pc-1512)*0.0397))"
            height="clamp(1px, 1.32vw, calc(var(--pc-1512)*0.0132))"
            borderRadius="clamp(1px, 0.26vw, calc(var(--pc-1512)*0.0026))"
          />
          <Skeleton
            width="clamp(1px, 2.65vw, calc(var(--pc-1512)*0.0265))"
            height="clamp(1px, 0.93vw, calc(var(--pc-1512)*0.0093))"
            borderRadius="clamp(1px, 0.26vw, calc(var(--pc-1512)*0.0026))"
          />
        </div>
        <div className="shrink-0">

        </div>
      </div>
    </div>
  );
};
