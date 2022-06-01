import React, { useEffect, useState } from "react";

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
export default function Checkout(props) {
  const initialStatAdress = {
    firstname: "",
    lastname: "",
    address: "",
    postalcode: "",
    departement: "",
    city: "",
    countrycode: "",
  };
  

  const ListShipmentMethods = props.shipments;
  const [adrShippement, setadrShippement] = useState({ initialStatAdress });

  const [shippingModeSelected, setShippingModeSelected] = useState(null)



  return (
    <div className="checkout-page-styles">
      <div className="global-container">
        <h1 className="checkout-title"> Passer Commande </h1>
        <div className="checkout-shipping-container">
          <form>
           <ShippingForm 
            adrShippement={adrShippement}
            setAdrShippement={setadrShippement}
            listShipmentMethods={ListShipmentMethods}
            shippingModeSelected={shippingModeSelected}
            setShippingModeSelected={setShippingModeSelected}
            
            />
          </form>
        </div>
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
