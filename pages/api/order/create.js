
import axios from 'axios';
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

        res.json(response.data)
        return 1
      }).catch((error) => {
        console.error(error)
        throw(error)
      })
    }catch(err){
      res
      .status(500)
      .send("[OrderCreation]"+err.message)
    }
  }