import React, {useEffect, useState} from "react";
import { useCart } from "react-use-cart";

export default function CheckoutSideBar({totalPrice, nbItems,  shippingPrice, totalCart, shippingTitle}) {
    const [y, setY] = useState(0);
    const [showSideBar, setShowSideBar] = useState(true);
  const handlebottom = (e) => {
    const window = e.currentTarget;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-100) {
     
        setShowSideBar(false)
        // Show loading spinner and make fetch request to api
     }else{
        setShowSideBar(true)
     }
    
    
  };

  useEffect(() => {
    setY(window.scrollY);
   
    window.addEventListener("scroll", (e) => handlebottom (e));
    return window.removeEventListener("scroll",  (e) => handlebottom (e))
  }, [y]);

    return <div className={`checkoutSideBar-style ${ showSideBar ? 'checkoutSideBar-up':'checkoutSideBar-down' }`}>
        <div className="checkoutSideBar-wrapper">
        <div className= 'checkout-info sub-info-wrapper'><p className="sub-info info-label subtotal-label">Sous-total<br/> ({nbItems} article{nbItems > 1 && 's'}):</p> <p className=" sub-info info-value"> {totalCart}€</p></div>
        <div className= 'checkout-info sub-info-wrapper'><p className=" sub-info info-label livraison-label">Livraison: {shippingTitle}:</p> <p className=" sub-info info-price">{ shippingPrice}€</p></div>
        <div className= 'checkout-info info-label checkout-total'><p className="big-info total-label  checkout-total">Total:</p> <p className="checkout-total total-value">{totalPrice}€</p></div>
        </div>
    </div>;
}
