import { motion } from "framer-motion";
import Button from "./button";
import Point from "./point";
import useCustomAccount from "@/hooks/use-account";
import { formatLongText } from "@/utils/utils";
import clsx from "clsx";
import Link from "next/link";
import { useInvitationContext } from "@/context/invitation";
import { useAppKit, useDisconnect } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { trim } from "lodash";
import { INVITATION_CODE_LENGTH } from "../config";

const Code = (props: any) => {
  const { account } = useCustomAccount();
  const { isConnecting } = useAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  const {
    loading,
    validUser,
    invitationCode,
    handleInvitationCodeChange,
    handleInvitationCodeKeyboard,
    submitInvitationCode,
    submitInvitationCodeLoading,
    invalidInvitationCode,
  } = useInvitationContext();

  return (
    <div className="w-[765px] h-[390px] overflow-hidden shrink-0">
      <div className="w-full h-[431px] pt-[37px] flex justify-center items-start gap-[87px] bg-[url('/images/invitation/bg-code.png')] bg-no-repeat bg-contain bg-center">
        <div className="w-[258px] shrink-0 flex flex-col justify-center items-center gap-[20px] [transform-style:preserve-3d] [transform:perspective(1000px)_rotate3d(1,_0,_0,_25deg)_scale(1.1,_1.2)_skewX(-4.2deg)_translateX(-10px)] [transform-origin:bottom] [perspective-origin:60%_35%]">
          <div className="w-full">
            <Button
              className={clsx("!h-[46px] w-full flex justify-center items-center gap-[20px]", account && "!bg-[#6D7EA5]")}
              disabled={isConnecting}
              onClick={() => {
                if (!account) {
                  open();
                  return;
                }
                disconnect();
              }}
            >
              <span>{account ? formatLongText(account, 5, 6) : "Connect Wallet"}</span>
              {account && (
                <button
                  type="button"
                  className="w-[16px] h-[16px] shrink-0"
                >
                  <img src="/images/invitation/icon-logout.svg" alt="logout" className="w-full h-full object-contain object-center" />
                </button>
              )}
            </Button>
          </div>
          <div className="relative w-full h-[186px] flex justify-center items-center bg-black [background-image:linear-gradient(to_right,_rgba(120,254,255,0.1)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(120,254,255,0.1)_1px,_transparent_1px)] bg-[length:25px_25px] bg-[position:-1px_-1px] rounded-[6px]">
            <Point delay={0} className="absolute top-[24px] left-[24px]" />
            <Point delay={1} className="absolute top-[24px] left-[174px]" />
            <Point delay={2} className="absolute top-[98px] left-[248px]" />
            <Point delay={1} className="absolute top-[173px] left-[24px]" />
            <Point delay={0} className="absolute top-[173px] left-[224px]" />
            <motion.div
              className="w-[218px] h-[135px] shrink-0 bg-[url('/images/invitation/bg-ticket.png')] bg-no-repeat bg-contain bg-center"
              style={{ x: 8 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
            />
            {
              !validUser && !loading && (
                <div className="w-full h-full absolute overflow-hidden">
                  <motion.div
                    className="w-full h-full flex justify-center items-center flex-col gap-[20px] left-0 top-0 bg-[rgba(0,0,0,0.5)] rounded-[6px]"
                    style={{ x: 8 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15, delay: 0.5 }}
                  >
                    <div className="w-[198px] h-[61px] flex justify-center items-center shrink-0 bg-[rgba(0,0,0,0.6)] border border-[#78FEFF] text-[#A5FFFD] text-center font-Unbounded text-[14px] font-[400] leading-[120%]">
                      No Pass found in<br /> this wallet
                    </div>
                    <div className="text-[#A5FFFD] font-Unbounded text-[12px] font-[400] leading-[120%]">
                      Try to <Link prefetch href="/terminal?from=invitation" className="underline underline-offset-2 cursor-pointer">get a ticket</Link> or<br /> input an invite code
                    </div>
                  </motion.div>
                </div>
              )
            }
          </div>
        </div>
        <div className="w-[252px] shrink-0 grid grid-cols-3 gap-[12px] [transform-style:preserve-3d] [transform:perspective(1000px)_rotate3d(1,_0,_0,_30deg)_scale(1.1,_1.3)_skewX(4deg)] [transform-origin:bottom] [perspective-origin:60%_35%]">
          <input
            readOnly
            type="text"
            className={clsx(
              "cursor-default col-span-2 h-[45.655px] shrink-0 border bg-black border-[#55648A] rounded-[6px] shadow-[inset_3px_3px_0px_0px_#2C3635] text-[#A5FFFD] text-center font-Unbounded text-[16px] font-[500] leading-[100%] placeholder:text-[#A5FFFD]",
              invalidInvitationCode && "!text-[#FF5372]"
            )}
            placeholder="Invite Code"
            value={invitationCode}
          />
          <Button
            className="flex justify-center items-center !h-[40px] !px-[0px]"
            onClick={async () => {
              try {
                const text = await navigator.clipboard.readText();
                handleInvitationCodeChange(text);
              } catch (err) {
                console.error('read clipboard failed:', err);
              }
            }}
          >
            <img src="/images/invitation/icon-copy.svg" alt="" className="object-center object-contain w-[16px] h-[16px]" />
          </Button>
          {
            [...new Array(9)].map((_, index) => (
              <Button
                key={index}
                className=""
                onClick={() => handleInvitationCodeKeyboard((index + 1).toString())}
              >
                {index + 1}
              </Button>
            ))
          }
          <Button
            className="col-start-2"
            onClick={() => handleInvitationCodeKeyboard("0")}
          >
            0
          </Button>
          <Button
            className={clsx(
              "!px-[0] active:!drop-shadow-[0px_0px_10px_rgba(120,254,255,0.60)] active:!bg-[#A5FFFD]",
              invalidInvitationCode && "!drop-shadow-[0px_0px_10px_#FF5372] !bg-[#FF5372]"
            )}
            disabled={!account || submitInvitationCodeLoading || !trim(invitationCode) || trim(invitationCode).length < INVITATION_CODE_LENGTH || invalidInvitationCode}
            onClick={submitInvitationCode}
          >
            Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Code;
