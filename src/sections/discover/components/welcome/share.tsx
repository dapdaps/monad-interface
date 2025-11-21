import Modal from "@/components/modal";
import { useWelcomeContext } from "./context";
import useUser from "@/hooks/use-user";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatLongText, base64ToBlob, shareToX, uploadFile } from "@/utils/utils";
import Big from "big.js";
import { numberFormatter } from "@/utils/number-formatter";
import { BoosterItems } from "@/sections/ranking/config";
import clsx from "clsx";
import domtoimage from "dom-to-image";
import useToast from "@/hooks/use-toast";
import dayjs from "@/libs/day";
import WelcomeTypewriter from "./typewriter";

const WelcomeShare = (props: any) => {
  const { } = props;

  const { userInfo } = useUser();
  const { bonus } = useWelcomeContext();
  const toast = useToast();

  const cardRef = useRef<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [botMessages, setBotMessages] = useState<any>([]);

  const [avatar, name] = useMemo(() => {
    if (userInfo?.social?.twitter_avatar) {
      return [userInfo?.social?.twitter_avatar.replace('normal', '400x400'), userInfo?.social?.twitter_user_name];
    }
    return ["/images/wallet/ranking/default-avatar.png", formatLongText(userInfo?.address, 5, 4)];
  }, [userInfo]);

  const [totalRP, totalBoost, totalCount, bonusList] = useMemo(() => {
    let sum = Big(0);
    let boost = Big(0);
    let count = 0;
    const list: any = [];
    const bonusList = Object.entries(bonus ?? {});
    bonusList.forEach(([key, value]) => {
      if (!/_rp$/.test(key)) {
        if (value === true) {
          const curr = BoosterItems.find((it) => it.key === key);
          list.push({
            ...curr,
            rp: bonus[`${key}_rp`],
          });
          count++;
          boost = boost.plus(Big(curr?.boost || 0));
        }
        return;
      }
      sum = sum.plus(Big(value as number));
    });
    return [sum, boost, count, list.sort((a: any, b: any) => a.sort - b.sort)];
  }, [bonus]);

  useEffect(() => {
    const nextText = `Wallet [${formatLongText(userInfo?.address, 5, 0)}] was dropped with ${totalCount} file${totalCount > 1 ? "s" : ""} for holding.`;
    setMessages([
      {
        key: 1,
        text: "/view files drop...",
        role: formatLongText(userInfo?.address, 5, 0),
        timestamp: Date.now(),
      },
      {
        key: 2,
        text: nextText,
        role: "SYSTEM",
        timestamp: Date.now(),
        charStyle: [[...new Array(nextText.length).fill(0)].map((_, idx) => {
          let startIdx = 34;
          if (idx <= startIdx) {
            return {};
          }
          startIdx = startIdx + 7;
          if (idx <= startIdx) {
            return { color: "#BFFF60" };
          }
          return {};
        })],
      },
    ]);
    setBotMessages([
      {
        key: 1,
        text: "total earned RP and booster",
        role: "SYSTEM",
        timestamp: Date.now(),
      },
    ]);
  }, [totalCount, userInfo?.address]);

  return (
    <div className="w-[612px] font-Pixelmix text-[14px] text-[#BFFF60]">
      <div
        ref={cardRef}
        className="w-full h-[375px] bg-[url('/images/mainnet/discover/welcome/share-card-2.png')] bg-no-repeat bg-contain bg-center"
      >
        <div className="flex flex-col items-center pt-[70px]">
          <div className="w-full flex justify-start pl-[50px]">
            <div className="">
              {
                messages.map((m: any) => (
                  <WelcomeTypewriter
                    key={m.key}
                    message={m}
                    className="!text-[10px] text-[#C2B9FF] leading-[200%] font-[400] font-Pixelmix"
                  />
                ))
              }
            </div>
          </div>
          <div
            className={clsx(
              "grid mt-[25px]",
              totalCount === 1 ? "grid-cols-1" : "",
              totalCount === 2 ? "grid-cols-2" : "",
              totalCount === 3 ? "grid-cols-3" : "",
            )}
          >
            {
              bonusList.map((item: any, index: number) => (
                <div
                  key={index}
                  className={clsx(
                    "w-full h-full justify-center flex flex-col items-center gap-[5px] px-[20px]",
                    index !== 0 ? "border-l border-dashed border-[#836EF9]" : "",
                  )}
                >
                  <div
                    className="relative w-[120px] h-[88px] bg-center bg-contain bg-no-repeat shrink-0"
                    style={{ backgroundImage: `url("${item.icon}")` }}
                  >
                    <div
                      className={clsx(
                        "w-[60px] h-[60px] right-[-20px] bottom-[-10px] font-Oxanium flex justify-center items-center text-[#BFFF60] text-[14px] font-[600] leading-[100%] bg-[url('/images/wallet/ranking/boost-bg.png')] bg-no-repeat bg-center bg-contain absolute",
                        item.key === "golden" ? "translate-x-[-5px]" : "",
                        item.key === "sequence" ? "translate-x-[-25px]" : "",
                      )}
                    >
                      {numberFormatter(item.boost, 2, true, { prefix: "+" })}%
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="w-full flex justify-start pl-[50px] mt-[20px]">
            <div className="">
              {
                botMessages.map((m: any) => (
                  <WelcomeTypewriter
                    key={m.key}
                    message={m}
                    className="!text-[10px] text-[#C2B9FF] leading-[200%] font-[400] font-Pixelmix"
                  />
                ))
              }
            </div>
          </div>
          <div className="mt-[30px] flex justify-center items-center gap-[22px] text-[#BFFF60] text-[26px] leading-[120%]">
            <div className="">
              {numberFormatter(totalRP, 2, true, { prefix: "+" })} RP
            </div>
            <div className="w-[2px] h-[26px] bg-[#BFFF60] shrink-0"></div>
            <div className="flex items-center gap-[10px]">
              <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6461 10.9227L17.1457 0H5.97064L0 16.3636H10.9537L6.91845 30L23 10.9227H11.6461Z" fill="#BFFF60" />
              </svg>
              <div className="">
                {numberFormatter(totalBoost, 2, true, { prefix: "+" })}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-[20px] flex justify-center items-center gap-[10px]">
        <button
          type="button"
          className="h-[32px] border border-[#BFFF60] bg-[#BFFF60] flex justify-center items-center px-[11px] text-[14px] text-[#000] font-[400] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={sharing}
          onClick={async () => {
            if (!cardRef.current) return;

            setSharing(true);
            let toastId = toast.loading({ title: "Preparing to share..." });

            try {
              // Convert cardRef to image
              // const dataUrl: string = await domtoimage.toPng(cardRef.current, {
              //   quality: 1.0,
              //   bgcolor: 'transparent',
              //   width: cardRef.current.offsetWidth * 2,
              //   height: cardRef.current.offsetHeight * 2,
              //   style: {
              //     transform: "scale(2)",
              //     transformOrigin: "top left",
              //     width: cardRef.current.offsetWidth + "px",
              //     height: cardRef.current.offsetHeight + "px",
              //   }
              // });

              // // Convert base64 to blob
              // const [blob] = base64ToBlob(dataUrl);

              // // Upload image to server
              // const imageUrl = await uploadFile(blob, "/upload");

              // // Generate Twitter card URL
              // const tweetUrl = `https://nadsa.space/api/twitter?img=${encodeURIComponent(imageUrl)}`;

              // Share to Twitter
              const tweetText = `My NADSA RP balance just skyrocketed to ${numberFormatter(totalRP, 2, true)} RP!
%0A
The space station is calling—come aboard and grab your rewards!
%0A
🛸 https://nadsa.space`;
              shareToX(tweetText);

              toast.dismiss(toastId);
            } catch (error: any) {
              toast.dismiss(toastId);
              const errorMessage = error?.message || "Unknown error occurred";
              toast.fail({
                title: "Failed to share",
                text: errorMessage,
              });
              console.error('Failed to share to Twitter:', error);
            } finally {
              setSharing(false);
            }
          }}
        >
          SHARE
        </button>
        <button
          type="button"
          className="h-[32px] border border-[#BFFF60] bg-[#BFFF60] flex justify-center items-center px-[10px] text-[14px] text-[#000] font-[400] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={downloading}
          onClick={async () => {
            if (!cardRef.current) return;

            setDownloading(true);
            let toastId = toast.loading({ title: "Generating image..." });

            try {
              const dataUrl: string = await domtoimage.toPng(cardRef.current, {
                quality: 1.0,
                bgcolor: 'transparent',
                width: cardRef.current.offsetWidth * 2,
                height: cardRef.current.offsetHeight * 2,
                style: {
                  transform: "scale(2)",
                  transformOrigin: "top left",
                  width: cardRef.current.offsetWidth + "px",
                  height: cardRef.current.offsetHeight + "px",
                }
              });

              toast.dismiss(toastId);

              // Create download link
              const link = document.createElement("a");
              link.download = `welcome-card-${Date.now()}.png`;
              link.href = dataUrl;
              link.click();

              toast.success({
                title: "Image saved",
              });
            } catch (error: any) {
              toast.dismiss(toastId);
              toast.fail({
                title: "Failed to save",
                text: error.message,
              });
              console.error('Failed to save image:', error);
            } finally {
              setDownloading(false);
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 0V8.5M6.5 8.5L2 4M6.5 8.5L11 4M0 11.5H13" stroke="#000" stroke-width="1.6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const WelcomeShareModal = (props: any) => {
  const { } = props;

  const { shareOpen, setShareOpen } = useWelcomeContext();

  return (
    <Modal
      open={shareOpen?.open}
      onClose={() => {
        setShareOpen?.({ open: false, type: void 0 });
      }}
      isShowCloseIcon={false}
    >
      <WelcomeShare />
    </Modal>
  );
};

export default WelcomeShareModal;
