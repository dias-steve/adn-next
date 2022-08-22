
const publiKey = process.env.NEXT_PUBLIC_KEY_CONTACT_MESSAGE;
export const sendMessageFlag = (message) => {
    fetch("/api/contactmessage", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publickey: publiKey,
          message: '[message automatique]'+message ,
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
}