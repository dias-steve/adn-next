import React, {useEffect, useState} from "react";
import { useCart } from "react-use-cart";
import { useDispatch, useSelector} from 'react-redux';


const mapState  = state => ({
  order: state.order,
});

export default function CheckoutSideBar() {
  const [y, setY] = useState(0);
  const [showSideBar, setShowSideBar] = useState(true);
  const [subTotal, setSubTotal] = useState(0)
  const [nbItemsInCart, setNbItemsInCart] = useState(0);
  const {order} = useSelector(mapState);
  const {items, removeItem, isEmpty, cartTotal, updateItemQuantity, totalItems } = useCart()


  const handlebottom = (e) => {
    const window = e.currentTarget;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-100) {
     
        setShowSideBar(false)
        // Show loading spinner and make fetch request to api
     }else{
        setShowSideBar(true)
     }
    
    
  };
  useEffect(()=>{
    setSubTotal(cartTotal);
    setNbItemsInCart(totalItems);
 },[items])

  useEffect(() => {
    setY(window.scrollY);
   
    window.addEventListener("scroll", (e) => handlebottom (e));
    return window.removeEventListener("scroll",  (e) => handlebottom (e))
  }, [y]);

    return <div className={`checkoutSideBar-style ${ showSideBar ? 'checkoutSideBar-up':'checkoutSideBar-down' }`}>
        <div className="checkoutSideBar-wrapper">
        <div className= 'checkout-info sub-info-wrapper'><p className="sub-info info-label subtotal-label">Sous-total<br/> ({nbItemsInCart} article{nbItemsInCart > 1 && 's'}):</p> <p className=" sub-info info-value"> {subTotal}€</p></div>
        <div className= 'checkout-info sub-info-wrapper'><p className=" sub-info info-label livraison-label">Livraison: {order.shippement_mode_selected.method_user_title}:</p> <p className=" sub-info info-price">{ order.shippement_mode_selected.method_cost}€</p></div>
        <div className= 'checkout-info info-label checkout-total'><p className="big-info total-label  checkout-total">Total:</p> <p className="checkout-total total-value">{order.total_price}€</p></div>
        </div>
    </div>;
}
