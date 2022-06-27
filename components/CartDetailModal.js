import React, {useState, useEffect} from 'react'
import CartDetail from './CartDetail'
import { useCart } from "react-use-cart";
import Button from './Button';

export default function CartDetailModal({handleShowCart, showCart}) {
  const [itemsInCart, setitemsInCart] = useState([])
  const [isEmptyCart, setIsEmptyCart] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const {items, isEmpty, cartTotal } = useCart()


  useEffect(() => {
      setitemsInCart(items)
      setIsEmptyCart(isEmpty)
      setTotalPrice(cartTotal)
  }, [items])
  
  return (
    <div className={`cartdetailmodal-styles ${ showCart? 'cartdetailmodal-show' : 'cartdetailmodal-hide'  }`}>
        <button onClick={() => {handleShowCart()}}>
    <div className="close-wrapper">
      <span>X</span>
    </div>
    </button>
    <div className="cartdetail-wrapper">
      <CartDetail />
    </div>

    <div className="cart-info">
        { isEmptyCart ? <p className='emptycart-text'> Votre panier est vide</p>: <><span className="cart-total-price"> Sous-total {totalPrice.toFixed(2)}€ </span> <Button name={'Passer commande'} url='/cart'/></>}
        </div> 
    </div>
  )
}
