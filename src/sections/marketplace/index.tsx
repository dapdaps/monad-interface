import useIsMobile from "@/hooks/use-isMobile";
import { memo } from "react";
import Laptop from "./laptop";
import Mobile from "./mobile";

export default memo(function MarketPlaceView() {

  const isMobile = useIsMobile()
  return isMobile ? <Mobile /> : <Laptop />;
});
