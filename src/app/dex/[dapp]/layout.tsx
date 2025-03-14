"use client";

import { useParams, useRouter, usePathname } from "next/navigation";

const Laptop = ({ params, router, pathname, children }: any) => {
  return <div className="pt-[30px] flex flex-col items-center">{children}</div>;
};

export default function DexLayout({
  children
}: {
  children: React.ReactElement;
}) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  return <Laptop {...{ params, router, pathname, children }} />;
}
