import React from 'react'

export default function FormInput({ handleChange, label, isValid, messageError, ...otherProps}) {
  return (
    <div className= {`forminput-styles ${!isValid && ' input-error '}` }>
    {label && (
        <label>
            {label} 
            {!isValid && <span className= "input-message-error">  non valide</span>}
        </label>
    )}

    <input className="formInput" onChange={handleChange} {...otherProps}/>
</div>
  )
}
