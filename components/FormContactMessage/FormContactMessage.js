
import React, {useState} from 'react'
import styles from "./FormContactMessage.module.scss";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import validator from "validator";
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import Spinner from '../spin/spinner';
import { formatContactMessage } from '../../utils/contactMessage.utils';
import InputContact from './InputContact/InputContact';
const publiKey = process.env.NEXT_PUBLIC_KEY_CONTACT_MESSAGE;


export default function FormContactMessage() {
  const [info, setInfo] = useState(null);

  const [email, setEmail] = useState("");

  const [emailFocus, setEmailFocus] = useState(false);

  const [name, setName] = useState("");

  const [nameFocus, setNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");

  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [message, setMessage] = useState("");

  const [messageFocus, setMessageFocus] = useState(false);

  const [isloading, setIsLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSumitformwithCaptcha = 
  (e) => {

    e.preventDefault();
    setInfo(null);
    setIsLoading(true);
    if(
      !validator.isEmpty(name, {
      ignore_whitespace: true,
    })&&
    !validator.isEmpty(lastName, {
      ignore_whitespace: true,
    })&&
    !validator.isEmpty(email, {
      ignore_whitespace: true,
    })&&
    !validator.isEmpty(message, {
      ignore_whitespace: true,
    })
    
    ){

    
    if (!validator.isEmail(email)) {
      setInfo({
        positif: false,
        message:"Veuillez entrer un mail valide svp"
      });
      setIsLoading(false)
      return null;
    } else {
    
      setInfo(null);
      if (!executeRecaptcha) {
        setInfo({
          positif: false,
          message:"ReCaptcha non valide, veuillez réssayer "
        });
        setIsLoading(false)
        return;
      }
     
      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, "response Google reCaptcha server");
        submitEnquiryForm(gReCaptchaToken);
      });
    }

    }else{
      setInfo({
        positif: false,
        message:"Veuillez bien remplir tous les champs svp"
      });
      setIsLoading(false)
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
  
              setInfo({
                positif: true,
                message:"Votre message est à bien été reçu  "
              });
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
            })



          
          setEmail("");
          setName("");
          setMessage("");
          setLastName("");
    
       
        } else {
         
          setInfo({
            positif: false,
            message:"ReCaptcha non valide, veuillez réssayer "
          });
          setIsLoading(false)
         
        }
      });
  
  };

  return (
    <div className={styles.containerGlobal}>

     
     <form className={[styles.formContainer, 'formContact'].join(" ")}>

 
      <h2 className={styles.subTitle}>Posez votre question</h2>

        <InputContact 
        name= {'Prénom'} 
        onChange = {(e) => {setName(e)}} value={name}
        type = 'text'
        />
        <InputContact 
          name= {'Nom'} 
          onChange = {(e) => {setLastName(e)}}
          value={lastName}
          type ='text'
          />
        
        <InputContact 
          name= {'Email'} 
          onChange = {(e) => {setEmail(e)}}
          value={email}
          type ='email'
          />

        <div className={styles.messageContainer}>
        <InputContact 
                  name= {'Message'} 
                  onChange = {(e) => {setMessage(e)}}
                  value={message}
                  type ='text'
                  textarea={true}
          />
          </div>
     
       
        <div className={[styles.btnWrapper].join(" ")}>
        {(isloading) ? 
          <div className={[styles.spinnerWrapper].join(" ")}>
          <Spinner blackCircle={false}/>
          </div>
          : <ButtonPrimary 
            label={'Envoyer votre message'}
       
            handleClick= {(e) => {handleSumitformwithCaptcha(e)}}
  
            />}
        </div>
     </form>
     <div className={[styles.infoToast, info ? styles.visible : styles.notVisible, info?.positif ? styles.positif : styles.notPositif].join(" ")}>
        <p>{info?.message}</p>
      </div>
    </div>
  )
}
