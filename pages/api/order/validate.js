import axios from 'axios';
export default function handler(req, res) {
    console.log("create")
    const secretKeyWoo = process.env.REACT_APP_API_REST_WC_SECRET_KEY;
    try{
        const {publickey, order_id,  paymentintent_id} = req.body
        const data = {
          set_paid: true,
          transaction_id: paymentintent_id,
          payment_method: "card",
          payment_method_title: "Card",
          status: "processing"
        }
        const options = {
          method:'PUT',
          headers: {
            "Access-Control-Allow-Origin": true
          },
          url: process.env.REACT_APP_API_REST_WC+"/orders/"+order_id+"?consumer_key="+publickey+"&consumer_secret="+secretKeyWoo,
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
      .send("[OrderCreation]"+err.message)
    }
  }