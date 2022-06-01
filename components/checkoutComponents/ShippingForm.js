import React, {useEffect} from 'react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import FormInput from "../form/FormInput";
import {v4 as uuidv4} from 'uuid';
import {
  getListShippmentByCountryCode,
  getListCountryShipments,
} from "../../utils/checkout.utils";



const ShippingModeAvailbles = ({ listShipmentMethods,adrShippement, shippingModeSelected, setShippingModeSelected}) => {
  const listModeShippementAvailable = getListShippmentByCountryCode(
    adrShippement.countrycode,
    listShipmentMethods
  )


  return (
    <div className="shippementmodeavailbles-container">
       <h2 className="checkout-sub-title">Mode de livraison</h2>
      {listModeShippementAvailable &&
      <div className="shippementmode wrapper-fields">
         
        {listModeShippementAvailable.map((mode)=>{

          if(mode.method_is_enbled){
            return(
        
              <div  key= {uuidv4()} className='mode-shippement-item'>
               
                <label>
                <input
                 
                  type="radio"
                  value={mode.method_user_title}
                  checked={shippingModeSelected === mode.method_user_title }
                  onChange={(e) => {setShippingModeSelected(e.target.value)
                  console.log(e.target.value)
                  }}
                />
                <div className="radio-label">
                  <div className="cercle-out">
                    <div className="cercle-in"/>
                    </div>
                    <span>{mode.method_user_title} 
                    {mode.method_cost && <> +{mode.method_cost}€</>}
                   </span>
                </div>
              </label>
              </div>
                
            )
          }else{
            return <></>
          }

        }
        )}
      </div>
      }
    </div>
  )
}
export default function ShippingForm({ adrShippement, setAdrShippement, listShipmentMethods,  shippingModeSelected, setShippingModeSelected} ) {

  const handleSelectCountry = (country) => {
    setAdrShippement({ ...adrShippement, countrycode: country });
    console.log(adrShippement.countrycode);

  };

  useEffect(() => {
    handleSelectCountry("FR")
  },[])
  useEffect(() => {
  
    console.log(
      getListShippmentByCountryCode(
        adrShippement.countrycode,
        listShipmentMethods
      )
    );

 
  }, [adrShippement.country]);
  
  return (
    <div className="shippingform-component-styles">
        <div className="shipping-form-wrapper form-wrapper">
              <h2 className="checkout-sub-title">Détails de livraison</h2>
              <div className="wrapper-fields">
              <div className="names-wrapper">
                <FormInput type="text" className="" label="Nom" />
                <FormInput label="Prénom" />
              </div>

              <FormInput label="Adresse" />
              <div className="names-wrapper">
                <FormInput label="Code Postal" />
                <FormInput label="Département" />
              </div>
              <FormInput label="Ville" />
              <div className="countryDropddown-wrapper">
                <label>Pays</label>
                <CountryDropdown
                  whitelist={getListCountryShipments(
                    listShipmentMethods,
                    "country"
                  )}
                  value={adrShippement.countrycode}
                  valueType="short"
                  onChange={(val) => handleSelectCountry(val)}
                  defaultOptionLabel={"Selectionner un pays"}
                  showDefaultOption={false}
                  priorityOptions={["FR"]}
                />
              </div>
              <FormInput label="Numéro de téléphone" />
              <FormInput type="email" label="e-mail" />
              </div>
            </div>

            <ShippingModeAvailbles 
              listShipmentMethods={listShipmentMethods} 
              adrShippement={adrShippement}
              shippingModeSelected = {shippingModeSelected}
              setShippingModeSelected = {setShippingModeSelected}
              
              
              />
    </div>
  )
}
