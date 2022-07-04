import React, { useEffect, useState } from "react";
import CartDetail from "../components/CartDetail";
import { useCart } from "react-use-cart";
import { useShowModalCart } from "../lib/ModalContext";
import CartContainer from "../components/CartContainer/CartContainer";
import BaseFormCheckout from "../components/BaseFormCheckout/BaseFormCheckout";
import StateStepForm from "../components/StateStepForm/StateStepForm";

export default function Cart() {
  const { items, cartTotal, totalItems } = useCart();

  
  return (
    <div className="page-cart">
      <div className="global-container">
        <div className=" content-container">
          <StateStepForm />
          <div className="wrapper-form-step">
            <CartContainer />
          </div>
     
          <BaseFormCheckout 
            nextStepLabel="Passer commande"
            PreviousStepLabel="Retourner au panier"
            total={cartTotal}
            totalLabel="Sub-total"
            nbItems = {totalItems}
          />
        </div>
      </div>
    </div>
  );
}
