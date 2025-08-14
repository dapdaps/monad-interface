import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";
import Loading from "@/components/loading";
import { NFT_AVATARS, RewardShowType } from "../../config";
import { useMemo, useState } from "react";
import { useRequest } from "ahooks";
import { trim } from "lodash";
import { post } from "@/utils/http";
import useToast from "@/hooks/use-toast";

const Reward = (props: any) => {
  const { className } = props;

  const {
    rewardData,
    setRewardVisible,
    getUserNfts,
  } = useSpaceInvadersContext();
  const toast = useToast({ isGame: true });

  const [discord, setDiscord] = useState<string>("");

  const [isGetNew, isNft] = useMemo(() => {
    return [
      rewardData?.showType === RewardShowType.GetNew,
      !!rewardData?.token_address
    ];
  }, [rewardData]);

  console.log("isGetNew: %o", isGetNew);

  const { runAsync: handleConfirm, loading: confirmLoading } = useRequest(async () => {
    if (isNft) {
      setRewardVisible?.(false);
      return;
    }

    let toastId = toast.loading({
      title: "Binding...",
    }, "bottom-right");
    // bind discord
    try {
      const res = await post("/game/deathfun/bindDiscord", {
        discord_account: trim(discord || ""),
        game_id: rewardData?.game_id,
      });
      toast.dismiss(toastId);
      if (res.code !== 200) {
        toast.fail({
          title: "Bind failed",
          text: res.message,
        }, "bottom-right");
        return;
      }
      toast.success({
        title: "Bind success",
      }, "bottom-right");
      // reload user nfts
      getUserNfts?.();
      setRewardVisible?.(false);
    } catch (error: any) {
      toast.fail({
        title: "Bind failed",
        text: error.message,
      }, "bottom-right");
      console.log("bind discord error: %o", error);
    }
  }, {
    manual: true,
  });

  const buttonValid = useMemo(() => {
    const result = { text: "Confirm", disabled: true, loading: false };
    if (!trim(discord || "")) {
      result.text = "Enter your Discord";
      return result;
    }
    if (confirmLoading) {
      result.loading = true;
      return result;
    }
    result.disabled = false;
    return result;
  }, [discord, confirmLoading]);

  return (
    <div className={clsx("relative w-full text-center font-[DelaGothicOne] text-white text-[16px] leading-[120%] font-[400]", className)}>
      {
        isGetNew && (
          <div className="absolute flex justify-center items-center top-[-172px] left-1/2 -translate-x-1/2 w-[391px] h-[278px] bg-no-repeat bg-center bg-contain bg-[url('/images/arcade/space-invaders/reward-modal-title2.png')]">
            <div
              className="w-[110px] h-[110px] rounded-[20px] rotate-[-9.4deg] translate-y-[16px] origin-left-bottom p-[4px] translate-x-[40px] shrink-0 border border-[#323D5D] bg-[#A6A6DB] flex items-center justify-center"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 0% 80%)' }}
            >
              <img
                src={NFT_AVATARS[rewardData?.category]}
                alt=""
                className="w-full h-full rounded-[18px] border border-[#000] object-center object-contain shrink-0"
              />
            </div>
          </div>
        )
      }
      <div className={clsx("", isGetNew ? "pt-[150px]" : "pt-[30px]")}>
        {
          isGetNew ? (
            <div className="text-[32px] leading-[100%]">
              Congrats!
            </div>
          ) : (
            <div className="text-[32px] leading-[100%]">
              Bind Discord
            </div>
          )
        }
        <div className="mt-[33px] font-[SpaceGrotesk]">
          {isNft ? "You get the NFT" : `They noticed you. ${isNft ? "NFT dispatched" : "WL confirmed"}`}
        </div>
        {
          isGetNew && (
            <div className="text-[32px] leading-[100%] mt-[10px]">
              {rewardData?.category}
            </div>
          )
        }
        {
          !isNft && (
            <div className={clsx("font-[SpaceGrotesk]", isGetNew ? "mt-[70px] md:mt-[30px]" : "mt-[50px] md:mt-[30px]")}>
              <div className="flex justify-center items-center gap-[4px]">
                <div>
                  Fill in your
                </div>
                <img
                  src="/images/arcade/space-invaders/icon-discord.png"
                  className="w-[20px] h-[16px] object-contain object-center shrink-0"
                />
                <div>
                  Discord account
                </div>
              </div>
              <div className="w-[352px] mt-[17px] mx-auto h-[50px] flex-shrink-0 rounded-[12px] bg-[#0E0F29] relative">
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none outline-none text-white font-[DelaGothicOne] text-[18px] font-normal leading-[100%] px-4 pr-[40px]"
                  maxLength={255}
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                />
                {
                  !!trim(discord || "") && (
                    <button
                      type="button"
                      className="w-[18px] h-[18px] absolute z-[1] top-1/2 -translate-y-1/2 right-[10px] bg-[#2B294A] rounded-full bg-[url('/images/arcade/space-invaders/icon-close.svg')] bg-no-repeat bg-center bg-[length:10px_10px]"
                      onClick={() => setDiscord("")}
                    />
                  )
                }
              </div>
            </div>
          )
        }
        <div className="mt-[20px] flex justify-center items-center">
          <button
            type="button"
            className="px-[33px] h-[46px] disabled:opacity-50 disabled:!cursor-not-allowed flex-shrink-0 rounded-[10px] border border-[#413C54] bg-[#5237FF] text-white text-center font-[DelaGothicOne] text-[16px] font-normal leading-[100%] flex justify-center items-center gap-[4px]"
            disabled={buttonValid.disabled}
            onClick={handleConfirm}
          >
            {
              buttonValid.loading && (
                <Loading size={16} />
              )
            }
            <div className="">
              {buttonValid.text}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reward;
