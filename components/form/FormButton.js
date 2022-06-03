import React from 'react'

export default function FormButton({name, ...otherProps}) {
  return (
    <button {...otherProps}>
            <div  className="btn-primary">
      <span>{name}</span>
    </div>
    
    </button>
  )
}
