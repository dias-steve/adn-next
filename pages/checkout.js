import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

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
  

  const listShipmentMethods = props.shipments;
  const [adrShippement, setadrShippement] = useState(initialStatAdressShippement);
  const [adrPaiement, setAdrPaiement] = useState({ initialStatAdressPaiement });
  const [shippingModeSelected, setShippingModeSelected] = useState(null)
  const [sameFacturation, setSameFacturation] = useState(true);


  const [totalPrice, setTotalPrice] = useState(0);
  const {items, removeItem, isEmpty, cartTotal, updateItemQuantity } = useCart()

  const paiementConfig = {
    sameFacturation,
    setSameFacturation,
    adrPaiement,
    setAdrPaiement
  }
  useEffect(()=>{

    const methodeSelected = getMethodShipmentbyTitle(shippingModeSelected, adrShippement.countrycode, listShipmentMethods)
    if(methodeSelected){
      setTotalPrice(cartTotal+parseFloat(methodeSelected.method_cost))
    }

   
   

  },[ adrShippement.countrycode,shippingModeSelected, items ])


  return (
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
  );
}

export async function getStaticProps() {
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
    revalidate: 60, // rechargement toutes les 10s
  };
}
