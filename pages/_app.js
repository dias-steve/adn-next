import '../styles/globals.scss'
import { ThemeProvider } from '../lib/ThemeContext'
import Container from '../components/Container/Container'
import ErrorBoundary from '../components/ErrorBoundary.js'
import { CartProvider } from "react-use-cart";
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
    <ErrorBoundary >
    <ThemeProvider>
    <Container>
      <Component {...pageProps} />
    </Container>
    </ThemeProvider>
    </ErrorBoundary>
    </CartProvider>
  )
}

export default MyApp
