import FlexTable from "@/components/flex-table";
import { memo, useMemo, useState } from "react";
import { useCodesContext } from "../../context";
import { formatLongText } from "@/utils/utils";
import Big from "big.js";
import Loading from "@/components/loading";
import useIsMobile from "@/hooks/use-isMobile";
import clsx from "clsx";

const Records = (props: any) => {
  const { className } = props;

  const pageSize = 10
  const { inviteRecordsLoading, inviteRecords, claimLoading, handleClaim } = useCodesContext()
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const unClaimRecords = useMemo(() => inviteRecords?.filter((record: any) => record?.status === 2), [inviteRecords])
  const unClaimAmount = useMemo(() => Big(unClaimRecords?.length ?? 0).times(0.25).toFixed(2), [unClaimRecords])
  const maxPage = useMemo(() => Math.ceil((inviteRecords?.length ?? 0) / pageSize), [inviteRecords])
  const pageRecords = useMemo(() => {
    if (isMobile) {
      return inviteRecords;
    }
    return inviteRecords?.slice((page - 1) * pageSize, page * pageSize);
  }, [inviteRecords, page, isMobile])
  const COLUMNS = useMemo<any>(() => {
    const _columns = [
      {
        title: "Invited",
        dataIndex: "invited",
        width: "45%",
        render: (text: string, record: any) => {
          return (
            <div className="flex items-center gap-[13px]">
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                {
                  record?.invitee_avatar ? (
                    <img src={record?.invitee_avatar} alt="" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="M15 0C23.28 0 30 6.72 30 15C30 23.28 23.28 30 15 30C6.72 30 0 23.28 0 15C0 6.72 6.72 0 15 0ZM6.0345 20.124C8.2365 23.409 11.5425 25.5 15.24 25.5C18.936 25.5 22.2435 23.4105 24.444 20.124C21.9476 17.7909 18.6569 16.4952 15.24 16.5C11.8226 16.4948 8.53127 17.7905 6.0345 20.124ZM15 13.5C16.1935 13.5 17.3381 13.0259 18.182 12.182C19.0259 11.3381 19.5 10.1935 19.5 9C19.5 7.80653 19.0259 6.66193 18.182 5.81802C17.3381 4.97411 16.1935 4.5 15 4.5C13.8065 4.5 12.6619 4.97411 11.818 5.81802C10.9741 6.66193 10.5 7.80653 10.5 9C10.5 10.1935 10.9741 11.3381 11.818 12.182C12.6619 13.0259 13.8065 13.5 15 13.5Z" fill="#6D7EA5" />
                    </svg>
                  )
                }
              </div>
              {
                record?.invitee_name ? (
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-white font-Unbounded text-[14px]">{record?.invitee_name}</span>
                    <span className="text-[#6D7EA5] font-Unbounded text-[12px] leading-[120%]">{formatLongText(record?.invitee, 5, 5)}</span>
                  </div>
                ) : (
                  <span className="text-white font-Unbounded text-[14px]">{formatLongText(record?.invitee, 5, 5)}</span>
                )
              }
            </div>
          )
        }
      },
      {
        title: "Stutus",
        dataIndex: "invited",
        width: "20%",
        render: (text: string, record: any) => {
          return (
            <>{(record?.status === 1) ? "Pending..." : "Active"}</>
          )
        }
      },
      {
        title: "Your rewards",
        dataIndex: "invited",
        width: "20%",
        render: (text: string, record: any) => {
          return <>{record?.status === 1 ? "-" : "0.25 MON"}</>
        }
      },
      {
        title: "Action",
        dataIndex: "invited",
        width: "15%",
        render: (text: string, record: any) => {
          // if (record?.status === 1) return <></>
          if (record?.status === 3 || record?.status === 4) {
            if (isMobile) {
              return (
                <div className="text-[#A6A6DB] text-[12px] whitespace-nowrap font-[400]">
                  0.25 MON Claimed
                </div>
              );
            }
            return (
              <div className="flex items-center gap-[8px]">
                <span className="text-[#6D7EA5] font-Unbounded text-[14px] leading-[120%]">Claimed</span>
                <a href={`https://testnet.monvision.io/tx/${record.tx_hash}`} target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5.36364 9.18182L13 1M13 1H7M13 1V7M4.81818 1H1V13H13V9.18182" stroke="#A9ADB8" />
                  </svg>
                </a>
              </div>
            );
          }
          if (isMobile) {
            if (record?.status === 1) {
              return <div className="text-[#A6A6DB] text-[12px] font-[400]">Pending...</div>
            }
            return (
              <ClaimButton
                unClaimAmount={0.25}
                claimLoading={claimLoading}
                handleClaim={handleClaim}
              />
            );
          }
          return <div className="text-[#A6A6DB] text-[12px] md:font-[400]">-</div>
        }
      }
    ];
    if (!isMobile) {
      return _columns;
    }
    return [
      {
        ..._columns[0],
        width: "60%",
      },
      {
        ..._columns[3],
        align: "right",
        width: "40%",
      }
    ];
  }, [isMobile]);

  return (
    <div
      className={clsx(
        "flex flex-col",
        isMobile ? "w-full bg-[url('/images/codes/mobile/bg-tab.png')] bg-no-repeat bg-top bg-[length:100%_46px]" : "p-[33px_3px_12px_16px] gap-[12px]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className={clsx("text-white font-Unbounded text-[14px]", isMobile ? "pl-[15px] pt-[14px]" : "")}>
          Invited ({inviteRecords?.length ?? 0})
        </span>
        <ClaimButton
          unClaimAmount={unClaimAmount}
          claimLoading={claimLoading}
          handleClaim={handleClaim}
        />
      </div>
      <div className="h-[304px] md:mt-[6px] md:h-[unset] md:bg-[url('/images/codes/mobile/bg-tab-content.png')] md:bg-repeat-y md:bg-[length:100%_1px] md:rounded-[unset] md:border-[0] rounded-[6px] border border-[#26274B] bg-[#31305A]">
        <FlexTable
          loading={inviteRecordsLoading}
          columns={COLUMNS}
          list={pageRecords}
          bodyClassName="h-[259px] md:h-[unset] overflow-auto scrollbar-hide md:pb-[70px]"
          renderEmpty={() => (
            <div className="p-[64px] text-center text-[#A6A6DB] font-Unbounded text-[12px] font-light">You didn’t invite anyone</div>
          )}
        />
      </div>
      {
        (!inviteRecordsLoading && !isMobile) && (
          <div className="mt-[18px] flex items-center justify-end gap-[20px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none"
              onClick={() => {
                page > 1 && setPage(1)
              }}
            >
              <path opacity={page === 1 ? "0.3" : "1"} d="M11 1L5 7L11 13M1 1V13" stroke="#A9ADB8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none" onClick={() => (
              page > 1 && setPage(page - 1)
            )}>
              <path opacity={page === 1 ? "0.3" : "1"} d="M7 1L1 7L7 13" stroke="#A9ADB8" />
            </svg>
            <span className="text-white font-Unbounded text-[14px] font-light leading-[150%]">{page}/{maxPage}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none" onClick={() => {
              page < maxPage && setPage(page + 1)
            }}>
              <path opacity={page === maxPage ? "0.3" : "1"} d="M1 1L7 7L1 13" stroke="#A9ADB8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none" onClick={() => {
              page < maxPage && setPage(maxPage)
            }}>
              <path opacity={page === maxPage ? "0.3" : "1"} d="M1 1L7 7L1 13M11 1V13" stroke="#A9ADB8" />
            </svg>
          </div>
        )
      }
    </div>
  )
};

export default memo(Records);

const ClaimButton = (props: any) => {
  const { unClaimAmount, claimLoading, handleClaim } = props;

  return Big(unClaimAmount).gt(0) ? (
    <>
      {
        claimLoading ? (
          <div className="flex items-center justify-center p-[8px_12px] w-[135px] rounded-[6px] bg-[#8B87FF] cursor-not-allowed">
            <Loading size={14} />
          </div>
        ) : (
          <button
            type="button"
            disabled={claimLoading}
            className="cursor-pointer p-[8px_12px] rounded-[6px] bg-[#8B87FF] text-black font-Unbounded text-[12px] font-medium leading-[120%]"
            onClick={handleClaim}
          >
            Claim {unClaimAmount} MON
          </button>
        )
      }
    </>
  ) : null;
}
