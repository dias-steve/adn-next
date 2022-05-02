import '../styles/globals.scss'

import Container from '../components/Container/Container'
function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
