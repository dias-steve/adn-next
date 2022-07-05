import React, {useState, useEffect} from 'react'
import { useCart } from "react-use-cart";
import {v4 as uuidv4} from 'uuid';
import errorIcon from '../public/error.svg'
import Image from 'next/image'; 
import {getItemError, checksItemsStockInCart, getMessageErrorCartItem, resolveQuatinityCartError } from '../utils/cart.utlis.js'


import Link from "next/link";
//redux
import { useDispatch, useSelector } from "react-redux";

const mapState = (state) => ({
    list_notvalid_items: state.order.list_notvalid_items,
  });



const QuantityBtn = ({item, limiteQuantity = -1, error}) => {
    const { updateItemQuantity } = useCart()
    let quantity= parseInt(item.quantity)
    const notHaveLimitQuantity = limiteQuantity <= -1
    

    const showMoreBtn = () => {
        if(limiteQuantity<= -1){

            return true
        }else{
            if( quantity < limiteQuantity){
                console.log('limit'+quantity)

                return true
            }
            return false
        }

        return false

    }

    return ( <div className='quantity-btn'>
        {item.quantity > 1 && <button className='btn-delete btn-quantity' onClick={() => {updateItemQuantity(item.id, quantity-1)}}><span > - </span></button>}
        {showMoreBtn() && <button className='btn-delete btn-quantity' onClick={() => {updateItemQuantity(item.id, quantity+1)}}><span > + </span></button>}
    </div>)
}
export default function CartDetail() {
    const [itemsInCart, setitemsInCart] = useState([])
    const [isEmptyCart, setIsEmptyCart] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)
    const {items, removeItem, isEmpty, cartTotal, updateItemQuantity, updateItem, inCart } = useCart()
    const dispatch = useDispatch();
    const {   list_notvalid_items} = useSelector(mapState);

    useEffect(() => {
        setitemsInCart(items)
        setIsEmptyCart(isEmpty)
        setTotalPrice(cartTotal)
       
            
            //checksItemsStockInCart(items,  dispatch) 
    
      
    }, [items])

useEffect(()=> {
   
  }, [ list_notvalid_items])
    
  return (
    <div className='cart-list-container'> 
       <ul>
        {itemsInCart.map((item)=>{

            const errorItem = getItemError(item.id,list_notvalid_items)
            let limiteQuantity = -1;
            
            let error = errorItem !== null ? true : false

            

            if(error && errorItem.code_error === 20 ){
                limiteQuantity = parseInt(errorItem.stock_quantity)
                if(limiteQuantity >= parseInt(item.quantity)){
                    error = false
                }
                
            }
            return(
            <li className= 'cart-item-container' key={uuidv4()}>
                {error && 
                    <div className='error-icon-item-cart'>
                    <div className="icon-wrapper">
                    <Image src={errorIcon} alt={'icon erreur'} layout='fill' className={'image'}/>
                    </div>
                       
                    </div>
                }
                <Link href={`/product/${item.idlink}`}>
                <a>
                    <div className="image-wrapper">
                    <Image src={item.img.url} alt={item.img.alt} layout='fill' className={'image'}/>
                    </div>
                </a>
               </Link> 
                <div className='cart-item-detail '> 
                
                {error && 
                     <p className='erreur-message-item-cart'>{getMessageErrorCartItem(errorItem)}</p>
                }
                <Link href={`/product/${item.idlink}`}>
                <a>
               <h2 className='name-item-text'>  {item.name} </h2>
               </a>
               </Link> 
               <p className='quantity-item-text' >  {item.price}€ </p>
               <div className='quantity-item-content'>
                <p className='quantity-item-text' >  quantité:{item.quantity} </p>
                {!item.unique && <QuantityBtn item={item} limiteQuantity={limiteQuantity}/>}
               </div>
  
                

                <button className='btn-delete' onClick={() => {removeItem(item.id)}}><span > Retirer </span></button>
           
                </div>

              
             


               
                
            </li>
        )})}

        </ul>

    </div>

  )
}
