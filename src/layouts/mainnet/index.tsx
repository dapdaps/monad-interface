import MobileLayout from "./mobile";
import LaptopLayout from "./laptop";
import useIsMobile from "@/hooks/use-isMobile";
import { useAccount } from "wagmi";
import useUser from "@/hooks/use-user";
import { useEffect } from "react";
import useTokenPrice from "@/hooks/use-token-price";
import useClickTracking from "@/hooks/use-click-tracking";
import useRem from "@/hooks/use-rem";

const MainnetLayout = (props: any) => {
  const { children } = props;

  useRem();
  const isMobile = useIsMobile();
  const { address } = useAccount();
  const { getAccessToken } = useUser();
  const { initializePrice } = useTokenPrice();
  const { handleReportNoCode } = useClickTracking();

  useEffect(() => {
    handleReportNoCode();
    initializePrice();
  }, []);

  useEffect(() => {
    getAccessToken("mainnet layout");
  }, [address]);

  return (
    <div className="w-full h-full font-[Oxanium] font-[400]">
      {
        isMobile
          ? (
            <MobileLayout>{children}</MobileLayout>
          )
          : (
            <LaptopLayout>{children}</LaptopLayout>
          )
      }
    </div>
  );
};

export default MainnetLayout;
