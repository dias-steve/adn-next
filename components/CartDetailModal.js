import React from 'react'
import CartDetail from './CartDetail'

export default function CartDetailModal({handleShowCart, showCart}) {
  
  return (
    <div className={`cartdetailmodal-styles ${ showCart? 'cartdetailmodal-show' : 'cartdetailmodal-hide'  }`}>
        <button onClick={() => {handleShowCart()}}>
    <div className="close-wrapper">
      <span>X</span>
    </div>
    </button>
    
    <CartDetail />
    </div>
  )
}
