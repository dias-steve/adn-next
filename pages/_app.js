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
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="all" />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GoogleReCaptchaProvider
            reCaptchaKey={SITE_KEY}
            scriptProps={{
              async: false,
              defer: false,
              appendTo: "head",
              nonce: undefined,
            }}
          >
            <CartProvider>
              <ErrorBoundary>
                <ThemeProvider>
                  <ShowModalCartProvider>
                    <Container>
                      <Component {...pageProps} />
                    </Container>
                  </ShowModalCartProvider>
                </ThemeProvider>
              </ErrorBoundary>
            </CartProvider>
          </GoogleReCaptchaProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
