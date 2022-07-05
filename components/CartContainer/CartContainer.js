import React, { useEffect, useState, useRef } from "react";
import { useCart } from "react-use-cart";

//Styles
import styles from "./CartContainer.module.scss";

//Components
import CartDetail from "./../CartDetail.js";

export default function CartContainer() {
    
    const { items } = useCart();
    const [subTotal, setSubTotal] = useState(0)
    const [heightwrapper, setHeightwrapper] = useState(0)
    const cartDetailRef = useRef(null)
    
    //initalisation

    function calcHeight(el) {
        const height = el.offsetHeight;
        setHeightwrapper(height);
      }
    useEffect(()=> {
        setTimeout(()=> {
                calcHeight(cartDetailRef.current.firstChild.firstChild)
        }, 300)
            
    },[])

    useEffect(()=> {
        setSubTotal(subTotal)
        setTimeout(()=> {
            calcHeight(cartDetailRef.current.firstChild.firstChild)
    }, 300)
    },[items])

    return (
        <>
            <div className={styles.containerCartContainer}>
                <div className={styles.wrapper}>
                <h1 className={styles.title}> Panier </h1>
                <div className={styles.cartDetailWrapper} ref= {cartDetailRef} style={{height: heightwrapper}}>
                    <div className= {styles.cartDetailInnerWrapper}>
                    <CartDetail />
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
