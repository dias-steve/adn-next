import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function FormRadioVariations({
  selectedOption,
  handleOptionChange,
  options,
  name,
  optionsAvailbles,

}) {

  return (
    <div className="fromradio-component-styles">
        <span className="radio-group-name">{name}:</span>
        <div className="radio-group-wrapper">
      {options.map((option) => {

        if(optionsAvailbles[option]){
          return(
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
          )
        }else{
          return (     
              <div className="radio radio-label-not-available">
                <div className="stroke"/>
                <span>{option}</span>
                </div>
             )
            
        }


})}
      </div>

      
    </div>
  );
}
