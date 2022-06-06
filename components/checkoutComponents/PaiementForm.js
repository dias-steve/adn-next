import React, {useEffect, useState} from 'react'
import { Card, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import FormButton from "../form/FormButton";
import { useCart } from "react-use-cart";
import {  CreateOrderWoo , ValidateOrderWoo } from "./../../utils/checkout.utils"
import { apiInstance } from "./../../utils/api.utils"
import Spinner from '../../components/spin/spinner'
import FormInput from '../form/FormInput';
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
    const [paymentInLoading, setPaymentInLoading] = useState(false);
    const [nameOnCard, setNameOnCard] = useState(true);
  
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

  const handlePayment = async () => {
    setPaymentInLoading(true)
    const cardElement = elements.getElement('card');
    const order =  await CreateOrderWoo(items,methodeSelectedObject, adrShippement, publicKeyWoo )
    console.log(order)
    if (order) {
      console.log('order')
      console.log(order.id);
    // si (order)

    apiInstance.post('/paymentadn', {
        amount: order.total *100,
        idorder: order.id, // centime 
        shipping:{
            name:  adrShippement.lastname,
            phone: adrShippement.phone,
            address:{
              line1: adrShippement.adress,
              line2: "",
              city: adrShippement.city,
              state: adrShippement.departement,
              postal_code: adrShippement.postalcode,
              country: adrShippement.countrycode,
            }
        }
        }).then(({ data:clientSecret, error }) => {
            //après validation du back sa retourne la clès secret
            
            stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details:{
                    name: nameOnCard,
                    phone: adrShippement.phone,
                    email:adrShippement.email,
                    address: {
                  
                      line1: adrShippement.adress,
                      line2: "",
                      city: adrShippement.city,
                      state: adrShippement.departement,
                      postal_code: adrShippement.postalcode,
                      country: adrShippement.countrycode,
       
                    }
                }
            }).then(({ paymentMethod, error })=>{
                // on passe au paiement pure 
                stripe.confirmCardPayment(clientSecret,{
                    payment_method: paymentMethod.id
                })
                .then(({ paymentIntent, error }) => {
                    if(paymentIntent)

                      console.log(paymentIntent)
                      ValidateOrderWoo(order.id, paymentIntent.id);
                      setPaymentInLoading(false)
                      //clear cart
                      //numéro de commande =validerOrderpaiment(order, paymentIntent)
                      //afficher paiement validé numéro de commande retourner à l'accueil
                      //ne plus afficher la roue
                     
                    if(error)
                      console.log("erreur paiement non validé")
                      console.log(error)
                      setPaymentInLoading(false)
                      //ne plus afficher la roue
                     //indication modification paiement refusé
                    
                })

                if (error){
                  console.log('create Payment Methode')
                  console.log(error)
                  setPaymentInLoading(false)
                }
            })
          });
         
    }
  }
  return (
    <div className="paiementform-component">
         <h2 className="checkout-sub-title">Paiement</h2>
         <div className="wrapper-fields">
            
         <FormInput label="Nom" type="text" handleChange={(e) => {
                   setNameOnCard(e.target.value)
                      } }/>
            <CardElement 
                options={configCardElement}
            />
         </div>
         <FormButton name={'Payer Maintenant'} type='submit' onClick={(e) => {
           console.log('envoie')
           handlePayment();
          
           e.preventDefault();
         }} />

{
            paymentInLoading &&
            <Spinner/>
          }
    </div>
  )
}
