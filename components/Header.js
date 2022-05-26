import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "./../public/logo.svg";
import LogoBlanc from "./../public/logo-blanc.svg";
import { useTheme } from "../lib/ThemeContext";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import CartDetail from "./CartDetail";
import { useCart } from "react-use-cart";

const SubMenu = ({showMenu, handleShowMenu}) => {

  return (
  <div className={`sub-menu ${showMenu? 'sub-menu-show':'sub-menu-hide'}`}>
    <button onClick={() => {handleShowMenu()}}>
    <div className="close-wrapper">
      <span>X</span>
    </div>
    </button>
    
    <CartDetail />
    <ul>
    
      <li>

        <div className="sub-menu-item">
        <Link href={'/'} >
        <a onClick={() => {handleShowMenu()}}>
          <span>
            Accueil
          </span>
          </a>
        </Link>
        </div>
   
      </li>
      

      <li>
        <div className="sub-menu-item">
          <span>
            Collections
          </span>
        </div>
      </li>
      <li>
        <div className="sub-menu-item">
          <span>
            Lookshoots
          </span>
        </div>
      </li>
      <li>
        <div className="sub-menu-item">
          <span>
            A propos de UNADN
          </span>
        </div>
      </li>
    </ul>
  </div>
  )
}

export default function Header() {
  const { themeBlack, setThemeblack } = useTheme();
  const [y, setY] = useState(0);
  const [up, setUp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [nbItemsInCart, setNbItemsInCart] = useState([])

  const {items, totalItems } = useCart()

  useEffect(() => {
    setNbItemsInCart(totalItems)
  }, [items])

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  
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
    <SubMenu showMenu={showMenu} handleShowMenu={()=>{handleShowMenu()}}/>
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
            <Image
              className={"logo"}
              src={themeBlack ? Logo : LogoBlanc}
              layout="fill"
            />
          </div>
        </div>
        <div className="menu-columns menu-right">Panier({nbItemsInCart})</div>
      </div>
    </nav>
    </>
  );
}
