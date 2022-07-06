import React, { useEffect, useState, useRef } from "react";
import { useCart } from "react-use-cart";

import {closeModal, handleSetConfigModal} from "../../utils/modal.utils"
import {
    CardElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setListShippementAvailable,
  setTotalPriceOrder,
  setListCountryShippementAvailable,
} from "../../redux/Order/order.actions";
import { getListCountryShipments, CheckCartItemValid, validatorShippementFormMultiStep, handleSubmitPayementForm  } from "../../utils/checkout.utils";

import ShippingForm from "../checkoutComponents/ShippingForm";
import PaiementForm from "../checkoutComponents/PaiementForm";

import StateStepForm from "../StateStepForm/StateStepForm";
import SideBarCheckoutDesktop from "../SideBarCheckoutDesktop";
import BaseFormCheckout from "../BaseFormCheckout/BaseFormCheckout";
import CartContainer from "../CartContainer/CartContainer";


const mapState = (state) => ({
  order: state.order,
  is_paying : state.modal.show_modal,
});

export default function MultiStepFrom({listCountryShippment}) {

      //redux
  const dispatch = useDispatch();
  const { order, is_paying } = useSelector(mapState);

  const { items, cartTotal, totalItems } = useCart();

  // stripe
  const stripe = useStripe();
  const elements = useElements();

  // desactivation of headers


  // destop module
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [nbItems, setNbItems] = useState(0);

  //step
  const [windowFormWidth, setWindowsFormWidth] = useState(0);
  const [goUpListener, setGoUpListener] = useState(false);
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
      closeModal(dispatch)
      const nextStepNb = currentStep + 1;
      setCurrentStep(nextStepNb);
    }else{


      setGoUpListener(!goUpListener)
    }
   
  }

  
  const nextToPayment = async() => {
    handleSetConfigModal(
      {
        is_loading: true,
        title: "",
        message: "",
      },
      dispatch
    );
    const check = validatorShippementFormMultiStep(order.shippement_data,dispatch, currentStep)
   
    if (check.message_error.length === 0){
      closeModal(dispatch)
      const nextStepNb = currentStep + 1;
      setCurrentStep(nextStepNb);
    }else{
      handleSetConfigModal(
        {
          is_loading: false,
          title: "Le formulaire est invalide",
          message:
            "Veuillez bien remplir tous les champs et accepter les conditions générales de vente",
          is_positif: false,
        },
        dispatch
      );
      setGoUpListener(!goUpListener)
    }
   
  }

  const nextToValidation = () => {
    handleSubmitPayementForm(dispatch, elements, order.shippement_data, items, order.shippement_mode_selected, stripe)
  }

  const nextStep = async () => {
    if(currentStep === 1){
      nexToShippement()
    }
    if(currentStep === 2){
      nextToPayment()
    }

    if(currentStep === 3){
      nextToValidation()
    }

  };

  const previousStep = () => {
    const previousStepNb = currentStep - 1;
    setCurrentStep(previousStepNb);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep, goUpListener])
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
    setCartTotalPrice(parseFloat(cartTotal).toFixed(2));
    setNbItems(totalItems);
  }, [items]);


  return (
        <>
        <StateStepForm currentStep={currentStep} />
        <div className="checkout-shipping-container">
            <form>
            <div ref={windowFormRef} className="wrapper-form-step">
                <div
                className={`step-form-item ${
                    currentStep === 1 ? "visible-item" : "notvisible-item"
                }`}
                >
                <CartContainer itemInValid={[]} currentStep={currentStep} />
                </div>

                <div
                className={`step-form-item ${
                    currentStep === 2 ? "visible-item" : "notvisible-item"
                }`}
                >
                <ShippingForm
                    listCountryShippment={listCountryShippment}
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
                nextStepLabel={nextSteplabel[currentStep - 1]}
                PreviousStepLabel={previousSteplabel[currentStep - 1]}
                total={TotalSteplabel[currentStep - 1].value}
                totalLabel={TotalSteplabel[currentStep - 1].label}
                nbItems={nbItems}
                handelNextStep={() => {
                    nextStep();
                }}
                handlePreviousStep={() => {
                    previousStep();
                }}
                isPaying= {is_paying} 
                />
            </div>
            </form>
            <SideBarCheckoutDesktop
            nbItems={nbItems}
            cartTotalPrice={cartTotalPrice}
            method_user_title={
                order.shippement_mode_selected.method_user_title +
                (currentStep < 2 ? "(Estimation)" : "")
            }
            method_cost={order.shippement_mode_selected.method_cost}
            total_price={order.total_price}
            />
        </div>
        </>
  );
}
