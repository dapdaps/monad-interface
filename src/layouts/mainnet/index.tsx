import MobileLayout from "./mobile";
import LaptopLayout from "./laptop";
import useIsMobile from "@/hooks/use-isMobile";
import LayoutContextProvider from "@/context/layout";

const MainnetLayout = (props: any) => {
  const { children } = props;

  const isMobile = useIsMobile();

  return (
    <LayoutContextProvider>
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
    </LayoutContextProvider>
  );
};

export default MainnetLayout;
