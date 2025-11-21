import Modal from "@/components/modal";
import { useWelcomeContext } from "./context";
import useUser from "@/hooks/use-user";
import { useMemo, useRef, useState } from "react";
import { formatLongText, base64ToBlob, shareToX, uploadFile } from "@/utils/utils";
import Big from "big.js";
import { numberFormatter } from "@/utils/number-formatter";
import { BoosterItems } from "@/sections/ranking/config";
import clsx from "clsx";
import domtoimage from "dom-to-image";
import useToast from "@/hooks/use-toast";

const WelcomeShare = (props: any) => {
  const { } = props;

  const { userInfo } = useUser();
  const { bonus } = useWelcomeContext();
  const toast = useToast();

  const cardRef = useRef<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const [avatar, name] = useMemo(() => {
    if (userInfo?.social?.twitter_avatar) {
      return [userInfo?.social?.twitter_avatar.replace('normal', '400x400'), userInfo?.social?.twitter_user_name];
    }
    return ["/images/wallet/ranking/default-avatar.png", formatLongText(userInfo?.address, 5, 4)];
  }, [userInfo]);

  const totalRP = useMemo(() => {
    let sum = Big(0);
    const bonusList = Object.entries(bonus ?? {});
    bonusList.forEach(([key, value]) => {
      if (!/_rp$/.test(key)) {
        return;
      }
      sum = sum.plus(Big(value as number));
    });
    return sum;
  }, [bonus]);

  return (
    <div className="w-[612px] font-Pixelmix text-[14px] text-[#BFFF60]">
      <div
        ref={cardRef}
        className="w-full h-[375px] bg-[url('/images/mainnet/discover/welcome/share-card.png')] bg-no-repeat bg-contain bg-center"
      >
        <div className="flex flex-col items-center pt-[60px]">
          <div className="w-[64px] h-[64px] rounded-full border border-[#E7E2FF] shadow-[0_0_10px_0_#836EF9] shrink-0 p-[4px]">
            <img
              src={avatar}
              alt=""
              className="w-full h-full object-center object-cover rounded-full"
            />
          </div>
          <div className="mt-[6px] text-[14px] text-white font-Pixelmix leading-[200%]">
            @{name}
          </div>
          <div className="mt-[5px] text-[32px] text-[#BFFF60] font-Pixelmix leading-[120%]">
            {numberFormatter(totalRP, 2, true)} RP
          </div>
          <div className="grid grid-cols-3 mt-[50px]">
            {
              BoosterItems.map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "w-full h-full justify-center flex flex-col items-center gap-[5px] px-[40px]",
                    index !== 0 ? "border-l border-dashed border-[#836EF9]" : "",
                  )}
                >
                  <div className="relative flex justify-center items-center">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-[78px] h-[58px] object-center object-contain shrink-0"
                    />
                  </div>
                  <div className="max-w-[80px] text-center text-[10px] text-[#836EF9] font-Pixelmix leading-[120%] uppercase">
                    {item.label}
                  </div>
                </div>
              ))
            }
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
              const tweetText = "Welcome monad mainnet!";
              shareToX(tweetText);
              
              toast.dismiss(toastId);
              toast.success({
                title: "Opening Twitter...",
              });
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
