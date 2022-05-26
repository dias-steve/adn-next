import React, {useState, useEffect} from 'react'
import { useCart } from "react-use-cart";
import {v4 as uuidv4} from 'uuid';

export default function CartDetail() {
    const [itemsInCart, setitemsInCart] = useState([])
    const {items} = useCart()
    console.log('cart')
    console.log(items)

    useEffect(() => {
        setitemsInCart(items)
    }, [items])
    
  return (
    <div className='cart-list-container'> 
       
        {itemsInCart.map((item)=>(
            <div className= 'cart-item-container' key={uuidv4()}> 
                id: {item.id} , quatity: {item.quantity}, {item.name}, {item.img}
                
            </div>
        ))}
    </div>

  )
}
