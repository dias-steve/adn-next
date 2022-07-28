import React, {useState, useEffect} from 'react'
import CartDetail from '../CartDetail'
import { useCart } from "react-use-cart";
import Button from '../Button';
import chevron from '../../public/chevron-left-gray.svg'
import ButtonCercle from '../ButtonCercle/ButtonCercle';

import styles from './CartDetailModal.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { handleSetShowCartModal } from '../../utils/cartModal.utils';

const mapState = (state) => ({
  cartModal: state.cartModal
});
export default function CartDetailModal({handleShowCart, showCart}) {
  const dispatch = useDispatch()
  const [itemsInCart, setitemsInCart] = useState([])
  const [isEmptyCart, setIsEmptyCart] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const [nbItems, setNbItems] = useState(0)
  const {items, isEmpty, cartTotal, totalItems  } = useCart()
  const {cartModal} = useSelector(mapState)


  useEffect(() => {
      setitemsInCart(items)
      setIsEmptyCart(isEmpty)
      setTotalPrice(cartTotal)
      setNbItems(totalItems)
  }, [items])
  
  return (
    <div className={[styles.cartdetailmodalStyles, cartModal?.show_cart_modal ? styles.cartdetailmodalShow : styles.cartdetailmodalHide ].join(" ")}>
        
    <div className={styles.closeWrapper}>
    <ButtonCercle
      img={chevron}
      alt={'icon fermer panier'}
      handleClick={() => {handleSetShowCartModal(false,dispatch)}}
      toRightReverse={true}

    />
    </div>
   
    <div className={styles.cartdetailWrapper}>
      <CartDetail />
    </div>

    <div className={styles.cartInfo}>
        { isEmptyCart ?'': <>
        <p className={styles.cartTotalItems}>
          {nbItems} article{nbItems > 1 && "s"}
        </p>
        <p className={styles.cartTotalPrice}> <span>Sous-total:</span> {totalPrice.toFixed(2)}€ </p>
        <Button name={'Passer commande'} url='/checkout'/></>}
        </div> 
    </div>
  )
}
