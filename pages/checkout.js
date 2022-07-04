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

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setListShippementAvailable,
  setTotalPriceOrder,
  setListCountryShippementAvailable,
} from "../redux/Order/order.actions";
import { getListCountryShipments } from "../utils/checkout.utils";

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

  // destop module
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [nbItems, setNbItems] = useState(0);


// 
  const [ windowFormWidth, setWindowsFormWidth] = useState(0)
  
  const styleItemForm = {width: windowFormWidth}

  const windowFormRef = useRef(null);

  //Chargement des mode de livraison
  useEffect(() => {


    setTimeout(()=> {
      setWindowsFormWidth(windowFormRef.current.offsetHeight)
}, 300)
    dispatch(setListShippementAvailable(props.shipments));

    dispatch(
      setListCountryShippementAvailable(
        getListCountryShipments(props.shipments, "country")
      )
    );
  }, []);

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
          <StateStepForm />
            <div className="checkout-shipping-container">
              <form>
                
                <div  ref ={windowFormRef} className="wrapper-form-window">
                <div className="wrapper-form-step" style={ {marginLeft: 0}}>
                  <div className= "step-form-item" style={ {width: windowFormWidth}}>
                    <CartContainer />
                  </div>
                  <div className= "step-form-item" style={ {width: windowFormWidth}}>
                  <ShippingForm
                    listCountryShippment={getListCountryShipments(
                      props.shipments,
                      "country"
                    )}
                  />
                  </div>
                  <div className= "step-form-item" style={ {width: windowFormWidth}}>
                  <PaiementForm />
                  </div>
                  </div>
                </div>
                <BaseFormCheckout
                  nextStepLabel="Passer commande"
                  PreviousStepLabel="Retourner au panier"
                  total={cartTotalPrice}
                  totalLabel="Sub-total"
                  nbItems={nbItems}
                />
              </form>
              <SideBarCheckoutDesktop
                nbItems={nbItems}
                cartTotalPrice={cartTotalPrice}
                method_user_title={
                  order.shippement_mode_selected.method_user_title
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
