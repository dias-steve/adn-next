import React from 'react'

export default function FormInput({ handleChange, label, ...otherProps}) {
  return (
    <div className= "forminput-styles">
    {label && (
        <label>
            {label}
        </label>
    )}

    <input className="formInput" onChange={handleChange} {...otherProps}/>
</div>
  )
}
