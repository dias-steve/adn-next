import React from "react";
import { useCart } from "react-use-cart";

export default function CheckoutSideBar({totalPrice, nbItems,  shippingPrice, totalCart, shippingTitle}) {


    return <div className="checkoutSideBar-style">
        <div className="checkoutSideBar-wrapper">
        <div className= 'checkout-info sub-info-wrapper'><p className="sub-info info-label subtotal-label">Sous total<br/> ({nbItems} article{nbItems > 1 && 's'}):</p> <p className=" sub-info info-value"> {totalCart}€</p></div>
        <div className= 'checkout-info sub-info-wrapper'><p className=" sub-info info-label livraison-label">Livraison: {shippingTitle}:</p> <p className=" sub-info info-price">{ shippingPrice}€</p></div>
        <div className= 'checkout-info info-label checkout-total'><p className="big-info total-label  checkout-total">Total:</p> <p className="checkout-total total-value">{totalPrice}€</p></div>
        </div>
    </div>;
}
