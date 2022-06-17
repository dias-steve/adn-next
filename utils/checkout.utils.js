import { apiInstance} from "./api.utils"

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
 
export function validatorShippementForm(shippementFromData){

    let fieldsValidationResult = {
        firstname: true,
        lastname: true,
        address: true,
        postalcode: true,
        departement: true,
        city: true,
        countrycode: true,
        mail:true,
        phone:true,
        message_error:[]
      };
      
    let message_error = []
    console.log('frist name >>')
    console.log(shippementFromData.firstname)
    if(shippementFromData.firstname ===''){
        fieldsValidationResult.firstname = false
        message_error.push('Veuillez entrer votre prénom')
    }

    if(shippementFromData.lastname ===''){
        fieldsValidationResult.lastname = false
        message_error.push('Veuillez entrer votre nom')
    }

    if(shippementFromData.address ===''){
        fieldsValidationResult.address = false
        message_error.push('Veuillez entrer une adresse valide')
    }

    fieldsValidationResult.message_error = message_error
    fieldsValidationResult.message_error = message_error
    console.log(fieldsValidationResult);

    return fieldsValidationResult;
}