
import axios from 'axios';
export default function handler(req, res) {
    console.log("create")
    const secretKeyWoo = 'cs_f2f01a65d7cd1920c66e9f9d5e2520ed8bf4dd06';
    try{
      const {publickey, order} = req.body
   
      console.log(order)
      const options = {
        method:'POST',
        headers: {
          "Access-Control-Allow-Origin": true
        },
        url: "https://otgbac.ovh/wp-json/wc/v3"+"/orders/?consumer_key="+publickey+"&consumer_secret="+secretKeyWoo,
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