import '../styles/globals.scss'
import { ThemeProvider } from '../lib/ThemeContext'
import Container from '../components/Container/Container'
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
    <Container>
      <Component {...pageProps} />
    </Container>
    </ThemeProvider>
  )
}

export default MyApp
