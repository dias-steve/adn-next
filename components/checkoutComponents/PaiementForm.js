import React, { useEffect, useState } from "react";
import {
  Card,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import FormButton from "../form/FormButton";
import { useCart } from "react-use-cart";
import {
  CreateOrderWoo,
  ValidateOrderWoo,
  getItemsStockState,
} from "./../../utils/checkout.utils";
import { apiInstance } from "./../../utils/api.utils";
import Spinner from "../../components/spin/spinner";
import FormInput from "../form/FormInput";
import ModalPopUp from "../modalPopUp/modalPopUp";
import { is } from "@react-spring/shared";
export const RadioSelect = ({ sameFacturation, setSameFacturation }) => {
  const handleCheckboxFacturation = () => {
    setSameFacturation(!sameFacturation);
  };
  return (
    <div className="checkbox-facturation">
      <label>
        <input
          type="checkbox"
          id="sameFacturation"
          checked={sameFacturation}
          onChange={() => {
            handleCheckboxFacturation();
          }}
        />
        <div className="radio-label">
          <div className="cercle-out">
            <div className="cercle-in" />
          </div>
          <span>Meme adresse de facturation</span>
        </div>
      </label>
    </div>
  );
};

export const facturationForm = () => {};
export default function PaiementForm({
  sameFacturation,
  setSameFacturation,
  adrPaiement,
  setAdrPaiement,
  methodeSelectedObject,
  adrShippement,
  formIsValide,
  nameOncardIsValid,
  setAdrShippement,
  totalPrice,
  cgvIsValid
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { items } = useCart();

  const [showModal, setShowModal] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    title:'',
    message: '',
    is_positif: false,
    is_loading: true,
  });


  useEffect(() => {
    console.log(items);
  }, []);
  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  const handlePayment = async () => {
    setShowModal(true);
    setModalConfig({
      is_loading: true,
      title: '10% Paiement en cours...',
      message: 'Veuillez ne pas quitter la page',
    })
    const cardElement = elements.getElement("card");
    const order = await CreateOrderWoo(
      items,
      methodeSelectedObject,
      adrShippement
    );

    if (order) {
      console.log("order");
      console.log(order.id);
      // si (order)
      setModalConfig({
        is_loading: true,
        title: '30% Paiement en cours...',
        message: 'Veuillez ne pas quitter la page',
      })
      apiInstance
        .post('/paymentadn', {
          amount: order.total * 100,
          idorder: order.id, // centime
          shipping: {
            name: adrShippement.lastname,
            phone: adrShippement.phone,
            address: {
              line1: adrShippement.address,
              line2: "",
              city: adrShippement.city,
              state: adrShippement.departement,
              postal_code: adrShippement.postalcode,
              country: adrShippement.countrycode,
            },
          },
        })
        .then(({ data: clientSecret, error }) => {
          //après validation du back sa retourne la clès secret
          setModalConfig({
            is_loading: true,
            title: '60% Paiement en cours...',
            message: 'Veuillez ne pas quitter la page',
          })
          stripe
            .createPaymentMethod({
              type: "card",
              card: cardElement,
              billing_details: {
                name: adrShippement.name_card,
                phone: adrShippement.phone,
                email: adrShippement.email,
                address: {
                  line1: adrShippement.address,
                  line2: "",
                  city: adrShippement.city,
                  state: adrShippement.departement,
                  postal_code: adrShippement.postalcode,
                  country: adrShippement.countrycode,
                },
              },
            })
            .then(({ paymentMethod, error }) => {
              // on passe au paiement pure
              setModalConfig({
                is_loading: true,
                title: '90% Paiement en cours...',
                message: 'Veuillez ne pas quitter la page',
              })
              if (paymentMethod) {
                stripe
                  .confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                  })
                  .then(({ paymentIntent, error }) => {
                    if (paymentIntent) {
                    console.log(paymentIntent);
                    ValidateOrderWoo(order.id, paymentIntent.id);
                    setShowModal(true)
                    setModalConfig({
                      is_loading: false,
                      title: 'Merci pour votre commande !',
                      message: 'Votre commande n°' +order.id + ' est en cours de traitement',
                      is_positif: true
                    })
                    //clear cart
                    //numéro de commande =validerOrderpaiment(order, paymentIntent)
                    //afficher paiement validé numéro de commande retourner à l'accueil
                    //ne plus afficher la roue
                    }
                    if (error) {
      
                    console.log(error);
                    setShowModal(true)
                    setModalConfig({
                      is_loading: false,
                      title:'Paiement refusé',
                      message: '',
                      is_positif: false
                    })
                    //ne plus afficher la roue
                    //indication modification paiement refusé
                    }
                  })
                  .catch(()=>{
                    setShowModal(true)
                    setModalConfig({
                      is_loading: false,
                      title:'Paiement a échoué',
                      message: 'Veuillez rééssayer ulterieurement',
                      is_positif: false
                  })});

              } else {
                //modale
                // numéro de carte invalide
                setShowModal(true)
                setModalConfig({
                  is_loading: false,
                  title:'Le paiement a échoué',
                  message: 'Veuillez rééssayer ulterieurement',
                  is_positif: false
                
                })
              }

              if (error) {
                console.log("PB create Payment Methode");
                console.log(error);
                setShowModal(true)
                setModalConfig({
                  is_loading: false,
                  title:'Votre mode de paiment est invalide',
                  message: 'Veuillez entrer un numéro de carte valide',
                  is_positif: false
                })
              }
            });

            if(error){
              setShowModal(true)
              setModalConfig({
                is_loading: false,
                title:'Paiement à échoué',
                message: 'Veuillez rééssayer ulterieurement',
                is_positif: false
              })
            }
        })
        .catch((err)=>{
          setShowModal(true)
          setModalConfig({
            is_loading: false,
            title:'Paiement a échoué',
            message: 'Veuillez rééssayer ulterieurement',
            is_positif: false
        })
      // problème critique envoyer alert 
      });
    }
  };
  const handleSubmit = async () => {
    
    setModalConfig({is_loading: true})
    setShowModal(true)

  
    const message_error = formIsValide();
    //Verification tous les produits du panier sont bien disponible
    
 


    if (message_error.length === 0) {
      setModalConfig({
        is_loading: true,
        title: "5% Verification des stocks...",
        message: 'Veuillez ne pas quitter la page',
      })
      console.log(items)
      const stock = await getItemsStockState(items);
      setModalConfig({
        is_loading: true,
        title: '10% Verification des stocks...',
        message: 'Veuillez ne pas quitter la page',
      })
      console.log(stock)
      if (stock.all_in_stock) {
        console.log("[Paiement lancé]");
        console.log(message_error);
        handlePayment();
      } else {
         //modale FERMANTE
        // pousser à la page panier message error
       

        setShowModal(true);
        setModalConfig({
          is_loading: false,
          title: 'Certains produits de votre panier ne sont plus en stock',
          message: "Aucun paiement n'a été réalisé. Merci de revalider votre panier",
          is_positif: false,
        })
      }
    } else {
      //modale FERMANtE
      setShowModal(true)
      setModalConfig({
        is_loading: false,
        title:'Le formulaire est invalide',
        message: 'Veuillez bien remplir tous les champs et accepter les conditions générales de vente',
        is_positif: false
      })
     
    }
  };
  return (
    <div className="paiementform-component form-wrapper">
      <h2 className="checkout-sub-title">3. Paiement</h2>
      <div className="wrapper-fields">
        <FormInput
          isValid={nameOncardIsValid}
          label="Nom sur la carte"
          type="text"
          handleChange={(e) => {
            setAdrShippement({ ...adrShippement, name_card: e.target.value });
          }}
        />
        <div className="card-wrapper">
          <CardElement options={configCardElement} />
        </div>
      </div>
      <div className="cgv-zone">
      <label className={!cgvIsValid ?'cgv-error': 'cgv'}>
        <input
          type="checkbox"
          checked={adrShippement.cgv}
          onChange={() => setAdrShippement({ ...adrShippement, cgv: !adrShippement.cgv })}
        />
         <span>J'accepte les conditions générales de vente</span>
      </label>
      </div> 
      
        
        <ModalPopUp 
          setShowModal = {setShowModal}
          showModal= {showModal}
          modalConfig= {modalConfig}
          />

      

      <div className="pay-zone">
        { !showModal &&
          <>
            <p> Total à payer: {totalPrice}€</p>
            <FormButton
              name={"Payer Maintenant"}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            />
          </>
        }
      </div>
      
    </div>
  );
}
