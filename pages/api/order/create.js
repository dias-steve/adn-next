
import axios from 'axios';



const secretKeymessage = process.env.CONTACT_MESSAGE_SECRETKEY;
const publickeymessage = process.env.NEXT_PUBLIC_KEY_CONTACT_MESSAGE;

const sendErrorToAdmin = (message) => {
  console.log('envoie Erreur :'+message)
  const date = new Date().toLocaleString()
   const options = {
      method:'POST',
      headers: {
        "Access-Control-Allow-Origin": true
      },
      url: process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA+"/contactmessage",
      data: {
          message: '[message automatique][Server API]['+date+']'+message,
          public_key: publickeymessage,
          secret_key: secretKeymessage,
      }
    }
    axios.request(options)


}
export default function handler(req, res) {
  
    const secretKeyWoo = process.env.REACT_APP_API_REST_WC_SECRET_KEY;
    try{
      const {publickey, order} = req.body
   
      console.log(order)
      const options = {
        method:'POST',
        headers: {
          "Access-Control-Allow-Origin": true
        },
        url: process.env.REACT_APP_API_REST_WC+"/orders/?consumer_key="+publickey+"&consumer_secret="+secretKeyWoo,
        data: order
      }
      axios.request(options).then((response)=>{
        res.json(response.data)
        return 1
      }).catch((error) => {
        sendErrorToAdmin('[Critical Error WooCommerce API][Error: erreur de validation de commande (fonction: API: create.js)]          [Commande non enregistrée: Order'+
        JSON.stringify(order) 
        +']            [message Erreur:'+error.message+']');

        res
      
        .status(500)
        .json({error: error})
        throw(error)
      })
    }catch(err){
      
      res
      .status(500)
      .json({error: err})
    }
  }

