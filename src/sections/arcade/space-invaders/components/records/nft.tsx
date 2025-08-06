import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";
import { motion } from "framer-motion";
import { useUserData } from "../../hooks/use-user";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NFT_AVATARS } from "../../config";
import useToast from "@/hooks/use-toast";
import { formatLongText } from "@/utils/utils";
import { monadTestnet } from "viem/chains";

const Nft = (props: any) => {
  const { className } = props;

  const {
  } = useSpaceInvadersContext();
  const {
    userNfts,
    userNftsLoading,
    getUserNfts,
  } = useUserData();
  const toast = useToast();

  useEffect(() => {
    getUserNfts();
  }, []);

  return (
    <motion.div
      key="results"
      className={clsx("pt-[30px] px-[48px] flex flex-col gap-[10px] items-stretch", className)}
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
        )) : userNfts?.map((nft: any, index: number) => {
          const nftAvatar = NFT_AVATARS[nft.token_address];
          return (
            <div
              key={index}
              className="w-full rounded-[6px] bg-black/30 px-[18px] py-[16px] flex items-center justify-between gap-[20px]"
            >
              <img
                src={nftAvatar}
                alt=""
                className="w-[96px] h-[96px] rounded-[6px] object-center object-contain flex-0"
              />
              <div className="flex-1 w-0">
                <div className="flex w-full items-center justify-between">
                  <div className="text-[18px]">
                    {nft.category} #{nft.id}
                  </div>
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
                        });
                      }}
                    />
                  </LabelValue>
                  <LabelValue label="Date" valueClassName="">
                    2d ago
                  </LabelValue>
                  <LabelValue label="Status" valueClassName="flex items-center gap-[10px]">
                    <div className={clsx(nft.tx_hash ? "text-[#BFFF60]" : "text-[#63AEF4]")}>
                      {nft.tx_hash ? "Received" : "Pending"}
                    </div>
                    {
                      nft.tx_hash && (
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
        })
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
