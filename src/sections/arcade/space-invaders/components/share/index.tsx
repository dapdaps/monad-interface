import { AvatarDisplay } from "@/components/connect-wallet";
import useCustomAccount from "@/hooks/use-account";
import { useUserStore } from "@/stores/user";
import { formatLongText } from "@/utils/utils";
import { useEffect, useMemo, useRef } from "react";
import { useSpaceInvadersContext } from "../../context";
import clsx from "clsx";
import Big from "big.js";
import { numberFormatter } from "@/utils/number-formatter";
import domtoimage from "dom-to-image";
import Loading from "@/components/loading";
import { useRequest } from "ahooks";
import useToast from "@/hooks/use-toast";

const Share = (props: any) => {
  const { className } = props;

  const toast = useToast();
  const { account } = useCustomAccount();
  const userInfo = useUserStore((store: any) => store.user);
  const {
    userStatistics,
    userStatisticsLoading,
    getUserStatistics,
  } = useSpaceInvadersContext();

  const pictureRef = useRef<any>(null);
  const addressShown = useMemo(() => {
    if (!account) return "";

    if (userInfo?.twitter?.twitter_user_name) {
      const name = userInfo?.twitter?.twitter_user_name
      return `@${name}`
    }

    return `@${formatLongText(account, 5, 5)}`;
  }, [userInfo, account]);

  const { runAsync: onSaveImage, loading: saving } = useRequest(async () => {
    if (!pictureRef.current) return;
    let toastId = toast.loading({ title: "Preparing..." });
    // Use dom-to-image to convert DOM element to image
    try {
      const dataUrl: string = await domtoimage.toPng(pictureRef.current, {
        quality: 1.0,
        bgcolor: 'transparent',
        width: pictureRef.current.offsetWidth * 4,
        height: pictureRef.current.offsetHeight * 4,
        style: {
          transform: "scale(4)",
          transformOrigin: "top left",
          width: pictureRef.current.offsetWidth * 2,
          height: pictureRef.current.offsetHeight * 2,
        }
      });
      toast.dismiss(toastId);
      // Create download link
      const link = document.createElement("a");
      link.download = `space-invaders-pnl-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.fail({
        title: "Failed to save image",
        text: error.message,
      });
      console.error('Failed to save image:', error);
    }
  }, {
    manual: true,
  });

  useEffect(() => {
    getUserStatistics?.();
  }, []);

  return (
    <div className="w-full">
      <div className="font-[DelaGothicOne] font-[400] text-white text-[20px] leading-[120%] px-[25px]">
        Share your PnL
      </div>
      <div className="py-[30px] px-[20px] md:px-[10px]">
        <div ref={pictureRef} className="py-[0px] px-[0px] md:px-[0px] font-[Pixelmix] font-[400] leading-[150%] text-white text-[14px]">
          <div className="relative h-[292px] md:h-[48.52vw] w-full mx-auto rounded-[12px] bg-[url('/images/arcade/space-invaders/bg-share.png')] bg-no-repeat bg-center bg-cover">
            <div className="absolute z-[1] w-full left-0 top-[65px] md:top-[40px]">
              <div className="flex justify-center items-center gap-[10px]">
                <AvatarDisplay
                  hasAvatar={account && !!userInfo?.twitter?.twitter_avatar}
                  userInfo={userInfo}
                />
                <div className="[text-shadow:0_0_6px_#836EF9]">
                  {addressShown}
                </div>
              </div>
              <div
                className={clsx(
                  "mt-[10px] text-center text-[36px] md:text-[30px] leading-[100%]",
                  Big(userStatistics?.profit || 0).gte(0) ? "text-[#03E212] [text-shadow:0_4px_0_#003D08,_0_0_6px_rgba(3,_226,_18,_0.60)]" : "text-[#FF4A4A] [text-shadow:0_4px_0_#510202,_0_0_6px_rgba(3,_226,_18,_0.60)]"
                )}
              >
                {
                  numberFormatter(
                    userStatistics?.profit,
                    2,
                    true,
                    {
                      isLessPrecision: false,
                      prefix: Big(userStatistics?.profit || 0).gt(0) ? "+" : "",
                    }
                  )
                } MON
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          className="disabled:opacity-30 disabled:!cursor-not-allowed flex justify-center items-center gap-[5px] px-[21px] h-[46px] flex-shrink-0 rounded-[10px] border border-[#413C54] bg-[#5237FF] text-white text-center font-[DelaGothicOne] text-[16px] font-[400] leading-[100%]"
          disabled={userStatisticsLoading || saving}
          onClick={onSaveImage}
        >
          {
            (userStatisticsLoading || saving) && (
              <Loading size={16} />
            )
          }
          <div className="">Save & Share</div>
        </button>
      </div>
    </div>
  );
};

export default Share;
