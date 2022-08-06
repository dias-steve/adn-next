
import axios from 'axios';
export default function handler(req, res) {
   
    const secretKey = process.env.CONTACT_MESSAGE_SECRETKEY;
    const publicey = process.env.NEXT_PUBLIC_KET_CONTACT_MESSAGE;


        try{
            const {publickey, message} = req.body
          
        
            const options = {
              method:'POST',
              headers: {
                "Access-Control-Allow-Origin": true
              },
              url: process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA+"/contactmessage",
              data: {
                  message: message,
                  public_key: publickey,
                  secret_key: secretKey,
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
    
    

  