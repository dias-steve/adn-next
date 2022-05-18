import React from 'react'

export default function ButtonAjouterPanier({btnConfiguration}) {
  return (
    <button className='btn-ajouter-panier'{...btnConfiguration}>
    <div  className="btn-primary">
    <span>Ajouter au panier </span>
    </div>
    </button>
  )
}
