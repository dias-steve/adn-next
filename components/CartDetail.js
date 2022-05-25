import React, {useState, useEffect} from 'react'
import { useCart } from "react-use-cart";

export default function CartDetail() {
    const [itemsInCart, setitemsInCart] = useState([])
    const {items} = useCart()
    console.log('cart')
    console.log(items)

    useEffect(() => {
        setitemsInCart(items)
    }, [items])
    
  return (
    <div> 
       
        {itemsInCart.map((item)=>(
            <div key={item.id}> 
                id: {item.id} , quatity: {item.quantity}, {item.name}, {item.img}
                
            </div>
        ))}
    </div>

  )
}
