import Script from "next/script";
import React from "react";
import ClientProviders from "@/components/client-providers";

import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_API || "https://mainnet-api-monad.dapdap.net";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <ClientProviders>{children}</ClientProviders>
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
