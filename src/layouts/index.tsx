import { useInvitationContext } from "@/context/invitation";
import MainLayout from "./main";
import SimpleLayout from "./simple";
import { usePathname } from "next/navigation";
import InvitationView from "@/sections/invitation";

export default function Layout({ children }: any) {
  const pathname = usePathname();
  const { validUser } = useInvitationContext();

  if (["/terminal", "/terminal/login"].includes(pathname))
    return <SimpleLayout>{children}</SimpleLayout>;

  return validUser ? (
    <MainLayout>{children}</MainLayout>
  ) : (
    <InvitationView />
  );
}
