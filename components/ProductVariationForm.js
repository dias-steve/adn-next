import React, {useState} from "react";




import { v4 as uuidv4 } from "uuid";
import ButtonAjouterPanier from "./ButtonAjouterPanier";
import FormRadioVariations from "../components/form/FormRadioVariations";
import { useDispatch, useSelector} from 'react-redux';
import {handleSetProductSelected, handleAddToCart, getListTermeAvaibleWitheVariationSelected} from './../utils/product.utils'
import { useCart } from "react-use-cart";
import { handleSetConfigModal } from "../utils/modal.utils";



const mapState = (state) =>({
  product: state.product
})
export default function ProductVariationForm() {
    const dispatch = useDispatch()
    const {product} = useSelector(mapState)
    const {list_variations,variations_selected, raw_product_data} = product
    console.log('[DEV in > ProductVariationForm Component: list_variations]')
    console.log(list_variations)
    const [lastOptionSelectedKey, setLastOptionSelectedKey] = useState(list_variations[0].variation_key)
    
  const setvariationsSelected2 = (variationsSelected) =>{
  
    handleSetProductSelected(variationsSelected,product.raw_product_data,dispatch)
    
  }

  const handleClickGuideDesTailles = () => {
    handleSetConfigModal(
      {
        is_loading: false,
        title: "Guides des tailles",
        message: "",
        is_positif: true,
        no_icon: true, 
        is_guideTaille: true,
        data: raw_product_data.guide_taille
      },
      dispatch
    );
  }
  return (
    <div className={`form-parameter-product `}>
      {list_variations.map((variation) => {
        console.log('[DEV in > ProductVariationForm Component: Variable Form]: '+variation.variation_name)
        let listVariableAvailable = variation.termes.termes_stock_status
        if(lastOptionSelectedKey !== variation.variation_key){
          listVariableAvailable = getListTermeAvaibleWitheVariationSelected(raw_product_data.childrens, variation.variation_key,variations_selected )
        }
    
        console.log(listVariableAvailable)
        
        return(
        <FormRadioVariations
          key={uuidv4()}
          handleOptionChange={(e) => {
            setLastOptionSelectedKey(variation.variation_key)
            setvariationsSelected2({
              ...variations_selected,
              [variation.variation_key]: e.target.value,
            });
          }}
          selectedOption={variations_selected[variation.variation_key]}
          options={variation.termes.termes_names}
          optionsAvailbles={listVariableAvailable}
          name={variation.variation_name}
          variable_key={variation.variation_key}
          setLastOptionSelectedKey={setLastOptionSelectedKey}
        />)
      })}
      { raw_product_data?.guide_taille?.image_tab?.url &&
      <div className="guide-tailles-section"><span onClick= {(e) => {e.preventDefault(); handleClickGuideDesTailles()}}> Guides des tailles</span></div> 
      }
    </div>
  );
}
