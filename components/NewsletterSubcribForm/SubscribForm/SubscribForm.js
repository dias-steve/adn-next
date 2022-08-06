import React, { useCallback, useState } from "react";
import { decode } from "html-entities";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Spinner from '../../spin/spinner'
import validator from "validator";

import styles from "./SubscribForm.module.scss";
import ButtonPrimary from "../../ButtonPrimary/ButtonPrimary";
export default function SubscribForm({ status, message, onValidated }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
        email: email,
        gRecaptchaToken: gReCaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "response from backend");
        if (res?.status === "success") {
          console.log("Captchga good");
          const isFormValidated = onValidated({ EMAIL: email, FNAME: name });
          setEmail("");
          setName("");
          setIsLoading(false)
       
        } else {
          console.log("Captchga not good");
          setError(" Désolé, le Captcha et non valide, Veuillez rééssayer");
          setIsLoading(false)
         
        }
      });
  };
 





  return (
    <>
      <form className={styles.globalContainer}>
      <div className={styles.messageZone}>
        
        {status === "error" || error ? (
          <p
           
            dangerouslySetInnerHTML={{ __html: error || message }}
          />
        ) : null}
        {status === "success" && status !== "error" && !error && (
          <p> Votre e-mail à bien été enregistré </p>
          
        )}
      </div>
        <div className={[styles.inputGroup].join(" ")}>
          <label>Prénom</label>
          <input
            type="text"
            placeholder="Votre prénom"
            name="FNAME"
            id="mce-FNAME"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={[styles.inputGroup].join(" ")}>
        <label>E-mail</label>
        <input
          onChange={(event) => setEmail(event.target.value )}
          type="email"
          placeholder="Votre email"
          className="mr-2"
          value={email}
          

        />
    
        </div>
    

        <div className={[styles.btnWrapper].join(" ")}>
        {(status === "sending" || isloading) ? 
          <div className={[styles.spinnerWrapper].join(" ")}>
          <Spinner blackCircle={true}/>
          </div>
          : <ButtonPrimary 
            label={'Envoyer votre e-mail'}
       
            handleClick= {(e) => {handleSumitformwithCaptcha(e)}}
            isSubmit = {true}
            />}
        </div>

 
      </form>
    </>
  );
}
