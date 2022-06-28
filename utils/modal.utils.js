/**
 * Modal gestion
 */
//redux
import {  setConfig, setShowModal } from "../redux/Modal/modal.actions";

import { INITIAL_STATE } from "../redux/Modal/modal.reducer";


export const handleSetConfigModal = (config, dispatch) => {
    if (config){
        dispatch(
            setConfig(config),
          )
          dispatch(
            setShowModal(true)
          )
    }else{
          
          dispatch(
            setConfig(INITIAL_STATE),
          )
    }

    
}

export const handleSetShowModal = (value, dispatch) => {
    dispatch(
        setShowModal(value)
      )
}