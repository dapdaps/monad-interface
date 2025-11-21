import Script from "next/script";
import React from "react";
import ClientProviders from "@/components/client-providers";

import "./globals.css";

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_API || "https://mainnet-api-monad.dapdap.net";

async function getApps() {
  try {
    const res = await fetch(`${BASE_URL}/api/apps`, {
      cache: 'no-store',
    });
    const result = await res.json();
    const _list = result?.data || [];
    _list.forEach((app: any) => {
      app.bp = "1026_001";
    });
    return _list;
  } catch (error) {
    console.error('Failed to fetch apps on server:', error);
    return [];
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apps = await getApps();

  return (
    <html lang="en" className="w-full h-full md:overflow-hidden">
      <head>
        <title>NADSA</title>
        <meta
          name="description"
          content="Effortlessly explore & dive into all dApps in the Monad ecosystem from one streamlined hub."
        />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="w-full h-full md:overflow-hidden">
        <ClientProviders initialApps={apps}>{children}</ClientProviders>
      </body>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-SZ82B6ZN43"
      ></Script>
      <Script id="ga-config">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SZ82B6ZN43');`}
      </Script>
    </html>
  );
}
