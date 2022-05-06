import React, { useState } from "react";
import Image from "next/image";
import Logo from "./../public/logo-blanc.svg";
import Link from "next/link";

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="nav-item">
      <div
        className="item-list"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className="menu-button" onClick={() => setOpen(!open)}>
          {props.name}
        </button>

        {open && props.children}
      </div>
    </div>
  );
};

export default function Header() {
  return (
    <nav className="menu-container global-container nav-global-container">
      <div className="content-container menu-principal">
        <div className="menu-columns menu-left">
          <NavItem name={"Menu"}>
            <div className="sub-menu">
              <ul>
                <li>

                  <div className="sub-menu-item">
                    <span>Collections</span>
                  </div>
                </li>
                <li>
                  <div className="sub-menu-item">
                    <span>Shootbook</span>
                  </div>
                </li>
                <li>
                  <div className="sub-menu-item">
                    <span>A propos de UNADN</span>
                  </div>
                </li>
                <li>
                  <div className="sub-menu-item">
                    <span>Nous contacter</span>
                  </div>
                </li>
              </ul>
            </div>
          </NavItem>
        </div>
        <div className="menu-columns menu-center">
          <div className="img-wrapper">
            <Image className={"logo"} src={Logo} height={100} width={200} />
          </div>
        </div>
        <div className="menu-columns menu-right">Panier(0)</div>
      </div>
    </nav>
  );
}
