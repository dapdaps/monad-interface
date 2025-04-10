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
import LabelValue from '@/sections/lending/components/label-value';

dayjs.extend(duration);

export const timeswap = async (params: any) => {
  const {
    currentMarket,
    currentYoursMarket,
    marketsOrderKey,
    marketsOrderDirection,
    marketsUniqueKey = "id",
    yoursOrderKey,
    yoursOrderDirection,
    yoursUniqueKey = "id",
    toggleMarketsOrderDirection,
    toggleYoursOrderDirection,
    isMobile
  } = params;

  let marketColumns = [
    {
      title: "Pools",
      dataIndex: "pools",
      key: "pools",
      mdWidth: "66.66%",
      mdSort: 1,
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
            <ColumnOrderIcon
              dataIndex="tvl"
              orderKey={marketsOrderKey}
              direction={marketsOrderDirection}
              onClick={toggleMarketsOrderDirection}
            />
          </>
        );
      },
      dataIndex: "tvl",
      key: "tvl",
      width: 110,
      mdWidth: "33.33%",
      mdSort: 3,
      align: "left",
      render: (record: any) => {
        const _tvl = numberFormatter(record.poolData?.tvl, 2, true, { isShort: true, isShortUppercase: true, prefix: "$" });
        if (isMobile) {
          return (
            <LabelValue label="TVL" className="flex-col gap-[4px] !items-start mt-[20px]">
              {_tvl}
            </LabelValue>
          );
        }
        return _tvl;
      }
    },
    {
      title: () => {
        return (
          <>
            <div>APR</div>
            <ColumnOrderIcon
              dataIndex="apr"
              orderKey={marketsOrderKey}
              direction={marketsOrderDirection}
              onClick={toggleMarketsOrderDirection}
            />
          </>
        );
      },
      dataIndex: "apr",
      key: "apr",
      width: 110,
      mdWidth: "33.33%",
      mdSort: 2,
      align: "left",
      render: (record: any) => {
        const apr = numberFormatter(record.poolData?.apr, 2, true, { isShort: true, isShortUppercase: true }) + "%";
        if (isMobile) {
          return (
            <div className="flex justify-end items-center gap-[4px] whitespace-nowrap overflow-hidden">
              <div className="text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
                APR
              </div>
              <div className="text-[#BFFF60] font-Unbounded text-[12px] font-normal leading-normal">
                {apr}
              </div>
            </div>
          );
        }
        return apr;
      }
    },
    {
      title: () => {
        return (
          <>
            <DescriptionTitle
              descriptionClassName="w-[153px] !p-[5px_10px]"
              className="!text-[#A6A6DB] !text-[12px]"
              description="Overcollateralisation at current spot prices"
              descriptionPlacement={PopoverPlacement.TopRight}
            >
              CDP
            </DescriptionTitle>
            <ColumnOrderIcon
              dataIndex="cdp"
              orderKey={marketsOrderKey}
              direction={marketsOrderDirection}
              onClick={toggleMarketsOrderDirection}
            />
          </>
        );
      },
      dataIndex: "cdp",
      key: "cdp",
      width: 110,
      mdWidth: "33.33%",
      mdSort: 4,
      align: "left",
      render: (record: any) => {
        const _cdp = numberFormatter(record.poolData?.cdp, 2, true, { isShort: true, isShortUppercase: true }) + "%";
        if (isMobile) {
          return (
            <LabelValue label="CDP" className="flex-col gap-[4px] !items-start mt-[20px]">
              {_cdp}
            </LabelValue>
          );
        }
        return _cdp;
      }
    },
    {
      title: () => {
        return (
          <>
            <div>Maturity</div>
            <ColumnOrderIcon
              dataIndex="maturity"
              orderKey={marketsOrderKey}
              direction={marketsOrderDirection}
              onClick={toggleMarketsOrderDirection}
            />
          </>
        );
      },
      dataIndex: "maturity",
      key: "maturity",
      width: 110,
      mdWidth: "33.33%",
      mdSort: 5,
      align: "left",
      render: (record: any) => {
        const maturity = dayjs(record.poolData?.maturity * 1000);
        const maturityContent = (
          <DescriptionTitle
            descriptionClassName="!pd-[11px_13px]"
            className="!text-[#FFF] !font-Unbounded !text-[12px] !font-normal !leading-normal"
            description={(
              <Countdown endTime={maturity} />
            )}
            descriptionPlacement={PopoverPlacement.TopRight}
          >
            {dayjs(maturity).format('YYYY-MM-DD')}
          </DescriptionTitle>
        );

        if (isMobile) {
          return (
            <LabelValue label="Maturity" className="flex-col gap-[4px] !items-start mt-[20px]">
              {maturityContent}
            </LabelValue>
          );
        }

        return maturityContent;
      }
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 50,
      align: "center",
      render: (record: any) => {
        const isExpanded = currentMarket?.[marketsUniqueKey] === record[marketsUniqueKey];

        return (
          <ExpandIcon isExpanded={isExpanded} />
        );
      }
    },
  ];
  let yoursColumns = [
    { ...marketColumns[0] },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 110,
      mdSort: 2,
      mdWidth: "33.33%",
      align: "left",
      render: (record: any) => {
        if (isMobile) {
          return (
            <div className="flex justify-end items-center gap-[4px] whitespace-nowrap overflow-hidden">
              <div className="text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
                Type
              </div>
              <div className="text-[#BFFF60] font-Unbounded text-[12px] font-normal leading-normal">
                {record.type.label}
              </div>
            </div>
          );
        }
        return record.type.label;
      }
    },
    {
      title: "Transition Price",
      dataIndex: "tp",
      key: "tp",
      width: 220,
      mdSort: 3,
      mdWidth: "66.66%",
      align: "left",
      render: (record: any) => {
        const _tp = (
          <div className="flex items-center gap-[4px]">
            <div className="">
              {numberFormatter(record.transitionPrice10, 2, true)}
            </div>
            <div className="text-[12px] font-[400]">
              {record.tokens[1].symbol} / {record.tokens[0].symbol}
            </div>
          </div>
        );
        if (isMobile) {
          return (
            <LabelValue label="Transition Price" className="flex-col gap-[4px] !items-start mt-[20px]">
              {_tp}
            </LabelValue>
          );
        }
        return _tp;
      }
    },
    {
      ...marketColumns[4],
      mdSort: 4,
      mdWidth: "33.33%",
      title: () => {
        return (
          <>
            <div>Maturity</div>
            <ColumnOrderIcon
              dataIndex="maturity"
              orderKey={yoursOrderKey}
              direction={yoursOrderDirection}
              onClick={toggleYoursOrderDirection}
            />
          </>
        );
      },
    },
    {
      ...marketColumns[5],
      render: (record: any) => {
        const isExpanded = currentYoursMarket?.[yoursUniqueKey] === record[yoursUniqueKey];

        return (
          <ExpandIcon isExpanded={isExpanded} />
        );
      }
    },
  ];

  if (isMobile) {
    marketColumns = marketColumns
      .slice(0, 5)
      .sort((a: any, b: any) => a.mdSort - b.mdSort)
      .map((it: any) => {
        if (it.mdWidth) {
          return {
            ...it,
            width: it.mdWidth,
          };
        }
        return it;
      });
    yoursColumns = yoursColumns
      .slice(0, 4)
      .sort((a: any, b: any) => a.mdSort - b.mdSort)
      .map((it: any) => {
        if (it.mdWidth) {
          return {
            ...it,
            width: it.mdWidth,
          };
        }
        return it;
      });
  }

  return {
    marketColumns,
    yoursColumns,
  };
};

const Countdown = (props: any) => {
  const {
    endTime,
    className,
  } = props;

  const calc = () => {
    const now = dayjs(new Date());
    const diff = Math.max(endTime.diff(now), 0); // Ensure no negative duration
    const [dayMs, hourMs, minMs, sMs] = [1000 * 60 * 60 * 24, 1000 * 60 * 60, 1000 * 60, 1000];
    const days = Math.floor(diff / dayMs);
    const lastHourMs = diff % dayMs;
    const hours = Math.floor(lastHourMs / hourMs);
    const lastMinMs = lastHourMs % hourMs;
    const mins = Math.floor(lastMinMs / minMs);
    const lastSecMs = lastMinMs % minMs;
    const secs = Math.floor(lastSecMs / sMs);
    return `${days.toString().padStart(2, '0')}d : ${hours.toString().padStart(2, '0')}h : ${mins.toString().padStart(2, '0')}m : ${secs.toString().padStart(2, '0')}s left`;
  };

  const [description, setDescription] = useState<any>(calc());

  useEffect(() => {
    const interval = setInterval(() => {
      setDescription(calc());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [endTime]);

  return (
    <div className={clsx("", className)}>{description}</div>
  );
};
