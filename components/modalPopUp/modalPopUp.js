import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import checkImg from "./../../public/check.svg";
import crossImg from "./../../public/cross.svg";
import Image from "next/image";
import Spinner from "../spin/spinner";
import Link from "next/link";

//redux
import { setConfig, setShowModal } from "../../redux/Modal/modal.actions";
import { useDispatch, useSelector } from "react-redux";
import { INITIAL_STATE } from "../../redux/Modal/modal.reducer";

const mapState = (state) => ({
  modal: state.modal,
});

export default function ModalPopUp() {
  const { modal } = useSelector(mapState);

  const dispatch = useDispatch();

  const handleCloseMoadal = () => {
  


      dispatch(setConfig(INITIAL_STATE.config));
      dispatch(setShowModal(false));
  };
  return (
    <CSSTransition // mise en place des transition d'apparition et disparition
      in={modal.show_modal === true} // trasition s'active quannd le state ativeMenu est 'main
      unmountOnExit // on démonte l'enfant à la sortie
      timeout={500}
      classNames="my-node" // le préfixe des class utilisé pour les transition enter, entrer-active, exit, exit-active
      // trasion height > calcule de la hauteur de l'élement avant l'apparition
    >
      <div className="modal-pop-up">
        <div className="modal-container">
          {modal.config.is_loading && <Spinner />}

          {!modal.config.is_loading && (
            <div className=" icon-wrapper">
              {" "}
              {modal.config.is_positif ? (
                <Image src={checkImg} layout={"fill"} className={"image"} />
              ) : (
                <Image src={crossImg} layout={"fill"} className={"image"} />
              )}
            </div>
          )}

          <p className="title"> {modal.config.title} </p>
          <p
            className="message"
            dangerouslySetInnerHTML={{ __html: modal.config.message }}
          />
          {!modal.config.is_loading && (

            <>
            {modal.config.contactBtn &&
              <Link href={'/contact'} >
              <a className='btn-modal' onClick={() => { handleCloseMoadal()}}>
                Nous-contacter
                </a>
              </Link>
            }
             { modal.config.go_to_home_action ?


              <Link href={'/'} >
                <a className='btn-modal' onClick={() => { handleCloseMoadal()}}>
                  Retourner à l&#39;accueil
                  </a>
              </Link>
             : <button className= 'btn-modal'
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMoadal();
                }}
              >
                OK
              </button>
            }
            </>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}
