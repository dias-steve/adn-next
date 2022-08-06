
import React, {useState} from 'react'
import styles from "./FormContactMessage.module.scss";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import validator from "validator";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import Spinner from '../spin/spinner';
import { formatContactMessage } from '../../utils/contactMessage.utils';
const publiKey = process.env.NEXT_PUBLIC_KEY_CONTACT_MESSAGE;
export default function FormContactMessage() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();



  const handleSumitformwithCaptcha = 

  (e) => {

    e.preventDefault();
    setError(null);

    if (!validator.isEmail(email)) {
      setError("Entrez un e-mail et prénom valide svp");
      setIsLoading(false)
      return null;
    } else {
    
      setError(null);
      if (!executeRecaptcha) {
        setError(" Désolé, le Captcha et non valide, Veuillez rééssayer");
        setIsLoading(false)
        return;
      }
      setIsLoading(true)
      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, "response Google reCaptcha server");
        submitEnquiryForm(gReCaptchaToken);
      });
    }
  };

  const submitEnquiryForm = (gReCaptchaToken) => {
    fetch("/api/enquiry", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        last_name: lastName,
        email: email,
        gRecaptchaToken: gReCaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "response from backend");
        if (res?.status === "success") {
          console.log("Captchga good");
          const messageFormatted =  formatContactMessage(message, email, name,  lastName)
          fetch("/api/contactmessage", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              publickey: publiKey,
              message: messageFormatted ,
            }),
          }).then((res) => res.json())
            .then((res)=>{
              console.log(res)
            })




          setEmail("");
          setName("");
          setMessage("");
          setLastName("");
          setIsLoading(false)
       
        } else {
          console.log("Captchga not good");
          setError(" Désolé, le Captcha et non valide, Veuillez rééssayer");
          setIsLoading(false)
         
        }
      });
  };

  return (
    <div>
     <form>
     <div className={[styles.inputGroup].join(" ")}>
          <label>Prénom</label>
          <input
            type="text"
            placeholder="Votre prénom"
            name="name"
 
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className={[styles.inputGroup].join(" ")}>
          <label>Nom</label>
          <input
            type="text"
            placeholder="Votre Nom"
            name="name"
 
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
     <div className={[styles.inputGroup].join(" ")}>
        <label>E-mail</label>
        <input
          onChange={(event) => setEmail(event.target.value )}
          type="email"
          placeholder="Votre email"
      
          value={email}
          

        />
    
        </div>

        <div className={[styles.inputGroup, styles.messageInput].join(" ")}>
          <label>Message</label>
          <textarea rows="4" cols="50"
        
            placeholder="Votre message"
            name="votre message"
          
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <div className={[styles.btnWrapper].join(" ")}>
        {(isloading) ? 
          <div className={[styles.spinnerWrapper].join(" ")}>
          <Spinner blackCircle={true}/>
          </div>
          : <ButtonPrimary 
            label={'Envoyer votre message'}
       
            handleClick= {(e) => {handleSumitformwithCaptcha(e)}}
  
            />}
        </div>
     </form>
    </div>
  )
}
