import React, { useEffect } from "react";
import CartDetail from "../components/CartDetail";
import { useCart } from "react-use-cart";
import { useShowModalCart } from "../lib/ModalContext";
import CartContainer from "../components/CartContainer/CartContainer";
import BaseFormCheckout from "../components/BaseFormCheckout/BaseFormCheckout";

export default function Cart() {
  const { items } = useCart();




  return (
    <div className="page-cart">
      <div className="global-container">
        <div className=" content-container">
          <CartContainer />
          <BaseFormCheckout />
        </div>
      </div>
    </div>
  );
}
