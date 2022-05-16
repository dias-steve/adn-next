import React, {useState} from 'react'



const GetAllAvailableVariation = ({childrens, variationName}) => {

  const variationAvailable = Array();
  childrens.filter(child => filterinstockChildren(child)).map(child => {
    const key = Object.keys(child.variation_name)
    console.log(key)
    const name = child.variation_name[variationName]
    if (variationAvailable.indexOf(name) === -1) {
      variationAvailable.push(name)
    }
    })

    
  return(
    <div className= 'listVariation'>
      {variationAvailable.map(name => {
        
        return <p>{name}</p>
        })}
    </div>
    )
}

const getproductObjectbyVariation = (variations, childrensProduct) =>{
    
      let good = childrensProduct
      for(let i = 0; i < variations.length; i++){
        
        good = good.filter(child => (filterVariation(child,variations[i].variationName, variations[i].variationValue)))
      }
   

      return good;
}
const filterVariation = (child, variationName, variationValue) => {
  if(child.variation_name[variationName] === variationValue){
    
    return true;
  }
  return false;
}
const filterinstockChildren = (child) => {
  if (child.stock_status =='instock'){
    return true;
  }
}

export default function ProductForm({data}) {
    const {id, title, price, childrens} = data
    const [priceProduct, setPrice] = useState(price);
    const {idProduct, setIdProduct} = useState(id);
    let inStock = true;
    const variations = [{variationName: 'attribute_pa_size',variationValue:'small' }, {variationName: 'attribute_couleur',variationValue:'Red' }]
    const good = getproductObjectbyVariation(variations, childrens);
    console.log('[googd]');
    console.log(good);
  return (

    <div className="productform-container">
      <h1 className="product-title">{title}</h1>
      <span className="product-price">{priceProduct}</span>
      <GetAllAvailableVariation childrens={childrens} variationName={"attribute_pa_size"} />
    </div>
  )
}
