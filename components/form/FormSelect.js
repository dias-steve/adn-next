import React from 'react';
import {v4 as uuidv4} from 'uuid';

export default function FormSelect({attributslug, options, defaultValue, handleChange, label, ...otherProps}) {
  return (
    <div className='form-option'>
        {label && (
        <label>
          {label}
        </label>
      )}
    <select className="formSelect"  onChange={handleChange} {...otherProps}>
        {options.map((option) => {
          

          return (
            <option key={uuidv4()} >{option}</option>
          );
        })}
      </select>
    </div>
  )
}
