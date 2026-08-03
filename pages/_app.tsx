import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import 'src/styles/index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Application from 'src/components/Application';
import { initSnapchatPixel } from 'src/libs/snapchat';

export default function App({ Component, pageProps }: AppProps) {
  // pixels/analytics só existem no navegador — inicializados após a hidratação
  useEffect(() => {
    initSnapchatPixel();
  }, []);

  return (
    <>
      <Head>
        <title>Bomb Crypto - (BCOIN)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Build a squad of bombers and participate in mining Bcoin tokens for rewards, the game uses blockchain technology with more than 1 million participants."
        />
        <meta property="og:title" content="Bombcrypto" />
        <meta
          property="og:image"
          content="https://i.ibb.co/qjJZ0rQ/image-3-Pnj.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-11109546136"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11109546136');
        `}
      </Script>

      {/* Meta Pixel */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '815927715608283');
          fbq('track', 'PageView');
        `}
      </Script>

      <Application>
        <Component {...pageProps} />
      </Application>
    </>
  );
}
