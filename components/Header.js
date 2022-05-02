import React from 'react'
import Image from 'next/image'
import Logo from './../public/logo.svg'

export default function Header() {
  return (
    <nav className="menu-container global-container nav-global-container">
    <div className="content-container menu-principal">
        <div className="menu-columns menu-left"><span> Menu </span></div>
        <div className="menu-columns menu-center">
          <div className="img-wrapper"><Image className='logo' src={Logo} height={100} width={200} />
          </div>
        </div>
        <div className="menu-columns menu-right"><span>Panier(0)</span></div>
    </div>
</nav>
  )
}
