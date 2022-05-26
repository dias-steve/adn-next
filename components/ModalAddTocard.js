import React from 'react'
import checkImg from './../public/check.svg'
import Image from 'next/image'
export default function ModalAddTocard({name}) {
  return (
    <div className="modaladdtocard-styles modaladdtocard-styles-unvisible">
        <div className="modal-content-wrapper">
        <div className=" icon-wrapper">
         <Image src={checkImg} layout={"fill"} className={"image"}/>
       </div>
            <span> L'article {name} <br/> à bien été ajouter dans votre panier </span>
        </div>
    </div>
  )
}
