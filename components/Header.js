import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "./../public/logo.svg";
import LogoBlanc from "./../public/logo-blanc.svg";
import { useTheme } from "../lib/ThemeContext";
import { isMobile } from "react-device-detect";

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  const { themeBlack, setThemeblack } = useTheme();
  const [animationClose, setAnimationClose] = useState(false);
  

  const close = async (ms) => {
    setAnimationClose(true);

    await new Promise((r) => setTimeout(r, ms));

    
    setAnimationClose(false);
    setOpen(false);
  };

  const handleOpenCloseMenu = () => {
    if (open) {
      close(300);
    } else {
      setOpen(true);
      setAnimationClose(false)
    }
  };
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  if (isMobile) {
    return (
      <div className={`nav-item ${open ? "nav-item-background-white open-animation " : ''} ${animationClose? 'menu-close-animation': ''} `}>
        <div className="item-list">
          <button
            className={`menu-button ${
              themeBlack ? "sub-menu-black-button" : "sub-menu-white-button"
            }`}
            onClick={() => handleOpenCloseMenu()}
          >
            {open ? "FERMER" : props.name}
          </button>
          <div className={`sub-menu  `}>
            <ul>{open && props.children}</ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`nav-item ${open ? 'open-animation':''} ${animationClose ? 'menu-close-animation': ''}` }>
        <div
          className="item-list"
          onMouseEnter={() => handleOpenCloseMenu()}
          onMouseLeave={() => handleOpenCloseMenu()}
        >
          <button
            className={`menu-button ${
              themeBlack ? "sub-menu-black-button" : "sub-menu-white-button"
            }`}
            onClick={() => handleOpenCloseMenu()}
          >
            {open ? "Fermer" : props.name}
          </button>
          <div className={`sub-menu `}>
            <ul>{open && props.children}</ul>
          </div>
        </div>
      </div>
    );
  }
};

export default function Header() {
  const { themeBlack, setThemeblack } = useTheme();
  const [y, setY] = useState(0);
  const [up, setUp] = useState(false);


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
    <nav
      className={`menu-container global-container nav-global-container ${
        themeBlack ? "menu-black-color" : "menu-white-color"
      } ${ up ? 'menu-container-up' : 'menu-container-down'}`}
    >
      <div className="content-container menu-principal">
        <div className="menu-columns menu-left">
          <NavItem name={"Menu"}>
            <li>
              <div className={`sub-menu-item `}>
                <span className={`${themeBlack ? "" : "sub-menu-item-white"}`}>
                  Collections
                </span>
              </div>
            </li>
            <li>
              <div className="sub-menu-item">
                <span className={`${themeBlack ? "" : "sub-menu-item-white"}`}>
                  Shootbook
                </span>
              </div>
            </li>
            <li>
              <div className="sub-menu-item">
                <span className={`${themeBlack ? "" : "sub-menu-item-white"}`}>
                  A propos de UNADN
                </span>
              </div>
            </li>
            <li>
              <div className="sub-menu-item">
                <span className={`${themeBlack ? "" : "sub-menu-item-white"}`}>
                  Nous contacter
                </span>
              </div>
            </li>
          </NavItem>
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
        <div className="menu-columns menu-right">Panier(0)</div>
      </div>
    </nav>
  );
}
