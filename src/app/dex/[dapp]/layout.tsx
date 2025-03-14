"use client";

export default function DexLayout({
  children
}: {
  children: React.ReactElement;
}) {
  return <div className="w-full flex justify-center">{children}</div>;
}
