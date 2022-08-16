import "../styles/globals.scss";
import { ThemeProvider } from "../lib/ThemeContext";
import { ShowModalCartProvider } from "../lib/ModalContext";
import Container from "../components/Container/Container";
import ErrorBoundary from "../components/ErrorBoundary.js";
import { CartProvider } from "react-use-cart";
import { wrapper, store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import Spinner from "../components/spin/spinner";
import Preloader from "../components/Preloader/Preloader";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap/dist/gsap";
gsap.registerPlugin(ScrollTrigger);
function MyApp({ Component, pageProps }) {

  //pour google analytics
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
         {/* Global Site Tag (gtag.js) - Google Analytics */}
         <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="all" />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>

            <CartProvider>
              <ErrorBoundary>
                <ThemeProvider>
                  <ShowModalCartProvider>
                
                    <Container>
                      
                    
                      <Component {...pageProps} gsap={gsap}/>

                     
                    </Container>
                  </ShowModalCartProvider>
                </ThemeProvider>
              </ErrorBoundary>
            </CartProvider>

        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
