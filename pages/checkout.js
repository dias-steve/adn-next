import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Stripe from "stripe";
import { Card, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { parseCookies, setCookie } from "nookies";
import { apiInstance} from "../utils/api.utils"
import { publishableKey } from './../stripe/config';
import { Elements } from '@stripe/react-stripe-js';
import Spinner from '../components/spin/spinner'
import {
  getListShippmentByCountryCode,
  getListCountryShipments,
} from "../utils/checkout.utils";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import ShippingForm from "../components/checkoutComponents/ShippingForm";
import  {getMethodShipmentbyTitle} from "../utils/checkout.utils"
import PaiementForm from "../components/checkoutComponents/PaiementForm";

export default function Checkout(props) {
  const initialStatAdressShippement = {
    firstname: "",
    lastname: "",
    address: "",
    postalcode: "",
    departement: "",
    city: "",
    countrycode: "",
    mail:"",
    phone:""
  };

  const initialStatAdressPaiement = {
    firstname: "",
    lastname: "",
    address: "",
    postalcode: "",
    departement: "",
    city: "",
    countrycode: "",

  };
  

  const [stripePromise,setStripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY))
  const listShipmentMethods = props.shipments;
  const [adrShippement, setadrShippement] = useState(initialStatAdressShippement);
  const [adrPaiement, setAdrPaiement] = useState({ initialStatAdressPaiement });
  const [shippingModeSelected, setShippingModeSelected] = useState(null)
  const [sameFacturation, setSameFacturation] = useState(true);
  const [ methodeSelectedObject, setMethodeSelectedObject] = useState(null)


  const [totalPrice, setTotalPrice] = useState(0);
  const {items, removeItem, isEmpty, cartTotal, updateItemQuantity } = useCart()


  const paiementConfig = {
    sameFacturation,
    setSameFacturation,
    adrPaiement,
    setAdrPaiement,
    methodeSelectedObject,
    adrShippement
  }
  useEffect(()=>{

    setMethodeSelectedObject( getMethodShipmentbyTitle(shippingModeSelected, adrShippement.countrycode, listShipmentMethods))
    if(methodeSelectedObject){
      console.log(methodeSelectedObject)
      setTotalPrice(cartTotal+parseFloat(methodeSelectedObject.method_cost))
    }

   
   

  },[ adrShippement.countrycode,shippingModeSelected, items ])

useEffect(()=>{
 /** 
  apiInstance.post('/paymentadn', {
    amount: 4000,
   

    }).then((response) =>{ console.log(response.data)})
    **/
},[])
  return (
    <Elements stripe={stripePromise}>
    <div className="checkout-page-styles">
      <div className="global-container">
        <h1 className="checkout-title"> Passer Commande </h1>
        <div className="checkout-shipping-container">
          <form>
           <ShippingForm 
            adrShippement={adrShippement}
            setAdrShippement={setadrShippement}
            listShipmentMethods={listShipmentMethods}
            shippingModeSelected={shippingModeSelected}
            setShippingModeSelected={setShippingModeSelected}
            
            />
            <PaiementForm  {...paiementConfig}/>
          </form>
          

       
          
        
        </div>
        <p> Sous-total: {totalPrice}</p>
      </div>
     
    </div>
    
    </Elements>
  );
}



export const getServerSideProps = async () => {
  const data = await fetch(process.env.REACT_APP_API_REST_DATA + "/shipments", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const shipments = await data.json();


  return {
    props: {
      shipments,
   
    },
  };
};