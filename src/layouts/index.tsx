import MainLayout from "./main";
import SimpleLayout from "./simple";
import { usePathname } from "next/navigation";

export default function Layout({ children }: any) {
  const pathname = usePathname();

  if (["/terminal", "/terminal/login"].includes(pathname))
    return <SimpleLayout>{children}</SimpleLayout>;

  return <MainLayout>{children}</MainLayout>;
}
