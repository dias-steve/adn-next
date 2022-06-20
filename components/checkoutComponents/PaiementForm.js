import React, {useEffect, useState} from 'react'
import { Card, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import FormButton from "../form/FormButton";
import { useCart } from "react-use-cart";
import {  CreateOrderWoo , ValidateOrderWoo, getItemsStockState } from "./../../utils/checkout.utils"
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
    adrShippement,
    formIsValide,
    nameOncardIsValid,
    setAdrShippement
  }) {

    const stripe = useStripe();
    const elements = useElements();
    const {items} = useCart();
    const [paymentInLoading, setPaymentInLoading] = useState(false);

  
    useEffect(() => {
      console.log(items)
    },[])
    const configCardElement = {
      iconStyle:'solid',
      style: {
          base:{
              fontSize: '16px',
    
        
          }
      },
      hidePostalCode: true
  }


  const handlePayment = async () => {
    setPaymentInLoading(true)
    const cardElement = elements.getElement('card');
    const order =  await CreateOrderWoo(items,methodeSelectedObject, adrShippement)
  
    
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
              line1: adrShippement.address,
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
                    name: adrShippement.name_card,
                    phone: adrShippement.phone,
                    email:adrShippement.email,
                    address: {
                  
                      line1: adrShippement.address,
                      line2: "",
                      city: adrShippement.city,
                      state: adrShippement.departement,
                      postal_code: adrShippement.postalcode,
                      country: adrShippement.countrycode,
       
                    }
                }
            }).then(({ paymentMethod, error })=>{
                // on passe au paiement pure 

                if(paymentMethod){
                  stripe.confirmCardPayment(clientSecret,{
                    payment_method: paymentMethod.id
                }).then(({ paymentIntent, error }) => {
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
                }else{
                  // numéro de carte invalide
                  setPaymentInLoading(false)
                }
        


                if (error){
                  console.log('create Payment Methode')
                  console.log(error)
                  setPaymentInLoading(false)
                }
            })
          });
         
    }


  }
  const handleSubmit = async  () => {
    
    setPaymentInLoading(true)

    const message_error = formIsValide()
    //Verification tous les produits du panier sont bien disponible
    const stock = await getItemsStockState(items)
    console.log(stock)
    if(stock.all_in_stock){
      if(message_error.length === 0) {
        console.log('[Paiement lancé]')
        console.log(message_error)
        handlePayment();
      }else {
        console.log('[ERR From invalide]')
        setPaymentInLoading(false)
    
      }
    }else{
      // pousser à la page panier message error
      console.log('[Produit dans le panier plus en stock]')
      setPaymentInLoading(false)
    }

   
  }
  return (
    <div className="paiementform-component">
         <h2 className="checkout-sub-title">Paiement</h2>
         <div className="wrapper-fields">
            
         <FormInput isValid= {nameOncardIsValid} label="Nom sur la carte" type="text" handleChange={(e) => {
                    setAdrShippement({...adrShippement, name_card: e.target.value})
                      } }/>
            <div className="card-wrapper">
            <CardElement 
                options={configCardElement}
            />
            </div>

         </div>
         {  paymentInLoading ? <Spinner/> :

         
<FormButton name={'Payer Maintenant'} type='submit' onClick={(e) => {
  e.preventDefault();
  handleSubmit();
}} />


         
            
          }

    </div>
  )
}
