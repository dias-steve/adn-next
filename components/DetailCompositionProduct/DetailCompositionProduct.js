import React from 'react'
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import styles from './DetailCompositionProduct.module.scss'
const CompositionItem = ({img, desc}) => {

  return(<div className={styles.compositionItemContainer}>
  <div className={styles.compositionItemContentLeft}>
  <div  className={styles.imageWrapper}>
    <Image src={img.url} alt={img.alt} layout={"fill"} className={styles.image}/>
  </div>
  </div>
  <div className={styles.compositionItemContentRight}>
    <p>
      {desc}
    </p>
  </div>
</div>)
}
export default function DetailCompositionProduct({data}) {
  const {build_list} = data;
  return(
    <>
    {
      build_list && Array.isArray(build_list) &&
    <div className={styles.detailCompositionProductContainer}>

      <h2 className={styles.detailCompositionProductTitle}> Composition </h2>
      <div className={styles.compositionListItemWrapper}>
      
     
            {build_list.map(build => (
              <div key= {uuidv4()}>
              <CompositionItem img={build.image} desc={build.description} />
              </div>
            ))}

 
      </div>
    </div>
  }</>
  )
}
