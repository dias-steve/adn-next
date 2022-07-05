import React, { useEffect, useState, useRef } from "react";
import { useCart } from "react-use-cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//Componements
import ShippingForm from "../components/checkoutComponents/ShippingForm";
import PaiementForm from "../components/checkoutComponents/PaiementForm";
import CheckoutSideBar from "../components/checkoutSideBar/CheckoutSideBar";
import StateStepForm from "../components/StateStepForm/StateStepForm";
import SideBarCheckoutDesktop from "../components/SideBarCheckoutDesktop";
import BaseFormCheckout from "../components/BaseFormCheckout/BaseFormCheckout";
import CartContainer from "../components/CartContainer/CartContainer";
// use component

import { useTheme } from "../lib/ThemeContext"

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setListShippementAvailable,
  setTotalPriceOrder,
  setListCountryShippementAvailable,
} from "../redux/Order/order.actions";
import { getListCountryShipments, CheckCartItemValid  } from "../utils/checkout.utils";

const mapState = (state) => ({
  order: state.order,
});
export default function Checkout(props) {
  //redux
  const dispatch = useDispatch();
  const { order } = useSelector(mapState);

  const { items, cartTotal, totalItems } = useCart();

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
  const [windowFormWidth, setWindowsFormWidth] = useState(0);
  const styleItemForm = { width: windowFormWidth };
  const windowFormRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const nextSteplabel = ['Passer Commande', 'Payer Maintenant', ' Payer Maintenant']
  const previousSteplabel = ['Retourner à la boutique', 'Modifier le panier', ' Modifier la Livraison']
  const TotalSteplabel = [
    {
      label: 'Sous-Total',
      value: cartTotalPrice
  }, {
    label: 'Total TTC',
    value: order.total_price
  }, {
    label: 'Net à Payer',
    value: order.total_price
  }]
  

  const nexToShippement = async() => {
    const check = await CheckCartItemValid(items, dispatch)
    if (check){
      const nextStepNb = currentStep + 1;
      setCurrentStep(nextStepNb);
    } 
  }

  const nextStep = async () => {
    if(currentStep === 1){
      nexToShippement()
    }
    if(currentStep === 2){
      const nextStepNb = currentStep + 1;
      setCurrentStep(nextStepNb);
      //Validation du form la livraion
    }

    if(currentStep === 3){
      // Vérification des stock
      //Validation du form de livraison
      //Paiement
      // selon pb retour currentStep = 1 ou 2 ou 3
    }

  };

  const previousStep = () => {
    const previousStepNb = currentStep - 1;
    setCurrentStep(previousStepNb);
  };
  //Chargement des mode de livraison
  useEffect(() => {
  

    
    dispatch(setListShippementAvailable(props.shipments));

    dispatch(
      setListCountryShippementAvailable(
        getListCountryShipments(props.shipments, "country")
      )
    
    
    );
    return ( setShowHeader(true))
    
    
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])
  //calcule du prix total (article + frais de livraison)
  useEffect(() => {
    dispatch(
      setTotalPriceOrder(
        (
          cartTotal + parseFloat(order.shippement_mode_selected.method_cost)
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
    setCartTotalPrice(cartTotal);
    setNbItems(totalItems);
  }, [items]);

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-page-styles">
        <div className="global-container">
          <div className="content-container">
            <StateStepForm currentStep={currentStep} />
            <div className="checkout-shipping-container">
              <form>
                <div  ref={windowFormRef} className="wrapper-form-step">
                  <div
                    className={`step-form-item ${
                      currentStep === 1 ? "visible-item" : "notvisible-item"
                    }`}
                  >
                    <CartContainer itemInValid = {[]} />
                  </div>

                  <div
                    className={`step-form-item ${
                      currentStep === 2 ? "visible-item" : "notvisible-item"
                    }`}
                  >
                    <ShippingForm
                      listCountryShippment={getListCountryShipments(
                        props.shipments,
                        "country"
                      )}
                    />
                  </div>

                  <div
                    className={`step-form-item ${
                      currentStep === 3 ? "visible-item" : "notvisible-item"
                    }`}
                  >
                    <PaiementForm />
                  </div>
                  <BaseFormCheckout
                  nextStepLabel={nextSteplabel[currentStep-1]}
                  PreviousStepLabel={previousSteplabel[currentStep-1]}
                  total={TotalSteplabel[currentStep-1].value}
                  totalLabel={TotalSteplabel[currentStep-1].label}
                  nbItems={nbItems}
                  handelNextStep={() => {
                    nextStep();
                  }}
                  handlePreviousStep={() => {
                    previousStep();
                  }}
                />
                </div>


              </form>
              <SideBarCheckoutDesktop
                nbItems={nbItems}
                cartTotalPrice={cartTotalPrice}
                method_user_title={
                  order.shippement_mode_selected.method_user_title+ (currentStep<2 ? '(Estimation)': '')
                }
                method_cost={order.shippement_mode_selected.method_cost}
                total_price={order.total_price}
              />

            </div>

          </div>
          <CheckoutSideBar />
        </div>
      </div>
    </Elements>
  );
}

export const getServerSideProps = async () => {
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

  const shipments = await data.json();

  return {
    props: {
      shipments,
    },
  };
};
