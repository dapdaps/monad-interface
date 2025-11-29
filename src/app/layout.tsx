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
        <meta name="twitter:site" content="@0xNADSA" />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <Script id="page-loader-script" strategy="beforeInteractive">
          {`
            (function() {
              function hideLoader() {
                const loader = document.getElementById('page-loader');
                if (loader) {
                  loader.style.opacity = '0';
                  setTimeout(function() {
                    loader.style.display = 'none';
                  }, 300);
                }
              }
              
              if (document.readyState === 'complete') {
                setTimeout(hideLoader, 300);
              } else {
                window.addEventListener('load', function() {
                  setTimeout(hideLoader, 300);
                });
              }
            })();
          `}
        </Script>
      </head>
      <body className="w-full h-full md:overflow-hidden">
        <div id="page-loader" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#0A0A0F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 9999,
        }}>
          <img src="/images/mainnet/nadsa-loading-animation.gif" alt="page-loader"/>
        </div>
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
