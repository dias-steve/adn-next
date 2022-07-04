import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

//Styles
import styles from "./CartContainer.module.scss";

//Components
import CartDetail from "./../CartDetail.js";

export default function CartContainer() {
    
    const { cartTotal, items } = useCart();
    const [subTotal, setSubTotal] = useState(0)

    //initalisation

    useEffect(()=> {
        setSubTotal(subTotal)
    },[items])


    return (
        <>
            <div className={styles.containerCartContainer}>
                <div className={styles.wrapper}>
                <h1 className={styles.title}> Panier </h1>
                <div className={styles.cartDetailWrapper}>
                    <CartDetail />
                </div>
                </div>
            </div>
        </>
    );
}
