import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';
import checkImg from './../../public/check.svg'
import crossImg from './../../public/cross.svg'
import Image from 'next/image'
import Spinner from '../spin/spinner'
export default function ModalPopUp({

    modalConfig,
    showModal,
    setShowModal
    }) {
    const [scrImg, setImg] = useState(checkImg)


    return (
        <CSSTransition // mise en place des transition d'apparition et disparition
        in={showModal=== true} // trasition s'active quannd le state ativeMenu est 'main
        unmountOnExit // on démonte l'enfant à la sortie
        timeout={500}
        classNames="my-node" // le préfixe des class utilisé pour les transition enter, entrer-active, exit, exit-active 
        // trasion height > calcule de la hauteur de l'élement avant l'apparition 
        >
        <div className="modal-pop-up">
            <div className="modal-container">
            { modalConfig.is_loading && <Spinner />}
            
       
            { !modalConfig.is_loading &&<div className=" icon-wrapper"> {modalConfig.is_positif ? <Image src={checkImg} layout={"fill"} className={"image"}/>: <Image src={crossImg} layout={"fill"} className={"image"}/>}</div> }
      
            
            
            <p className="title"> {modalConfig.title} </p>
            <p className="message" dangerouslySetInnerHTML={{__html: modalConfig.message}}/>
            { !modalConfig.is_loading && 
            <>
            <button onClick={(e) => {
            e.preventDefault();
            setShowModal(false)
            }}>OK</button >
            </>
            }
            </div>

            </div>
    </CSSTransition>
    )
}
