import React from 'react'
import CartDetail from '../components/CartDetail'
import { useCart } from "react-use-cart";
export default function Cart() {
    const {items} = useCart()
  return (
    
      <CartDetail />
    
  )
}
