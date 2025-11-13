import MobileLayout from "./mobile";
import LaptopLayout from "./laptop";
import useIsMobile from "@/hooks/use-isMobile";
import LayoutContextProvider from "@/context/layout";
import useClickTracking from "@/hooks/use-click-tracking";
import NotificationProvider from "@/context/notification";
import { useXBind } from "@/hooks/use-x-bind";

const MainnetLayout = (props: any) => {
  const { children } = props;

  const isMobile = useIsMobile();
  const { handleTrack } = useClickTracking();
  useXBind();

  return (
    <LayoutContextProvider>
      <NotificationProvider>
        <div className="w-full h-full font-[Oxanium] font-[400]" onClick={handleTrack}>
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
      </NotificationProvider>
    </LayoutContextProvider>
  );
};

export default MainnetLayout;
