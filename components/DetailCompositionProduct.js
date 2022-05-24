import React from 'react'
import Image from "next/image";

const CompositionItem = ({img, desc}) => {

  return(<div className='composition-item-container'>
  <div className='composition-item-content-left'>
  <div  className="image-wrapper">
    <Image src={img} layout={"fill"} className={"image"}/>
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
  const img1 = data.image_1;
  const img2 = data.image_2;
  const desc1 = data.description_1;
  const desc2= data.description_2;
  return(
    <div className="detailCompositionProduct-conatainer">
      <h2 className="detailCompositionProduct-title"> Composition </h2>
      <div className='composition-list-item-wrapper'>
      
        { img1 && desc1 &&
          <CompositionItem img={img1} desc={desc1} />
        }
        { img2 && desc2 &&
          <CompositionItem img={img2} desc={desc2} />
        }
      </div>
    </div>
  )
}
