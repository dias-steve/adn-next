import React from 'react'
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
const CompositionItem = ({img, desc}) => {

  return(<div className='composition-item-container'>
  <div className='composition-item-content-left'>
  <div  className="image-wrapper">
    <Image src={img.url} alt={img.alt} layout={"fill"} className={"image"}/>
  </div>
  </div>
  <div className='composition-item-content-right'>
    <p className='composition-item-description'>
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
    <div className="detailCompositionProduct-conatainer">

      <h2 className="detailCompositionProduct-title"> Composition </h2>
      <div className='composition-list-item-wrapper'>
      
     
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
