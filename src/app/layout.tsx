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
        {/* <div id="page-loader" style={{
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
          transition: 'opacity 0.3s ease-out'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: 500,
            margin: 0
          }}>Loading...</p>
        </div> */}
        <ClientProviders>{children}</ClientProviders>
        {/* <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
        <Script id="page-loader-script" strategy="afterInteractive">
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
        </Script> */}
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
