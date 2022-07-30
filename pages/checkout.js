import React, { useEffect, useState, useRef } from "react";
import { useCart } from "react-use-cart";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//Componements
import ShippingForm from "../components/checkoutComponents/ShippingForm";
import PaiementForm from "../components/checkoutComponents/PaiementForm";
import CheckoutSideBar from "../components/checkoutSideBar/CheckoutSideBar";
import StateStepForm from "../components/StateStepForm/StateStepForm";
import SideBarCheckoutDesktop from "../components/SideBarCheckoutDesktop";
import BaseFormCheckout from "../components/BaseFormCheckout/BaseFormCheckout";
import CartContainer from "../components/CartContainer/CartContainer";
import MultiStepFrom from "../components/MultiStepFrom/MultiStepFrom";
// use component

import { useTheme } from "../lib/ThemeContext"
import {closeModal, handleSetConfigModal} from "../utils/modal.utils"


//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setListShippementAvailable,
  setTotalPriceOrder,
  setListCountryShippementAvailable,

} from "../redux/Order/order.actions";
import { handelResetOrderSession, getListCountryShipments, CheckCartItemValid, validatorShippementFormMultiStep, handleSubmitPayementForm ,  getListShipmentsAvailable } from "../utils/checkout.utils";
import { handleSetGeneralSettings } from "../utils/generealSettings.utils";
import { handleSetShowCartModal } from "../utils/cartModal.utils";

const mapState = (state) => ({
  order: state.order,
});
export default function Checkout(props) {
  //redux
  const dispatch = useDispatch();
  const { order } = useSelector(mapState);

  const { items, cartTotal, totalItems, emptyCart } = useCart();

  // stripe
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  );


  // desactivation of headers
  const {setShowHeader} = useTheme();
  setShowHeader(false)
  // destop module
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [nbItems, setNbItems] = useState(0);

  //step
  const [goUpListener, setGoUpListener] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
 
  



  




  //Chargement des mode de livraison
  useEffect(() => {
  
    handleSetShowCartModal(false, dispatch)
    handleSetGeneralSettings(props.generalSettings, dispatch)
  

    dispatch(
      setListCountryShippementAvailable(
        getListCountryShipments(props.shipments, "country")
      )

    
    );
    dispatch(setListShippementAvailable(getListShipmentsAvailable(props.shipments,items,cartTotal)));

    
    return ( setShowHeader(true))
    
    
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep, goUpListener])
  //calcule du prix total (article + frais de livraison)
  useEffect(() => {
    dispatch(
      setTotalPriceOrder(
        (
          cartTotal + parseFloat(order.shippement_mode_selected.shipping_cost_calculated)
        ).toFixed(2)
      )
    );

  }, [
    order.shippement_data.countrycode,
    order.shippement_mode_selected,
    items,
  ]);

  // mise à jour du prix total lorsque le panier est modifié
  useEffect(() => {
    setCartTotalPrice(parseFloat(cartTotal).toFixed(2));
    setNbItems(totalItems);
    dispatch(setListShippementAvailable(getListShipmentsAvailable(props.shipments,items,cartTotal)));

  }, [items]);

  useEffect(() => {
    if(order.order_session.done){
      emptyCart()
      handelResetOrderSession(dispatch)

      
    }
  }, [order.order_session.done ])

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-page-styles">
        <div className="global-container">
          <div className="content-container">

            <MultiStepFrom       listCountryShippment={getListCountryShipments(
                        props.shipments,
                        "country"
                      )}/>
          </div>
          <CheckoutSideBar />
        </div>
      </div>
    </Elements>
  );
}

export async function getServerSideProps  (){
  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/shipments",
    {
      // Adding method type
      method: "GET",

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  const generalSettingsRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/generalSettings", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const generalSettings = await generalSettingsRaw.json();
  const shipments = await data.json();

  return {
    props: {
      shipments,
      generalSettings,
    },

   
  };
};
