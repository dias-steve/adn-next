
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
