import useCustomAccount from "@/hooks/use-account";
import Link from "next/link";

const Rules = (props: any) => {
  const { account } = useCustomAccount();

  return (
    <div className="w-[675px] shrink-0 rounded-2xl border border-black [background:linear-gradient(180deg,_#899BCF_-3.4%,_#545F7D_100%)] shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.25)] text-white font-Unbounded text-[15px] font-light leading-[150%] p-2">
      <div className="w-full p-[8px_36px] rounded-xl border border-black bg-black shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.25)]">
        {
          account ? (
            <>
              <div className="text-[20px] font-[500]">
                Don’t have an access code? You can:
              </div>
              <ul className="mt-[8px] list-disc pl-[20px]">
                <li className="">
                  Pickup clues in the <Link className="text-[#78FEFF] underline underline-offset-2" prefetch href="/terminal?from=invitation">Terminal</Link>
                </li>
                <li className="">
                  Pickup clues from NADSA official <Link className="text-[#78FEFF] underline underline-offset-2" prefetch href="https://x.com/0xNADSA" target="_blank">X</Link>
                </li>
                <li className="">
                  Get a code from all Monad ecosystem projects
                </li>
              </ul>
            </>
          ) : (
            <div className="text-center">
              If you’re a holder of the <span className="underline underline-offset-2 cursor-pointer text-[#A5FFFD]">NADSA_ADMISSION_TICKET</span>, please<br /> connect your wallet to access.<br />Or, you can input invite code.
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Rules;
