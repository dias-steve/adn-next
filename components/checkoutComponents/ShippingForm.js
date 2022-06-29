import React, {useEffect, useState} from 'react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import FormInput from "../form/FormInput";
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';

import { useDispatch, useSelector} from 'react-redux';
import {
  getListShippmentByCountryCode,
  getListCountryShipments,
} from "../../utils/checkout.utils";

import { handleSetShippingModeSelected, handleSetShippementdata } from '../../utils/checkout.utils';
const mapState  = state => ({
  order: state.order,
});

const ShippingModeAvailbles = () => {
  const {order} = useSelector(mapState);
  console.log(order)
  const dispatch = useDispatch()

  const listModeShippementAvailable = getListShippmentByCountryCode(
    order.shippement_data.countrycode,
    order.list_shippement_available
  )

  
  //changement de mode livraison au chamgement de pays
  useEffect(()=>{
    if(listModeShippementAvailable && listModeShippementAvailable[0]){ 
        
        handleSetShippingModeSelected(
          listModeShippementAvailable[0].method_user_title,
          order.shippement_data.countrycode,
          order.list_shippement_available,
          dispatch
          
          ) 
      }
    
  },[ order.shippement_data.countrycode])
 


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
                  checked={order.shippement_mode_selected.method_user_title === mode.method_user_title }
                  onChange={(e) => {
                    
                    handleSetShippingModeSelected(
                      e.target.value,
                      order.shippement_data.countrycode,
                      order.list_shippement_available,
                      dispatch
                      
                      ) 
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
export default function ShippingForm() {
  const {order} = useSelector(mapState);
  const dispatch = useDispatch()
  const handleSelectCountry = (country) => {
    handleSetShippementdata({ ...order.shippement_data, countrycode: country }, dispatch);
  };
 
  

  useEffect(() => {
      handleSelectCountry("FR")
 
  },[])


  
  return (
    <div className="shippingform-component-styles">
        <div className="shipping-form-wrapper form-wrapper">
              <h2 className="checkout-sub-title">1. Livraison</h2>
              <div className="wrapper-fields">
              <div className="names-wrapper">
                <FormInput isValid = {order.shippement_data_validation_state.lastname} messageError={order.shippement_data_validation_state.lastname_message} type="text" className="" label="Nom" handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data, lastname:e.target.value }, dispatch)
                }} />
                <FormInput isValid = {order.shippement_data_validation_state.firstname}  messageError={order.shippement_data_validation_state.lastname_firstname} label="Prénom" type="text"  handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data, firstname: e.target.value }, dispatch)

                }}/>
              </div>

              <FormInput isValid = {order.shippement_data_validation_state.address} messageError={order.shippement_data_validation_state.lastname_address} type="text" label="Adresse"  handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data, address:e.target.value }, dispatch)
                }} />
              <div className="names-wrapper">
                <FormInput isValid = {order.shippement_data_validation_state.postalcode} messageError={order.shippement_data_validation_state.lastname_postalcode} label="Code Postal" type="text"  handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data, postalcode:e.target.value }, dispatch)
                }}/>
                <FormInput isValid = {order.shippement_data_validation_state.departement} messageError={order.shippement_data_validation_state.lastname_departement} label="Département" type="text"  handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data, departement:e.target.value }, dispatch)}} />
              </div>
              <FormInput isValid = {order.shippement_data_validation_state.city}  messageError={order.shippement_data_validation_state.lastname_city} label="Ville" type="text" handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data,city: e.target.value }, dispatch)
                      } }/>
              <div className="countryDropddown-wrapper">
                <label>Pays</label>
                <CountryDropdown
                  whitelist={getListCountryShipments(
                    order.list_shippement_available,
                    "country"
                  )}
                  value={order.shippement_data.countrycode}
                  valueType="short"
                  onChange={(val) => handleSelectCountry(val)}
                  defaultOptionLabel={"Selectionner un pays"}
                  showDefaultOption={false}
                  priorityOptions={["FR"]}
                />
              </div>
              <FormInput isValid = {order.shippement_data_validation_state.phone} messageError={order.shippement_data_validation_state.lastname_phone}label="Numéro de téléphone" type="text" handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data,phone: e.target.value }, dispatch)
                      } } />

              <FormInput isValid = {order.shippement_data_validation_state.mail} messageError={order.shippement_data_validation_state.mail} type="email" label="e-mail" handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data, mail: e.target.value }, dispatch)
                      } }/>
              
              <FormInput isValid = {true}  messageError={''} label="Instructions de livraison (facultatif)" type="text" handleChange={(e) => {
                    handleSetShippementdata({...order.shippement_data,instructions: e.target.value }, dispatch)
                      } }/>
              </div>
            </div>

            <ShippingModeAvailbles />
    </div>
  )
}
