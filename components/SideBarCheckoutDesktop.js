import React from 'react'

export default function SideBarCheckoutDesktop({nbItems,cartTotalPrice,method_user_title,method_cost,total_price}) {
  return (
    <div className="right-price">
    <div className="checkout-price-wrapper">
      <div className="checkout-info sub-info-wrapper">
        <p className="sub-info info-label subtotal-label">
          Sous-total
          <br /> ({nbItems} article{nbItems > 1 && "s"}):
        </p>
        <p className=" sub-info info-value"> {cartTotalPrice}€</p>
      </div>
      <div className="checkout-info sub-info-wrapper">
        <p className=" sub-info info-label livraison-label">
          Livraison:
          {method_user_title}:
        </p>
        <p className=" sub-info info-price">
          {method_cost}€
        </p>
      </div>
      <div className="checkout-info info-label checkout-total">
        <p className="big-info total-label  checkout-total">
          Total:
        </p>
        <p className="checkout-total total-value">
          {total_price}€
        </p>
      </div>
    </div>
  </div>
  )
}
