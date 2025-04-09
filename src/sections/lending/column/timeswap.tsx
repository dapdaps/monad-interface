import LazyImage from '@/components/layz-image';
import clsx from 'clsx';
import { numberFormatter } from '@/utils/number-formatter';
import { PopoverPlacement } from '@/components/popover';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';
import DescriptionTitle from '@/sections/lending/components/description-title';
import ColumnOrderIcon from '@/sections/lending/components/column-order-icon';
import ExpandIcon from '@/sections/lending/components/expand-icon';

dayjs.extend(duration);

export const timeswap = async (params: any) => {
  const { currentMarket } = params;

  return {
    columns: [
      {
        title: "Pools",
        dataIndex: "pools",
        key: "pools",
        align: "left",
        render: (record: any, index: number) => {
          return (
            <div className="flex items-center gap-[8px]">
              <div className="flex items-center shrink-0">
                {
                  record.tokens.map((token: any, idx: number) => (
                    <LazyImage
                      src={token.icon}
                      alt={token.symbol}
                      width={32}
                      height={32}
                      containerClassName={clsx("border border-[#3E3965] rounded-full overflow-hidden shrink-0", idx > 0 && "ml-[-7px]")}
                      key={`${index}-${idx}`}
                    />
                  ))
                }
              </div>
              <div className="flex-1">
                {record.tokens.map((token: any, idx: number) => token.symbol).join("/")}
              </div>
            </div>
          );
        },
      },
      {
        title: () => {
          return (
            <>
              <div>TVL</div>
              <ColumnOrderIcon />
            </>
          );
        },
        dataIndex: "tvl",
        key: "tvl",
        width: 110,
        align: "left",
        render: (record: any) => {
          return numberFormatter(record.poolData?.tvl, 2, true, { isShort: true, isShortUppercase: true, prefix: "$" });
        }
      },
      {
        title: () => {
          return (
            <>
              <div>APR</div>
              <ColumnOrderIcon />
            </>
          );
        },
        dataIndex: "apr",
        key: "apr",
        width: 110,
        align: "left",
        render: (record: any) => {
          return numberFormatter(record.poolData?.apr, 2, true, { isShort: true, isShortUppercase: true }) + "%";
        }
      },
      {
        title: () => {
          return (
            <>
              <DescriptionTitle
                descriptionClassName="w-[153px]"
                className="!text-[#FFF] !font-Unbounded !text-[12px] !font-normal !leading-normal"
                description="Overcollateralisation at current spot prices"
                descriptionPlacement={PopoverPlacement.TopRight}
              >
                CDP
              </DescriptionTitle>
              <ColumnOrderIcon />
            </>
          );
        },
        dataIndex: "cdp",
        key: "cdp",
        width: 110,
        align: "left",
        render: (record: any) => {
          return numberFormatter(record.poolData?.cdp, 2, true, { isShort: true, isShortUppercase: true }) + "%";
        }
      },
      {
        title: () => {
          return (
            <>
              <div>Maturity</div>
              <ColumnOrderIcon />
            </>
          );
        },
        dataIndex: "maturity",
        key: "maturity",
        width: 110,
        align: "left",
        render: (record: any) => {
          const maturity = dayjs(record.poolData?.maturity * 1000);

          const [description, setDescription] = useState(() => {
            const now = dayjs();
            const diff = Math.max(maturity.diff(now), 0); // Ensure no negative duration
            const duration = dayjs.duration(diff);
            return `${String(duration.days()).padStart(2, '0')}d : ${String(duration.hours()).padStart(2, '0')}h : ${String(duration.minutes()).padStart(2, '0')}m : ${String(duration.seconds()).padStart(2, '0')}s left`;
          });

          useEffect(() => {
            const interval = setInterval(() => {
              const now = dayjs();
              const diff = Math.max(maturity.diff(now), 0); // Ensure no negative duration
              const duration = dayjs.duration(diff);
              setDescription(`${String(duration.days()).padStart(2, '0')}d : ${String(duration.hours()).padStart(2, '0')}h : ${String(duration.minutes()).padStart(2, '0')}m : ${String(duration.seconds()).padStart(2, '0')}s left`);
            }, 1000);

            return () => clearInterval(interval); // Cleanup on unmount
          }, [maturity]);

          return (
            <DescriptionTitle
              descriptionClassName="w-[180px] !pd-[11px_13px]"
              className="!text-[#FFF] !font-Unbounded !text-[12px] !font-normal !leading-normal"
              description={description}
              descriptionPlacement={PopoverPlacement.TopRight}
            >
              {dayjs(maturity).format('YYYY-MM-DD')}
            </DescriptionTitle>
          );
        }
      },
      {
        title: "",
        dataIndex: "action",
        key: "action",
        width: 50,
        align: "center",
        render: (record: any) => {
          const isExpanded = currentMarket?.id === record.id;

          return (
            <ExpandIcon isExpanded={isExpanded} />
          );
        }
      },
    ],
  };
};
