import { useInvitationContext } from "@/context/invitation";
import MainLayout from "./main";
import SimpleLayout from "./simple";
import { usePathname } from "next/navigation";
import InvitationView from "@/sections/invitation";
import useIsMobile from "@/hooks/use-isMobile";
import GuideView from "@/sections/invitation/guide";

export default function Layout({ children }: any) {
  const pathname = usePathname();
  const { validUser } = useInvitationContext();
  const isMobile = useIsMobile();

  if (["/terminal", "/terminal/login"].includes(pathname)) {
    return <SimpleLayout>{children}</SimpleLayout>;
  }

  return (
    <MainLayout>
      {!isMobile && <InvitationView />}
      {!isMobile && !validUser ? null : children}
      {<GuideView />}
    </MainLayout>
  );
}
