import React from 'react'

export default function FormInput({ handleChange, label, isValid, ...otherProps}) {
  return (
    <div className= {`forminput-styles ${!isValid && ' input-error '}` }>
    {label && (
        <label>
            {label}
        </label>
    )}

    <input className="formInput" onChange={handleChange} {...otherProps}/>
</div>
  )
}
