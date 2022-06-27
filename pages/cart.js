import React, {useEffect}from 'react'
import CartDetail from '../components/CartDetail'
import { useCart } from "react-use-cart";
import { useShowModalCart } from "../lib/ModalContext";


export default function Cart() {
    const {items} = useCart()
    const {showModalCart, setShowModalCart} = useShowModalCart();

  useEffect(() => {
    setShowModalCart(false)
  },[])

  return (
    
    <div>
      <CartDetail/>
    </div>
    
  )
}
