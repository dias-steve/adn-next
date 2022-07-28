import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Logo from "./../public/logo.svg";
import LogoBlanc from "./../public/logo-blanc.svg";
import { useTheme } from "../lib/ThemeContext";
import { useShowModalCart } from "../lib/ModalContext";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import CartDetail from "./CartDetail";
import { useCart } from "react-use-cart";
import CartDetailModal from "./CartDetailModal/CartDetailModal";

import MenuModal from "./menu/MenuModal/MenuModal";

import {handleSetShowMenu} from "../utils/menu.utils"
import { handleSetShowCartModal } from "../utils/cartModal.utils";


export default function Header() {
  const { themeBlack, setThemeblack, showHeader } = useTheme();
  const [y, setY] = useState(0);
  const [up, setUp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [nbItemsInCart, setNbItemsInCart] = useState([])

  const { showModalCart, setShowModalCart } = useShowModalCart();

  const {items, totalItems } = useCart()

  const dispatch = useDispatch();

  useEffect(() => {
    setNbItemsInCart(totalItems)
  }, [items])

  const handleShowMenu = () => {

    handleSetShowMenu(true, dispatch)
    handleSetShowCartModal(false, dispatch)
  
  }



  /** up down posiiton menu on scoll */
  const handleNavigation = (e) => {
    const window = e.currentTarget;
    if (y-300 > window.scrollY || y <=0) {
  
      setUp(false);
      setY(window.scrollY);
    } else if (y+100 < window.scrollY) {

      setUp(true);
      setY(window.scrollY);
    }
    
    
  };

  useEffect(() => {
    setY(window.scrollY);
   
    window.addEventListener("scroll", (e) => handleNavigation(e));
    return window.removeEventListener("scroll",  (e) => handleNavigation(e))
  }, [y]);


  return (
    <>
    <MenuModal />
    <CartDetailModal showCart= {showModalCart} handleShowCart = {()=> {setShowModalCart(!showModalCart); setShowMenu(false)}}/>
    {showHeader &&
    <nav
      className={`menu-container global-container nav-global-container ${
        themeBlack ? "menu-black-color" : "menu-white-color"
      } ${ up ? 'menu-container-up' : 'menu-container-down'}`}
    >
      
      <div className="content-container menu-principal">
      
        <div className="menu-columns menu-left">
        <button
            className={`menu-button ${
              themeBlack ? "sub-menu-black-button" : "sub-menu-white-button"
            }`}
          
            onClick={() => {handleShowMenu()}}>
            Menu
        </button>
        </div>
        <div className="menu-columns menu-center">
          <div className="img-wrapper">
            <Link href={'/'}>
            <a>
            <Image
              className={"logo"}
              src={themeBlack ? Logo : LogoBlanc}
              layout="fill"
              alt='logo'
            />
          
            </a>
            </Link>
          </div>
        </div>

        <div className="menu-columns menu-right">        <button
            className={`menu-button ${
              themeBlack ? "sub-menu-black-button" : "sub-menu-white-button"
            }`}
          
            onClick={() => {handleSetShowCartModal (true, dispatch);     handleSetShowMenu(false, dispatch)}}>
            Panier({nbItemsInCart})
        </button></div>
      </div>
    </nav>
}
    </>
  );
}
