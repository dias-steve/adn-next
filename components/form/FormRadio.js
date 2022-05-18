import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function FormRadio({
  selectedOption,
  handleOptionChange,
  options,
  name
}) {

  return (
    <div className="fromradio-component-styles">
        <span className="radio-group-name">{name}:</span>
        <div className="radio-group-wrapper">
      {options.map((option) => (
        <div key={uuidv4()} className="radio">
          <label>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option }
              onChange={handleOptionChange}
            />
            <div className="radio-label">
                <span>{option}</span>
            </div>

            
          </label>
        </div>
      ))}
      </div>

      
    </div>
  );
}
