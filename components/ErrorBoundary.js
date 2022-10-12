import Head from 'next/head';
import React from 'react';
import styles from './../styles/ErrorBundary.module.scss';
import ButtonPrimary from './ButtonPrimary/ButtonPrimary';
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
  
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <>
          <Head>
            <title>UNADN - Erreur </title>
          </Head>
          <div className={styles.global_container}>
            <h1 className={styles.title}>Oops une erreur!</h1>
            <p className={styles.description}>Désolé, veuillez retourner à l l&#39;accueil svp.</p>
            <div className={styles.btn_wrapper}>
            <ButtonPrimary
              label={`Retourner à l&#39;accueil`}
              internURL={'/'}
            />
            </div>
          </div>
          </>
        )
      }
  
      // Return children components in case of no error
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary
  