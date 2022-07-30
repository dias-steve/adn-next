import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { useCart } from "react-use-cart";
import {v4 as uuidv4} from 'uuid';

//utils
import {
  getListShippmentByCountryCode,
  handleSetShippingModeSelected,
  handleSetShippementdata,
  handleSetNullShipementModeSelected,
  getTheMethodeShippementCheeperIndex 
} from "../../utils/checkout.utils";

import { CountryDropdown} from 'react-country-region-selector';

//components
import FormInput from "../form/FormInput";

const mapState  = state => ({
  order: state.order,
});



/**
 * Component that displays a list of shippement mode available
 * @returns Shippement Mode Avaible for a country
 */
const ShippingModeAvailbles = () => {
  const {order} = useSelector(mapState);
  const dispatch = useDispatch()
  const {items} = useCart();
  /**
   * Création of list shipping
   */
  

  const listModeShippementAvailable = getListShippmentByCountryCode(
    order.shippement_data.countrycode,
    order.list_shippement_available
  )


  //changement de mode livraison au chamgement de pays
  useEffect(()=>{
    if(listModeShippementAvailable && listModeShippementAvailable[0]){ 
        
        handleSetShippingModeSelected(
          listModeShippementAvailable[getTheMethodeShippementCheeperIndex(listModeShippementAvailable)].method_user_title,
          order.shippement_data.countrycode,
          order.list_shippement_available,
          items,
          dispatch
          
          ) 
      }else{
        handleSetNullShipementModeSelected(dispatch)
        
      }
    
  },[ order.shippement_data.countrycode, items,order.list_shippement_available])
 

  


  return (
    <div className="shippementmodeavailbles-container">
       <h2 className="checkout-sub-title">Mode de livraison</h2>
      {listModeShippementAvailable && listModeShippementAvailable[0]  ?
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
                      items,
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
    </div> :  <div className="shippementmode wrapper-fields"> <p style={{color: 'red'}}>Aucun mode de livraison n&#39;est disponible pour votre pays.<br/> Nous ne pouvons pas honnorer cette commande.</p> </div>
      }
    </div>
  )
}


export default function  ShippingForm({listCountryShippment}) {
  const {order} = useSelector(mapState);
  const dispatch = useDispatch()

  /**
   * Send to store 
   * @param 
   */
  const handleSelectCountry = (country) => {
    handleSetShippementdata({ ...order.shippement_data, countrycode: country }, dispatch);
  };

/**
 * Initialize shipping
 */
  useEffect(() => {
    handleSelectCountry("FR")
  },[])

  
  return (
    <div className="shippingform-component-styles">
        <div className="shipping-form-wrapper form-wrapper">
              <h2 className="checkout-sub-title">Livraison</h2>
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
                  whitelist={listCountryShippment}
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
