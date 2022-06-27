import '../styles/globals.scss'
import { ThemeProvider } from '../lib/ThemeContext'
import { ShowModalCartProvider } from '../lib/ModalContext'
import Container from '../components/Container/Container'
import ErrorBoundary from '../components/ErrorBoundary.js'
import { CartProvider } from "react-use-cart";
function MyApp({ Component, pageProps }) {
  return (
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
  )
}

export default MyApp
