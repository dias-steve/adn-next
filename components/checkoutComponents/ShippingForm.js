import React, {useEffect, useState} from 'react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import FormInput from "../form/FormInput";
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';


import {
  getListShippmentByCountryCode,
  getListCountryShipments,
} from "../../utils/checkout.utils";
import { useCart } from "react-use-cart";



const ShippingModeAvailbles = ({ listShipmentMethods,adrShippement, shippingModeSelected, setShippingModeSelected}) => {
  const listModeShippementAvailable = getListShippmentByCountryCode(
    adrShippement.countrycode,
    listShipmentMethods
  )

  //changement de mode livraison au chamgement de
  useEffect(()=>{
    let modeLivraisonAvailableNotFound = true
    let i = 0

    if(listModeShippementAvailable && listModeShippementAvailable[0]){ 
        setShippingModeSelected(listModeShippementAvailable[0].method_user_title)
       
      }
    
  },[ adrShippement.countrycode])
 


  return (
    <div className="shippementmodeavailbles-container">
       <h2 className="checkout-sub-title">2. Mode de livraison</h2>
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
export default function ShippingForm({ adrShippement, setAdrShippement, listShipmentMethods,  shippingModeSelected, setShippingModeSelected, adressShippementValidator, formIsValide} ) {

  const handleSelectCountry = (country) => {
    setAdrShippement({ ...adrShippement, countrycode: country });
    console.log(adrShippement.countrycode);
 
  };

  useEffect(() => {
      handleSelectCountry("FR")
 
    

  },[])

  useEffect(() => {
  


    console.log(adrShippement)

 
  }, [adrShippement]);
  
  return (
    <div className="shippingform-component-styles">
        <div className="shipping-form-wrapper form-wrapper">
              <h2 className="checkout-sub-title">1. Livraison</h2>
              <div className="wrapper-fields">
              <div className="names-wrapper">
                <FormInput isValid = {adressShippementValidator.lastname} messageError={adressShippementValidator.lastname_message} type="text" className="" label="Nom" handleChange={(e) => {
                    setAdrShippement({...adrShippement, lastname:e.target.value }
                      
                      )
                }} />
                <FormInput isValid = {adressShippementValidator.firstname}  messageError={adressShippementValidator.lastname_firstname} label="Prénom" type="text"  handleChange={(e) => {
                    setAdrShippement({...adrShippement, firstname: e.target.value })

                }}/>
              </div>

              <FormInput isValid = {adressShippementValidator.address} messageError={adressShippementValidator.lastname_address} type="text" label="Adresse"  handleChange={(e) => {
                    setAdrShippement({...adrShippement, address:e.target.value })
                }} />
              <div className="names-wrapper">
                <FormInput isValid = {adressShippementValidator.postalcode} messageError={adressShippementValidator.lastname_postalcode} label="Code Postal" type="text"  handleChange={(e) => {
                    setAdrShippement({...adrShippement, postalcode:e.target.value })
                }}/>
                <FormInput isValid = {adressShippementValidator.departement} messageError={adressShippementValidator.lastname_departement} label="Département" type="text"  handleChange={(e) => {
                    setAdrShippement({...adrShippement, departement:e.target.value })}} />
              </div>
              <FormInput isValid = {adressShippementValidator.city}  messageError={adressShippementValidator.lastname_city} label="Ville" type="text" handleChange={(e) => {
                    setAdrShippement({...adrShippement,city: e.target.value })
                      } }/>
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
              <FormInput isValid = {adressShippementValidator.phone} messageError={adressShippementValidator.lastname_phone}label="Numéro de téléphone" type="text" handleChange={(e) => {
                    setAdrShippement({...adrShippement,phone: e.target.value })
                      } } />

              <FormInput isValid = {adressShippementValidator.mail} messageError={adressShippementValidator.mail} type="email" label="e-mail" handleChange={(e) => {
                    setAdrShippement({...adrShippement, mail: e.target.value })
                      } }/>
              
              <FormInput isValid = {true}  messageError={''} label="Instructions de livraison (facultatif)" type="text" handleChange={(e) => {
                    setAdrShippement({...adrShippement,instructions: e.target.value })
                      } }/>
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
