import { apiInstance} from "./api.utils"
import validator from 'validator'
const publicKeyWoo = process.env.NEXT_PUBLIC_WC_PUBLIC_KEY;
export function getListShippmentByCountryCode(CountryCode, methodShippementData){

    for (let i = 0; i < methodShippementData.length; i++) {
       for (let j = 0; j < methodShippementData[i].zone_locations.length; j++){
           if (methodShippementData[i].zone_locations[j].code === CountryCode){
               return methodShippementData[i].zone_shipping_methods
           }
       }
    } 
    return null
} 

export function getListCountryShipments(methodShippementData, type){
    let countryCodes = []
    for (let i = 0; i < methodShippementData.length; i++) {
        for (let j = 0; j < methodShippementData[i].zone_locations.length; j++){
            if (methodShippementData[i].zone_locations[j].type === type){
                countryCodes = [...countryCodes, methodShippementData[i].zone_locations[j].code ]
            }
        }
     } 
     return countryCodes
}

export function getMethodShipmentbyTitle(title, CountryCode, methodShippementData){
    const listMethodeAvailable = getListShippmentByCountryCode( CountryCode, methodShippementData)
    console.log('title:'+title)
    let results = null
    if(listMethodeAvailable){
    for (let i = 0; i < listMethodeAvailable.length; i++){
     if(title === listMethodeAvailable[i].method_user_title){
        
      return listMethodeAvailable[i]

     }
    }

    return null
}
}

//Création de commande dans woo commerce
export  function CreateOrderWoo(items, methodShippingObject, shippingAddr){

    const lineItems = items.map(items => ({
        product_id: items.id,
        quantity: items.quantity
    }))

    const shippingLines = [{
        method_id :  methodShippingObject.method_rate_id,
        method_title: methodShippingObject.method_user_title,
        total: methodShippingObject.method_cost
    }]

    const shipping = {
        first_name: shippingAddr.firstname,
        last_name: shippingAddr.lastname,
        address_1: shippingAddr.address,
        address_2: "",
        city: shippingAddr.city,
        state: shippingAddr.departement,
        postcode: shippingAddr.postalcode,
        country: shippingAddr.countrycode,
    }

    const billing = {
        first_name: shippingAddr.firstname,
        last_name: shippingAddr.lastname,
        address_1: shippingAddr.address,
        address_2: "",
        city: shippingAddr.city,
        state: shippingAddr.departement,
        postcode: shippingAddr.postalcode,
        country: shippingAddr.countrycode,
        email: shippingAddr.mail,
        phone: shippingAddr.phone
    }

    const order = {
        billing,
        shipping,
        line_items: lineItems,
        shipping_lines:  shippingLines
    }
    
   return apiInstance.post('/order/create', {
        publickey: publicKeyWoo,
        order 
        }).then((response) =>{ return response.data})


 

}


export  function ValidateOrderWoo(OderId, paymentIntentid){

    
   return apiInstance.post('/order/validate', {
        publickey: publicKeyWoo,
        order_id: OderId,
        paymentintent_id: paymentIntentid
        }).then((response) =>{ return response.data})


 

}

// verification de l'état des stock des produit dans le panier
export async function getItemsStockState (items) {
    const data = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/productstock", {
        // Adding method type
        method: "POST",
    
        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({items}),

      });
    
      const itemsStockState = await data.json();

      return itemsStockState
}

// validator form 

  export const initialStatAdressShippementValidator = {
    firstname: true,
    lastname: true,
    address: true,
    postalcode: true,
    departement: true,
    city: true,
    countrycode: true,
    mail:true,
    phone:true,
    message_error:[],
  };
 
export const initialStateValidation = {
    firstname: true,
    fristname_message:'',
    lastname: true,
    lastname_message:'',
    address: true,
    address_message:'',
    postalcode: true,
    postalcode_message:'',
    departement: true,
    departement_message:'',
    city: true,
    city_message:'',
    countrycode: true,
    countrycode_message:'',
    mail:true,
    mail_message:'',
    phone:true,
    phone_message:'',
    name_card:true,
    name_card_message:'',
    message_error:[]
}
export function validatorShippementForm(shippementFromData){

    let fieldsValidationResult = {...initialStateValidation}
      
    let message_error = []
    console.log('frist name >>')
    console.log(shippementFromData.firstname)
    if(validator.isEmpty(shippementFromData.firstname, { ignore_whitespace:true })){
        fieldsValidationResult.firstname = false
        message_error.push('Veuillez entrer votre prénom')
    }

    if(validator.isEmpty(shippementFromData.lastname, { ignore_whitespace:true })){
        fieldsValidationResult.lastname = false
        message_error.push('Veuillez entrer votre nom')
    }

    if(validator.isEmpty(shippementFromData.address, { ignore_whitespace:true })){
        fieldsValidationResult.address = false
        message_error.push('Veuillez entrer une adresse valide')
    }

    if(validator.isEmpty(shippementFromData.postalcode, { ignore_whitespace:true })){
        fieldsValidationResult.postalcode = false
        message_error.push('Veuillez entrer un code postal')
    }
    if(validator.isEmpty(shippementFromData.departement, { ignore_whitespace:true })){
        fieldsValidationResult.departement = false
        message_error.push('Veuillez entrer un departement valide')
    }
    if(validator.isEmpty(shippementFromData.city, { ignore_whitespace:true })){
        fieldsValidationResult.city = false
        message_error.push('Veuillez entrer une ville')
    }
    if(validator.isEmpty(shippementFromData.name_card, { ignore_whitespace:true })){
        fieldsValidationResult.name_card = false
        message_error.push('Veuillez entrer une adresse nom de carte')
    }

    if(validator.isEmpty(shippementFromData.phone, { ignore_whitespace:true })){
        fieldsValidationResult.phone = false
        message_error.push('Veuillez entrer un numéro de téléphone valide')
    }

    if(!validator.isEmail(shippementFromData.mail)){
        fieldsValidationResult.mail = false
        message_error.push('Veuillez entrer un mail valide')
    }
    fieldsValidationResult.message_error = message_error

    console.log(fieldsValidationResult);

    return fieldsValidationResult;
}