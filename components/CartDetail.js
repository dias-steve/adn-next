import React, {useState, useEffect} from 'react'
import { useCart } from "react-use-cart";
import {v4 as uuidv4} from 'uuid';
import Image from 'next/image'; 
import Button from './Button';
import Link from "next/link";


const QuantityBtn = ({item}) => {
    const { updateItemQuantity } = useCart()
    let quantity= parseInt(item.quantity)
    return ( <div className='quantity-btn'>
        {item.quantity > 1 && <button className='btn-delete btn-quantity' onClick={() => {updateItemQuantity(item.id, quantity-1)}}><span > - </span></button>}
        <button className='btn-delete btn-quantity' onClick={() => {updateItemQuantity(item.id, quantity+1)}}><span > + </span></button>
    </div>)
}
export default function CartDetail() {
    const [itemsInCart, setitemsInCart] = useState([])
    const [isEmptyCart, setIsEmptyCart] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    const {items, removeItem, isEmpty, cartTotal, updateItemQuantity } = useCart()


    useEffect(() => {
        setitemsInCart(items)
        setIsEmptyCart(isEmpty)
        setTotalPrice(cartTotal)
    }, [items])
    
  return (
    <div className='cart-list-container'> 


       <ul>
        {itemsInCart.map((item)=>(

            <li className= 'cart-item-container' key={uuidv4()}>
                <Link href={`/product/${item.idlink}`}>
                <a>
                    <div className="image-wrapper">
                    <Image src={item.img} layout='fill' className={'image'}/>
                    </div>
                    </a>
               </Link> 
                <div className='cart-item-detail '> 
                <Link href={`/product/${item.idlink}`}>
                <a>
               <h2 className='name-item-text'>  {item.name} </h2>
               </a>
               </Link> 
               <p className='quantity-item-text' >  {item.price}€ </p>
               <div className='quantity-item-content'>
                <p className='quantity-item-text' >  quantité:{item.quantity} </p>
                {!item.unique && <QuantityBtn item={item}/>}
               </div>
  
                

                <button className='btn-delete' onClick={() => {removeItem(item.id)}}><span > Retirer </span></button>
           
              
               </div>


               
                
            </li>
        ))}

        </ul>
        <div className="cart-info">
        { isEmptyCart ? <p className='emptycart-text'> Votre panier est vide</p>: <><span className="cart-total-price"> Sous-total {totalPrice.toFixed(2)}€ </span> <Button name={'Passer commande'} url='/'/></>}
        </div> 
    </div>

  )
}
