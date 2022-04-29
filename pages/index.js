import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home(props) {
  console.log('data')
  console.log(props.homeData)
  return (
    <div className={styles.container}>
        
    </div>
  )
}
export async function getStaticProps(){
  const data = await fetch(process.env.REACT_APP_API_REST_DATA+"/homedata", {
       
    // Adding method type
    method: "GET",
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

  const homeData = await data.json();

  return {
      props: {
          homeData
      },
      revalidate: 5*60 // rechargement toutes les 5s
  }
}