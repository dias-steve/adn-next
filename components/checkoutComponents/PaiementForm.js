import React from 'react'

export const RadioSelect = ({sameFacturation,
    setSameFacturation}) => {
        
        const handleCheckboxFacturation = () => {
            setSameFacturation(!sameFacturation)
        }
        return (
            <div  className='checkbox-facturation'>
               
            <label>
            <input
             
              type="checkbox"
                id='sameFacturation'
                checked= {sameFacturation}
              onChange={() => { 
                  handleCheckboxFacturation()
              }}
            />
            <div className="radio-label">
              <div className="cercle-out">
                <div className="cercle-in"/>
                </div>
                <span>Meme adresse de facturation
               </span>
            </div>
          </label>
          </div>
        )

}

export const facturationForm = () => {
    
}
export default function PaiementForm({
    sameFacturation,
    setSameFacturation,
    adrPaiement,
    setAdrPaiement
  }) {

    
  return (
    <div className="paiementform-component">
         <h2 className="checkout-sub-title">Paiement</h2>
         <div className="wrapper-fields">
            <RadioSelect sameFacturation={sameFacturation}  setSameFacturation={ setSameFacturation} />
            {sameFacturation ? 'true' : 'false'}

         </div>
    </div>
  )
}
