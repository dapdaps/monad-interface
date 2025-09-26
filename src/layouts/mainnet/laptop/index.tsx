import { usePathname } from "next/navigation";
import LaptopFooter from "./footer";
import LaptopHeader from "./header";
import LaptopSidebar from "./sidebar";
import { useMemo } from "react";

const EXCLUDE_FOOTER_PATHS = [
  /^\/arcade/,
  /^\/marketplace/,
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
    </div>
  );
};

export default LaptopLayout;
