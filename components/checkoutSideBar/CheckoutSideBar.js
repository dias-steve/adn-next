import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//lib
import { useCart } from "react-use-cart";

const mapState = (state) => ({
  order: state.order,
});

export default function CheckoutSideBar() {
  const { order } = useSelector(mapState);
  const { items, cartTotal, totalItems } = useCart();

  const [showSideBar, setShowSideBar] = useState(true);
  const [y, setY] = useState(0);

  // Cart value to show in side bar
  const [subTotal, setSubTotal] = useState(0);
  const [nbItemsInCart, setNbItemsInCart] = useState(0);

  // annimation on scroll
  const handlebottom = (e) => {
    const window = e.currentTarget;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  };

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", (e) => handlebottom(e));
    return window.removeEventListener("scroll", (e) => handlebottom(e));
  }, [y]);

  // Actualisation value of cart to show on SideBar
  useEffect(() => {
    setSubTotal(parseFloat(cartTotal).toFixed(2));
    setNbItemsInCart(totalItems);
  }, [items]);

  return (
    <div
      className={`checkoutSideBar-style ${
        showSideBar ? "checkoutSideBar-up" : "checkoutSideBar-down"
      }`}
    >
      <div className="checkoutSideBar-wrapper">
        <div className="checkout-info sub-info-wrapper">
          <p className="sub-info info-label subtotal-label">
            Sous-total
            <br /> ({nbItemsInCart} article{nbItemsInCart > 1 && "s"}):
          </p>
          <p className=" sub-info info-value"> {subTotal}€</p>
        </div>
        <div className="checkout-info sub-info-wrapper">
          <p className=" sub-info info-label livraison-label">
            Livraison: {order.shippement_mode_selected.method_user_title}:
          </p>
          <p className=" sub-info info-price">
            {order.shippement_mode_selected.shipping_cost_calculated == 0 ? 'Gratuit' : 
                        order.shippement_mode_selected.shipping_cost_calculated+'€'}
          </p>
        </div>
        <div className="checkout-info info-label checkout-total">
          <p className="big-info total-label  checkout-total">Total:</p>
          <p className="checkout-total total-value">{order.total_price}€</p>
        </div>
      </div>
    </div>
  );
}
