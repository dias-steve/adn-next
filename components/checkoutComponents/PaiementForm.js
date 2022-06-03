import React, {useEffect} from 'react'
import { Card, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import FormButton from "../form/FormButton";
import { useCart } from "react-use-cart";
import {  CreateOrderWoo } from "./../../utils/checkout.utils"
export const RadioSelect = ({sameFacturation,
    setSameFacturation}) => {
        
        const handleCheckboxFacturation = () => {
            setSameFacturation(!sameFacturation)
        }
        return (
            <div  className='checkbox-facturation'>
               
            <label>
            <input
             
              type="checkbox"
                id='sameFacturation'
                checked= {sameFacturation}
              onChange={() => { 
                  handleCheckboxFacturation()
              }}
            />
            <div className="radio-label">
              <div className="cercle-out">
                <div className="cercle-in"/>
                </div>
                <span>Meme adresse de facturation
               </span>
            </div>
          </label>
          </div>
        )

}

export const facturationForm = () => {
    
}
export default function PaiementForm({
    sameFacturation,
    setSameFacturation,
    adrPaiement,
    setAdrPaiement,
    methodeSelectedObject,
    adrShippement
  }) {

    const stripe = useStripe();
    const elements = useElements();
    const {items} = useCart();
    const publicKeyWoo = 'ck_dd9037d75325891984106d6d038430b737a837e8';
    useEffect(() => {
      console.log(items)
    },[])
    const configCardElement = {
      iconStyle:'solid',
      style: {
          base:{
              fontSize: '16px'
          }
      },
      hidePostalCode: true
  }

    
  return (
    <div className="paiementform-component">
         <h2 className="checkout-sub-title">Paiement</h2>
         <div className="wrapper-fields">
            
            
            <CardElement 
                options={configCardElement}
            />
         </div>
         <FormButton name={'Payer Maintenant'} type='submit' onClick={(e) => {
           console.log('envoie')
           CreateOrderWoo(items,methodeSelectedObject, adrShippement, publicKeyWoo )
           e.preventDefault();
         }} />
    </div>
  )
}
