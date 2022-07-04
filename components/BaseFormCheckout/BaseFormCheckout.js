import React, { useEffect, useState} from 'react'
import { useCart } from 'react-use-cart'
import Button from '../Button'
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary'
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary'
import styles from './baseformcheckout-component-styles.module.scss'

export default function BaseFormCheckout({total, totalLabel, HandelnextStep, HandlePreviousStep, nextStepLabel= 'Suivant', PreviousStepLabel = 'Précédent', nbItems}) {


  return (
    <div className={styles.containerGlobal}>
                <div className={styles.nbArticleText}><p>{nbItems} article{nbItems > 1 && 's'} dans le panier</p></div>
        <div className={styles.totalPrice}><p>{totalLabel}: {parseFloat(total).toFixed(2)}€</p></div>

        <div className= {styles.wrapperBotton}>
            <ButtonSecondary label={PreviousStepLabel} handleOnClick={HandlePreviousStep}/>
            <div className= {styles.primaryButtonWrapper}>
            <ButtonPrimary label={nextStepLabel} handleClick={HandelnextStep} />
            </div>
        </div>

     
    </div>

  )
}
