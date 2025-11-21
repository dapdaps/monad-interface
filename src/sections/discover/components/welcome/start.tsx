import { useNftStore } from "@/stores/nft";

const WelcomeStart = (props: any) => {
  const { } = props;

  const { setWelcomeOpen, setWelcomeDownloaded } = useNftStore();

  return (
    <div className="w-full flex justify-center items-center mt-[15px]">
      <button
        type="button"
        className="w-[266px] h-[41px] bg-no-repeat bg-contain bg-center flex justify-center items-center bg-[url('/images/mainnet/discover/welcome/button-card.png')] text-black text-center font-[pixelmix] text-[14px] font-normal leading-[120%]"
        style={{
          fontFamily: "pixelmix",
        }}
        onClick={() => {
          setWelcomeOpen?.(false);
          setWelcomeDownloaded?.(true);
        }}
      >
        Start Exploring Monad
      </button>
    </div>
  );
};

export default WelcomeStart;
