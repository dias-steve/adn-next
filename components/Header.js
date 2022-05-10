import React, { useState,useEffect } from "react";
import Image from "next/image";
import Logo from "./../public/logo.svg";
import LogoBlanc from "./../public/logo-blanc.svg";
import { useTheme } from '../lib/ThemeContext';
import {isMobile} from 'react-device-detect';

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  const { themeBlack, setThemeblack } = useTheme();
  useEffect(() =>{
    if (open){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "auto";
    }
    
  },[open])
  if(isMobile){
    return (
      <div className={`nav-item ${ open ? 'nav-item-background-white' : '' }`}>
      <div
        className="item-list"
      >
        <button className={`menu-button ${ themeBlack ? 'sub-menu-black-button':'sub-menu-white-button' }` } onClick={() => setOpen(!open)}>
          {open ? 'FERMER' : props.name}
        </button>
        {open && props.children}
      </div>
    </div>
    );
  }else{
  return (
    <div className="nav-item">
      <div
        className="item-list"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className={`menu-button ${ themeBlack ? 'sub-menu-black-button':'sub-menu-white-button' }` } onClick={() => setOpen(!open)}>
          {open ? 'Fermer': props.name}
        </button>
        {open && props.children}
      </div>
    </div>
  );}
};

export default function Header() {
  const { themeBlack, setThemeblack } = useTheme();
  return (
    <nav className={`menu-container global-container nav-global-container ${ themeBlack ? 'menu-black-color' : 'menu-white-color'}`}>
      <div className="content-container menu-principal">
        <div className="menu-columns menu-left">
          <NavItem name={"Menu"}>
            <div className="sub-menu">

              <ul>
                <li>

                  <div className={`sub-menu-item `}>
                    <span className={`${themeBlack? '' : 'sub-menu-item-white'}`}>Collections</span>
                  </div>
                </li>
                <li>
                  <div className="sub-menu-item">
                    <span className={`${themeBlack? '' : 'sub-menu-item-white'}`}>Shootbook</span>
                  </div>
                </li>
                <li>
                  <div className="sub-menu-item">
                    <span className={`${themeBlack? '' : 'sub-menu-item-white'}`}>A propos de UNADN</span>
                  </div>
                </li>
                <li>
                  <div className="sub-menu-item">
                    <span className={`${themeBlack? '' : 'sub-menu-item-white'}`}>Nous contacter</span>
                  </div>
                </li>
              </ul>
            </div>
          </NavItem>
        </div>
        <div className="menu-columns menu-center">
          <div className="img-wrapper">
            <Image className={"logo"} src={themeBlack ? Logo: LogoBlanc} layout="fill" />
          </div>
        </div>
        <div className="menu-columns menu-right">Panier(0)</div>
      </div>
    </nav>
  );
}
