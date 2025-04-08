import clsx from 'clsx';
import Popover, { PopoverPlacement, PopoverTrigger } from '@/components/popover';
import { useLendingContext } from '@/sections/lending/context';
import { AnimatePresence, motion } from 'framer-motion';
import LazyImage from '@/components/layz-image';
import { numberFormatter } from '@/utils/number-formatter';
import { LENDING_ACTION_TYPE_MAP } from '@/sections/lending/config';

const LendingMarket = (props: any) => {
  const {} = props;

  const {
    config,
    toggleCurrentMarket,
    currentMarket,
    handleCurrentAction,
  } = useLendingContext();

  const columns = [
    {
      title: "Pools",
      dataIndex: "pools",
      key: "pools",
      align: "left",
      render: (record: any, index: number) => {

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
    },
    {
      title: () => {
        return (
          <>
            <Popover
              trigger={PopoverTrigger.Hover}
              placement={PopoverPlacement.Top}
              content={(
                <PopoverCard className="w-[153px]">
                  Overcollateralisation at current spot prices
                </PopoverCard>
              )}
            >
              <div className="underline underline-offset-4 decoration-dashed cursor-pointer">CDP</div>
            </Popover>
            <ColumnOrderIcon />
          </>
        );
      },
      dataIndex: "cdp",
      key: "cdp",
      width: 110,
      align: "left",
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
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 50,
      align: "center",
      render: (record: any) => {
        const isExpanded = currentMarket?.key === record.key;

        return (
          <ExpandIcon isExpanded={isExpanded} />
        );
      }
    },
  ];

  const data = config.markets.map((market: any, index: number) => {
    return {
      ...market,
      key: index + 1,
      tvl: index + 1,
      apr: index + 1,
      cdp: index + 1,
      maturity: index + 1,
    };
  });

  return (
    <div className="">
      <div className="flex items-center h-[46px] px-[10px] bg-[rgba(255,255,255,0.05)] border-[#4f4c70] border-t-[1px] border-b-[1px]">
        {
          columns.map((column) => (
            <div
              className={clsx(
                "h-full flex items-center gap-[5px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal px-[10px]",
                column.align === "right" ? "justify-end" : (column.align === "center" ? "justify-center" : "justify-start"),
              )}
              style={column.width ? {
                width: column.width,
                flexBasis: column.width,
                flexShrink: 0,
                flexGrow: 0,
              } : {
                flex: 1,
              }}
            >
              {typeof column.title === "function" ? column.title() : column.title}
            </div>
          ))
        }
      </div>
      <div className="">
        {
          data.map((row: any, rowIndex: number) => {
            const isExpanded = currentMarket?.key === row.key;

            return (
              <div className="overflow-hidden">
                <div
                  className={clsx(
                    "relative z-[2] flex items-center px-[10px] py-[14px] border-[#4f4c70] cursor-pointer transition-[background-color] duration-[150ms] ease-in-out]",
                    isExpanded ? "bg-[rgba(255,255,255,0.05)] border-b-0" : "bg-[#2B294A] border-b-[1px]",
                  )}
                  onClick={() => {
                    if (isExpanded) {
                      toggleCurrentMarket();
                      return;
                    }
                    toggleCurrentMarket(row);
                  }}
                >
                  {
                    columns.map((column, columnIndex) => (
                      <div
                        key={`${rowIndex}-${columnIndex}`}
                        className={clsx(
                          "flex items-center px-[10px]",
                          column.align === "right" ? "justify-end" : (column.align === "center" ? "justify-center" : "justify-start"),
                        )}
                        style={column.width ? {
                          width: column.width,
                          flexBasis: column.width,
                          flexShrink: 0,
                          flexGrow: 0,
                        } : {
                          flex: 1,
                        }}
                      >
                        {typeof column.render === "function" ? column.render(row, rowIndex) : (row as any)[column.dataIndex]}
                      </div>
                    ))
                  }
                </div>
                <AnimatePresence>
                  {
                    isExpanded && (
                      <motion.div
                        className="relative z-[1] overflow-hidden flex justify-between gap-[35px] items-end px-[10px] pt-[10px] pb-[18px] bg-[rgba(255,255,255,0.05)] border-[#4f4c70] border-b-[1px]"
                        initial={{
                          y: -100,
                          opacity: 0,
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                        }}
                        exit={{
                          y: -100,
                          opacity: 0,
                        }}
                      >
                        <div className="flex flex-col gap-[16px] items-stretch flex-1">
                          <LabelValue label="Liquidity">
                            <LazyImage
                              src={row.tokens[0].icon}
                              width={18}
                              height={18}
                              containerClassName="border border-[#3E3965] rounded-full overflow-hidden shrink-0"
                            />
                            <div className="">
                              {numberFormatter(7672, 2, true)}
                            </div>
                          </LabelValue>
                          <LabelValue label="Total Volume">
                            {numberFormatter(14744, 2, true, { prefix: "$" })}
                          </LabelValue>
                          <LabelValue label="Transition Price">
                            <div className="">
                              {numberFormatter(1.5, 2, true)}
                            </div>
                            <div className="text-[#A6A6DB]">
                              {row.tokens.map((t: any) => t.symbol).join("/")}
                            </div>
                            <img src="/images/lending/icon-exchange.png" alt="" className="shrink-0 w-[14px] object-contain object-center" />
                          </LabelValue>
                        </div>
                        <div className="flex items-center justify-end pr-[10px] gap-[12px] w-[384px] shrink-0">
                          <ActionVisibleButton
                            icon={LENDING_ACTION_TYPE_MAP.deposit.icon}
                            onClick={() => {
                              handleCurrentAction({
                                action: LENDING_ACTION_TYPE_MAP.deposit,
                                visible: true,
                                market: row,
                              });
                            }}
                          >
                            {LENDING_ACTION_TYPE_MAP.deposit.label}
                          </ActionVisibleButton>
                          <ActionVisibleButton
                            icon={LENDING_ACTION_TYPE_MAP.borrow.icon}
                            onClick={() => {
                              handleCurrentAction({
                                action: LENDING_ACTION_TYPE_MAP.borrow,
                                visible: true,
                                market: row,
                              });
                            }}
                          >
                            {LENDING_ACTION_TYPE_MAP.borrow.label}
                          </ActionVisibleButton>
                        </div>
                      </motion.div>
                    )
                  }
                </AnimatePresence>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default LendingMarket;

const ColumnOrderIcon = (props: any) => {
  const { className } = props;

  return (
    <button
      type="button"
      className={clsx("", className)}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 1V9M5 9L1 5.78947M5 9L9 5.78947"
          stroke="#A6A6DB"
          stroke-width="1.2"
          stroke-linecap="square"
        />
      </svg>
    </button>
  );
};

const PopoverCard = (props: any) => {
  const { className, children } = props;

  return (
    <div
      className={clsx(
        'p-[11px_8px_10px_14px] rounded-[6px] border border-[#645E8A] bg-[rgba(81,79,119,0.80)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px] text-[#D7D7F6] font-Unbounded text-[10px] font-light leading-normal',
        className
      )}
    >
      {children}
    </div>
  );
};

const ExpandIcon = (props: any) => {
  const { isExpanded } = props;

  return (
    <motion.svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        rotate: isExpanded ? 180 : 0,
      }}
    >
      <g filter="url(#filter0_i_33312_367)">
        <motion.path
          d="M5.26795 10C6.03775 11.3333 7.96225 11.3333 8.73205 10L12.1962 4C12.966 2.66666 12.0037 1 10.4641 1L3.5359 1C1.9963 1 1.03405 2.66667 1.80385 4L5.26795 10Z"
          animate={{
            fill: isExpanded ? "#BFFF60" : "#A6A6DB",
          }}
        />
      </g>
      <path d="M9.16506 10.25C8.20281 11.9167 5.79719 11.9167 4.83494 10.25L1.37083 4.25C0.408585 2.58333 1.61139 0.5 3.5359 0.5L10.4641 0.5C12.3886 0.5 13.5914 2.58333 12.6292 4.25L9.16506 10.25Z" stroke="black"/>
      <defs>
        <filter id="filter0_i_33312_367" x="0.53125" y="0" width="12.9375" height="12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-2" dy="-2"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_33312_367"/>
        </filter>
      </defs>
    </motion.svg>
  );
};

const LabelValue = (props: any) => {
  const { className, label, children, labelClassName, valueClassName } = props;

  return (
    <div className={clsx("flex justify-between items-center", className)}>
      <div className={clsx("text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal", labelClassName)}>
        {label}
      </div>
      <div className={clsx("flex items-center gap-[4px] text-[#FFF] font-Unbounded text-[12px] font-normal leading-normal", valueClassName)}>
        {children}
      </div>
    </div>
  );
};

const ActionVisibleButton = (props: any) => {
  const { className, onClick, children, icon } = props;

  return (
    <button
      type="button"
      className={clsx("flex justify-center items-center gap-[4px] w-[114px] h-[32px] shrink-0 rounded-[6px] bg-[#8B87FF] text-[#FFF] text-center font-Unbounded text-[12px] font-normal leading-[120%]", className)}
      onClick={onClick}
    >
      <img
        src={icon}
        alt=""
        className="shrink-0 object-center object-contain w-[10px]"
      />
      <div className="">{children}</div>
    </button>
  );
}
