import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NFT_INFORMATIONS } from "../../config";
import useToast from "@/hooks/use-toast";
import { formatLongText } from "@/utils/utils";
import { monadTestnet } from "viem/chains";
import TimeAgo from "./time-ago";
import Empty from "@/components/empty";

const Nft = (props: any) => {
  const { className } = props;

  const {
    handleBindDiscord,
    userNfts,
    userNftsLoading,
    getUserNfts,
  } = useSpaceInvadersContext();
  const toast = useToast();

  useEffect(() => {
    getUserNfts?.();
  }, []);

  return (
    <motion.div
      key="results"
      className={clsx("pt-[30px] px-[48px] flex flex-col gap-[10px] items-stretch max-h-[50dvh] overflow-y-auto", className)}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
    >
      {
        userNftsLoading ? [...new Array(1).fill(0)].map((_, index) => (
          <div
            key={index}
            className="w-full rounded-[6px] bg-black/30 px-[18px] py-[16px] flex items-center justify-between gap-[20px]"
          >
            <Skeleton width={96} height={96} borderRadius={6} className="flex-0" />
            <div className="flex-1 w-0">
              <div className="flex justify-between items-center">
                <Skeleton width={160} height={27} borderRadius={6} />
                <Skeleton width={100} height={27} borderRadius={6} />
              </div>
              <div className="grid grid-cols-3 gap-[10px] mt-[20px]">
                <Skeleton width={60} height={45} borderRadius={6} />
                <Skeleton width={60} height={45} borderRadius={6} />
                <Skeleton width={60} height={45} borderRadius={6} />
              </div>
            </div>
          </div>
        )) : !!userNfts?.length ? userNfts?.map((nft: any, index: number) => {
          const nftInfo = NFT_INFORMATIONS[nft.category];
          return (
            <div
              key={index}
              className="w-full rounded-[6px] bg-black/30 px-[18px] py-[16px] flex items-center justify-between gap-[20px]"
            >
              <img
                src={nftInfo?.avatar}
                alt=""
                className="w-[96px] h-[96px] rounded-[6px] object-center object-contain flex-0"
              />
              <div className="flex-1 w-0">
                <div className="flex w-full items-center justify-between">
                  <div className="text-[18px]">
                    {nft.category} {!!nft.token_id ? `#${nft.token_id}` : ""}
                  </div>
                  {
                    !nft.token_address ? (
                      !!nft.discord ? (
                        <div
                          className="flex items-center gap-[5px] justify-end"
                        >
                          <img
                            src="/images/arcade/space-invaders/icon-discord.png"
                            className="w-[20px] h-[16px] object-contain object-center shrink-0"
                          />
                          <div className="">
                            {nft.discord}
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="h-[24px] flex justify-center items-center gap-[6px] px-[9px] flex-shrink-0 rounded-[6px] border border-[#A6A6DB] bg-[#2B294A] text-white font-montserrat text-[14px] font-medium leading-[14px]"
                          onClick={() => handleBindDiscord?.(nft)}
                        >
                          <img
                            src="/images/arcade/space-invaders/icon-discord.png"
                            className="w-[20px] h-[16px] object-contain object-center shrink-0"
                          />
                          <div className="">
                            Bind
                          </div>
                        </button>
                      )
                    ) : (
                      <div
                        className="flex items-center gap-[5px] justify-end cursor-pointer"
                        onClick={async () => {
                          window.open(`https://magiceden.us/mint-terminal/monad-testnet/${nft.token_address}`, "_blank");
                        }}
                      >
                        <button
                          type="button"
                          className="w-[12px] h-[12px] flex-0 bg-[url('/images/game/icon-link.png')] bg-no-repeat bg-center bg-contain"
                        />
                        <div className="text-[#A6A6DB]">
                          Magic Eden
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className="w-full grid grid-cols-3 gap-[10px] mt-[20px]">
                  <LabelValue label="Game ID" valueClassName="flex items-center gap-[5px]">
                    <div className="">
                      {formatLongText(nft.game_id)}
                    </div>
                    <button
                      type="button"
                      className="w-[12px] h-[12px] flex-0 bg-[url('/images/arcade/space-invaders/icon-copy.png')] bg-no-repeat bg-center bg-contain"
                      onClick={async () => {
                        navigator.clipboard.writeText(nft.game_id as string);
                        toast.success({
                          title: `Copied game id ${nft.game_id}`,
                        }, "bottom-right");
                      }}
                    />
                  </LabelValue>
                  <LabelValue label="Date" valueClassName="">
                    <TimeAgo date={nft.created_at} />
                  </LabelValue>
                  <LabelValue label="Status" valueClassName="flex items-center gap-[10px]">
                    <div className={clsx((!!nft.tx_hash || nftInfo?.received) ? "text-[#BFFF60]" : "text-[#63AEF4]")}>
                      {(!!nft.tx_hash || nftInfo?.received) ? "Received" : "Pending"}
                    </div>
                    {
                      !!nft.tx_hash && (
                        <a
                          target="_blank"
                          className="underline underline-offset-2"
                          href={`${monadTestnet.blockExplorers?.default.url}/tx/${nft.tx_hash}`}
                          rel="noreferrer nofollow noopener"
                        >
                          Tx
                        </a>
                      )
                    }
                  </LabelValue>
                </div>
              </div>
            </div>
          )
        }) : (
          <div className="w-full py-[50px]">
            <Empty desc="Coming soon..." />
          </div>
        )
      }
    </motion.div>
  );
};

export default Nft;

const LabelValue = (props: any) => {
  const { label, children, valueClassName, className, labelClassName } = props;

  return (
    <div className={clsx("flex flex-col gap-[3px] text-[14px] leading-[150%] font-[Montserrat] font-[500]", className)}>
      <div className={clsx("text-[#A6A6DB]", labelClassName)}>{label}</div>
      <div className={clsx("text-white", valueClassName)}>{children}</div>
    </div>
  )
};
