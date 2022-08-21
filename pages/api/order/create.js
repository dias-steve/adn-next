
import axios from 'axios';


const secretKeymessage = process.env.CONTACT_MESSAGE_SECRETKEY;
const publickeymessage = process.env.NEXT_PUBLIC_KEY_CONTACT_MESSAGE;

const sendErrorToAdmin = (message) => {
  try{

  

    const options = {
      method:'POST',
      headers: {
        "Access-Control-Allow-Origin": true
      },
      url: process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA+"/contactmessage",
      data: {
          message: message,
          public_key: publickeymessage,
          secret_key: secretKeymessage,
      }
    }
    axios.request(options).then((response)=>{

      res.json(response.data)
      return 1
    }).catch((error) => {
      console.error(error)
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
export default function handler(req, res) {
    console.log("create")
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
        sendErrorToAdmin('nouvell validation de commande');
        res.json(response.data)
        return 1
      }).catch((error) => {
        console.error(error)
        sendErrorToAdmin('erreur validation de commande');
        res
      
        .status(500)
        .json({error: error})
        throw(error)
      })
    }catch(err){
      sendErrorToAdmin('erreur validation de commande 2' );
      res
      .status(500)
      .json({error: err})
    }
  }

