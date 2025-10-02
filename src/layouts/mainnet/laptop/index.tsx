import { usePathname } from "next/navigation";
import LaptopFooter from "./footer";
import LaptopHeader from "./header";
import LaptopSidebar from "./sidebar";
import { useMemo } from "react";
import WalletInfo from "@/components/walletInfo";

const EXCLUDE_FOOTER_PATHS = [
  // /^\/arcade/,
  /^\/marketplace/,
];

const EXCLUDE_WALLET_INFO_PATHS = [
  /^\/wallet/,
  /^\/$/,
  /^\/arcade\/guess-who$/,
  /^\/arcade\/space-invaders$/,
  /^\/arcade\/lucky777$/,
];

const LaptopLayout = (props: any) => {
  const { children } = props;

  const pathname = usePathname();

  const [isFooter] = useMemo(() => {
    const result = [true];
    if (EXCLUDE_FOOTER_PATHS.some((reg) => reg.test(pathname))) {
      result[0] = false;
    }
    return result;
  }, [pathname]);

  const showWalletInfo = !EXCLUDE_WALLET_INFO_PATHS.some((reg: any) => reg.test(pathname));

  return (
    <div className="w-full h-full relative">
      <LaptopSidebar />
      <LaptopHeader />
      {
        isFooter && (
          <LaptopFooter />
        )
      }
      <div className="relative h-full w-full">
        {children}
      </div>

      {
        showWalletInfo && (
          <WalletInfo />
        )
      }
    </div>
  );
};

export default LaptopLayout;
