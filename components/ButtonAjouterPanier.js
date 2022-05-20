import React from 'react'

export default function ButtonAjouterPanier({btnConfiguration, onClick}) {
  return (
    <button className='btn-ajouter-panier'{...btnConfiguration} onClick={onClick}>
    <div  className="btn-primary">
    <span>Ajouter au panier </span>
    </div>
    </button>
  )
}
