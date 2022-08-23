import axios from 'axios';
export default function handler(req, res) {
  
    const secretKeyWoo = process.env.REACT_APP_API_REST_WC_SECRET_KEY;
    try{
        const {publickey, order_id, note} = req.body
        const data = {
          note: note
        }
        const options = {
          method:'POST',
          headers: {
            "Access-Control-Allow-Origin": true
          },
          url: process.env.REACT_APP_API_REST_WC+"/orders/"+order_id+"/notes/?consumer_key="+publickey+"&consumer_secret="+secretKeyWoo,
          data,
    
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
      .send("[Note Order]"+err.message)
    }
  }