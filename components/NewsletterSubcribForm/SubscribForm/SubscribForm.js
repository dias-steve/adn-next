import React, { useCallback, useState } from "react";
import { decode } from "html-entities";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
export default function SubscribForm({ status, message, onValidated }) {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSumitformwithCaptcha = useCallback(
    (e) => {
      e.preventDefault();
      setError(null);

      if (!email || email == "") {
        setError("Please enter a valid email address");
        return null;
      } else {
        setError(null);
        if (!executeRecaptcha) {
          console.log("Execute recaptcha not yet available");
          return;
        }

        executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
          console.log(gReCaptchaToken, "response Google reCaptcha server");
          submitEnquiryForm(gReCaptchaToken);
        });
      }
    },
    [executeRecaptcha]
  );

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
          return email && email.indexOf("@") > -1 && isFormValidated;
        } else {
          console.log("Captchga not good");
          //pb
        }
      });
  };
  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
    setError(null);

    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email, FNAME: name });

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleSumitformwithCaptcha();
    }
  };

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  };

  return (
    <>

        <div>
          <label>First Name </label>
          <input
            type="text"
            value={name}
            name="FNAME"
            id="mce-FNAME"
            onChange={(event) => setName(event?.target?.value ?? "")}
          />
        </div>
        <label>EmailMail </label>
        <input
          onChange={(event) => setEmail(event?.target?.value ?? "")}
          type="email"
          placeholder="Your email"
          className="mr-2"
          onKeyUp={(event) => handleInputKeyEvent(event)}
        />
    
 
        <button
          className="wp-block-button__link"
          onClick={handleSumitformwithCaptcha}
        >
          Envoyer
        </button>


      <div>
        {status === "sending" && <div>Sending...</div>}
        {status === "error" || error ? (
          <div
           
            dangerouslySetInnerHTML={{ __html: error || message }}
          />
        ) : null}
        {status === "success" && status !== "error" && !error && (
          <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
        )}
      </div>
    </>
  );
}
