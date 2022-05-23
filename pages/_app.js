import '../styles/globals.scss'
import { ThemeProvider } from '../lib/ThemeContext'
import Container from '../components/Container/Container'
import ErrorBoundary from '../components/ErrorBoundary.js'
function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary >
    <ThemeProvider>
    <Container>
      <Component {...pageProps} />
    </Container>
    </ThemeProvider>
    </ErrorBoundary>
  )
}

export default MyApp
