import React, { useEffect, useState} from "react";
import { useCart } from "react-use-cart";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ShippingForm from "../components/checkoutComponents/ShippingForm";
import PaiementForm from "../components/checkoutComponents/PaiementForm";
import CheckoutSideBar from "../components/checkoutSideBar/CheckoutSideBar";

//redux
import { useDispatch, useSelector} from 'react-redux';
import {setListShippementAvailable, setTotalPriceOrder, setListCountryShippementAvailable  } from "../redux/Order/order.actions";
import { getListCountryShipments } from "../utils/checkout.utils";

const mapState = (state) => ({ 
  order: state.order
})
export default function Checkout(props) {

  //redux
  const dispatch = useDispatch();
  const {order}= useSelector(mapState)
  const [stripePromise,setStripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY))
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
  const [nbItems, setNbItems] = useState(0);
  const {items, cartTotal, totalItems } = useCart()
  

  //Chargement des mode de livraison
  useEffect(() =>{
    dispatch(
      setListShippementAvailable(props.shipments) 
    )

    dispatch(
      setListCountryShippementAvailable(getListCountryShipments(props.shipments, "country"))
    )
  },[])

  //calcule du prix total (article + frais de livraison)
  useEffect(()=>{
    dispatch(
      setTotalPriceOrder((cartTotal+parseFloat(order.shippement_mode_selected.method_cost)).toFixed(2))
    )
  },[ order.shippement_data.countrycode,order.shippement_mode_selected, items ])

// mise à jour du prix total lorsque le panier est modifié
useEffect(()=>{
   setCartTotalPrice(cartTotal);
   setNbItems(totalItems);
},[items])

  return (
    <Elements stripe={stripePromise}>
    <div className="checkout-page-styles">
      <div className="global-container">
        <div className="content-container">
        <div className="checkout-shipping-container">
          
          <form>
            <ShippingForm listCountryShippment= {getListCountryShipments(props.shipments, "country")} />
            <PaiementForm />
          </form>
          <div className="right-price">
          <div className="checkout-price-wrapper">
        <div className= 'checkout-info sub-info-wrapper'><p className="sub-info info-label subtotal-label">Sous-total<br/> ({nbItems} article{nbItems > 1 && 's'}):</p> <p className=" sub-info info-value"> {cartTotalPrice}€</p></div>
        <div className= 'checkout-info sub-info-wrapper'><p className=" sub-info info-label livraison-label">Livraison: {order.shippement_mode_selected.method_user_title}:</p> <p className=" sub-info info-price">{ order.shippement_mode_selected.method_cost}€</p></div>
        <div className= 'checkout-info info-label checkout-total'><p className="big-info total-label  checkout-total">Total:</p> <p className="checkout-total total-value">{order.total_price}€</p></div>
        </div>
          </div>

       
          </div>
        
        </div>
      
        <CheckoutSideBar/>
      </div>
     

    </div>
    
    </Elements>
  );
}



export const getServerSideProps = async () => {
  const data = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA+ "/shipments", {
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
  };
};