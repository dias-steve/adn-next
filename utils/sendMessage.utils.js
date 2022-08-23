
const publiKey = process.env.NEXT_PUBLIC_KEY_CONTACT_MESSAGE;

export const sendMessageFlag = (message) => {
  const date = new Date().toLocaleString()
  fetch("/api/contactmessage", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, ",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publickey: publiKey,
          message: '[message automatique]['+date+']'+message ,
        }),
      }) 


 
}