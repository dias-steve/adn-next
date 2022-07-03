import '../styles/globals.scss'
import { ThemeProvider } from '../lib/ThemeContext'
import { ShowModalCartProvider } from '../lib/ModalContext'
import Container from '../components/Container/Container'
import ErrorBoundary from '../components/ErrorBoundary.js'
import { CartProvider } from "react-use-cart";
import { wrapper, store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <CartProvider>
    <ErrorBoundary >
    <ThemeProvider>
    <ShowModalCartProvider>
    <Container>
      <Component {...pageProps} />
    </Container>
    </ShowModalCartProvider>
    </ThemeProvider>
    </ErrorBoundary>
    </CartProvider>
   </PersistGate>
    </Provider>
    </>
  )
}

export default  wrapper.withRedux(MyApp);
