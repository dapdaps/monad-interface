import useCustomAccount from "@/hooks/use-account";
import { useState } from "react";
import { trim } from "lodash";
import { INVITATION_CODE_LENGTH } from "../config";
import { useInvitationContext } from "@/context/invitation";
import clsx from "clsx";
import Button from "./button";
import useIsMobile from "@/hooks/use-isMobile";

const Keyboards = (props: any) => {
  const { className } = props;

  const { account } = useCustomAccount();
  const isMobile = useIsMobile();

  const [isFocused, setIsFocused] = useState(false);

  const {
    invitationCode,
    handleInvitationCodeChange,
    handleInvitationCodeBackspace,
    handleInvitationCodeKeyboard,
    submitInvitationCode,
    submitInvitationCodeLoading,
    invalidInvitationCode,
  } = useInvitationContext();

  const EnterDisabled = !account || submitInvitationCodeLoading || !trim(invitationCode) || trim(invitationCode).length < INVITATION_CODE_LENGTH || invalidInvitationCode;


  return (
    <div className={clsx("w-[252px] shrink-0 grid grid-cols-3 gap-[12px] [transform-style:preserve-3d] [transform:perspective(1000px)_rotate3d(1,_0,_0,_30deg)_scale(1.1,_1.3)_skewX(4deg)] [transform-origin:bottom] [perspective-origin:60%_35%]", className)}>
      <input
        type="text"
        className={clsx(
          "cursor-default col-span-2 h-[45.655px] shrink-0 border bg-black border-[#55648A] rounded-[6px] shadow-[inset_3px_3px_0px_0px_#2C3635] text-[#A5FFFD] text-center font-Unbounded text-[16px] font-[500] leading-[100%] placeholder:text-[#A5FFFD]",
          invalidInvitationCode && "!text-[#FF5372]"
        )}
        placeholder={isFocused ? "" : "Invite Code"}
        value={invitationCode}
        onChange={(e) => handleInvitationCodeChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {
        isMobile ? (
          <EnterButton
            disabled={EnterDisabled}
            onClick={submitInvitationCode}
            invalidInvitationCode={invalidInvitationCode}
          />
        ) : (
          <CopyButton
            onChange={(text: string) => {
              handleInvitationCodeChange(text);
            }}
          />
        )
      }
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
        className="flex justify-center items-center !p-0"
        onClick={() => handleInvitationCodeBackspace()}
      >
        <img src="/images/invitation/icon-backspace.svg" alt="" className="object-center object-contain w-[20px] h-[14px] shrink-0" />
      </Button>
      <Button
        className=""
        onClick={() => handleInvitationCodeKeyboard("0")}
      >
        0
      </Button>
      {
        !isMobile ? (
          <EnterButton
            disabled={EnterDisabled}
            onClick={submitInvitationCode}
            invalidInvitationCode={invalidInvitationCode}
          />
        ) : (
          <CopyButton
            onChange={(text: string) => {
              handleInvitationCodeChange(text);
            }}
          />
        )
      }
    </div>
  );
};

export default Keyboards;

const CopyButton = (props: any) => {
  const { className, onChange } = props;

  const isMobile = useIsMobile();

  return (
    <Button
      className={clsx("flex justify-center items-center !px-[0px]", isMobile ? "" : "!h-[40px]", className)}
      onClick={async () => {
        try {
          const text = await navigator.clipboard.readText();
          onChange(text);
        } catch (err) {
          console.error('read clipboard failed:', err);
        }
      }}
    >
      <img src="/images/invitation/icon-copy.svg" alt="" className="object-center object-contain w-[16px] h-[16px] shrink-0" />
    </Button>
  )
}

const EnterButton = (props: any) => {
  const { className, onClick, disabled, invalidInvitationCode } = props;

  const isMobile = useIsMobile();

  return (
    <Button
      className={clsx(
        "!px-[0] active:!drop-shadow-[0px_0px_10px_rgba(120,254,255,0.60)]",
        invalidInvitationCode
          ? "!bg-[#FF5372] !drop-shadow-[0px_0px_10px_#FF5372]"
          : (disabled ? "!bg-[#6D7EA5]" : "!bg-[#A5FFFD]"),
        isMobile ? "!h-[46px]" : "",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      Enter
    </Button>
  )
}
