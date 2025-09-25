import MainLayout from "./main";
import SimpleLayout from "./simple";
import { usePathname } from "next/navigation";
import GuideView from "@/sections/invitation/guide";
import Downtime from "@/components/downtime";

// process.env.NEXT_PUBLIC_SYSTEM_MAINTENANCE_DOWNTIME === "true"
const isSystemMaintenanceDowntime = false;

export default function Layout({ children }: any) {
  const pathname = usePathname();

  if (isSystemMaintenanceDowntime) {
    return (
      <Downtime />
    );
  }

  if (["/terminal", "/terminal/login"].includes(pathname)) {
    return <SimpleLayout>{children}</SimpleLayout>;
  }

  return (
    <MainLayout>
      {children}
      {<GuideView />}
    </MainLayout>
  );
}
