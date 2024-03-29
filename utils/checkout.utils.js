import { apiInstance } from "./api.utils";
import validator from "validator";
import { handleSetConfigModal, handleSetShowModal } from "./modal.utils";
import { useDispatch, useSelector } from "react-redux";
import {
  PAYMENT_ERROR,
  PAYMENT_SUCCESS,
  FORM_SHIPMENT_ERROR,
  CART_ERROR,
} from "./codeError.types";
import {
  Card,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  setShippementModeSelected,
  setShippementData,
  setShippementDataValidationState,
  setListNotValidItem,
  setOrderSession,
} from "../redux/Order/order.actions";
import { EXITING } from "react-transition-group/Transition";
import { is } from "@react-spring/shared";
import { sendMessageFlag } from "./sendMessage.utils";

import { getContinentCodeOfCountry } from "./CountriesCodes.utils";

const FREE_SHIPPEMENT_LABEL = 'Livraison gratuite'
const publicKeyWoo = process.env.NEXT_PUBLIC_WC_PUBLIC_KEY;
export function getListShippmentByCountryCode(
  CountryCode,
  methodShippementData
) {
  let defaultResult = null;
  let continentmethodShippement = null;
  const continentCode = getContinentCodeOfCountry(CountryCode)
  
  for (let i = 0; i < methodShippementData.length; i++) {
    if(methodShippementData[i].zone_locations.length === 0){
      defaultResult = methodShippementData[i].zone_shipping_methods
    }
    
    for (let j = 0; j < methodShippementData[i].zone_locations.length; j++) {
      if(methodShippementData[i].zone_locations[j].code === continentCode  && 
        methodShippementData[i].zone_locations[j].type === "continent"){
        continentmethodShippement = methodShippementData[i].zone_shipping_methods;
      }
      if (methodShippementData[i].zone_locations[j].code === CountryCode &&
        methodShippementData[i].zone_locations[j].type === "country"
        ) {
        return methodShippementData[i].zone_shipping_methods;
      }
    }
  }
  return  continentmethodShippement ?  continentmethodShippement : defaultResult;
}

export function getListCountryShipments(methodShippementData, type) {
  let countryCodes = [];
  for (let i = 0; i < methodShippementData.length; i++) {
    for (let j = 0; j < methodShippementData[i].zone_locations.length; j++) {
      if (methodShippementData[i].zone_locations[j].type === type) {
        countryCodes = [
          ...countryCodes,
          methodShippementData[i].zone_locations[j].code,
        ];
      }
    }
  }
  return countryCodes;
}

export const handleSetShippingModeSelected = (
  value,
  countrycode,
  listShipmentMethods,
  items,
  dispatch
) => {

  const modeSelected = getMethodShipmentbyTitle(value, countrycode, listShipmentMethods);

  
  const calcul = calculMethodShippementCost (modeSelected, items)
  dispatch(
    setShippementModeSelected(
     {...modeSelected,   shipping_cost_calculated: calcul}
    )
  );
};

export const SHIPPING_MODE_DEFAULT_NOTAVAIBLE = {
  method_is_valid: false,
  method_cost: "0",
  method_is_enbled: true,
  method_rate_id: "",
  method_title: "",
  method_user_title: "Aucun mode de livraison sélectionné",
  methode_description: "<p>Aucun mode de livraison sélectionné</p>\n",
  shipping_cost_calculated: 0,
};

export const handleSetNullShipementModeSelected = (dispatch) => {
  dispatch(setShippementModeSelected(SHIPPING_MODE_DEFAULT_NOTAVAIBLE));
};

export const handleSetShippementdata = (shippementData, dispatch) => {
  dispatch(setShippementData(shippementData));
};
export function getMethodShipmentbyTitle(
  title,
  CountryCode,
  methodShippementData
) {
  const listMethodeAvailable = getListShippmentByCountryCode(
    CountryCode,
    methodShippementData
  );


  if (listMethodeAvailable) {
    for (let i = 0; i < listMethodeAvailable.length; i++) {
      if (title === listMethodeAvailable[i].method_user_title) {
   
        return { ...listMethodeAvailable[i], method_is_valid: true };
      }
    }

    return SHIPPING_MODE_DEFAULT_NOTAVAIBLE;
  }
}

//Création de commande dans woo commerce
export function CreateOrderWoo(items, methodShippingObject, shippingAddr) {
  const lineItems = items.map((items) => ({
    product_id: items.id,
    quantity: items.quantity,
  }));


  const shippingLines = [
    {
      method_id: "flat_rate",
      method_title: methodShippingObject.method_user_title,
      total: methodShippingObject.shipping_cost_calculated.toString()
    },
  ];



  const shipping = {
    first_name: shippingAddr.firstname,
    last_name: shippingAddr.lastname,
    address_1: shippingAddr.address,
    address_2: shippingAddr.instructions,
    city: shippingAddr.city,
    state: shippingAddr.departement,
    postcode: shippingAddr.postalcode,
    country: shippingAddr.countrycode,
  };

  const billing = {
    first_name: shippingAddr.firstname,
    last_name: shippingAddr.lastname,
    address_1: shippingAddr.address,
    address_2: "",
    city: shippingAddr.city,
    state: shippingAddr.departement,
    postcode: shippingAddr.postalcode,
    country: shippingAddr.countrycode,
    email: shippingAddr.mail,
    phone: shippingAddr.phone,
  };

  const order = {
    billing,
    shipping,
    line_items: lineItems,
    shipping_lines: shippingLines,
  };

  return apiInstance
    .post("/order/create", {
      publickey: publicKeyWoo,
      order,
    })
    .then((response) => {
      if (response.error) {
        sendMessageFlag('Error: create order: '+response.error.message)
        return null;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      return null;
    });
}

export function ValidateOrderWoo(OderId, paymentIntentid, paid) {
  return apiInstance
    .post("/order/validate", {
      publickey: publicKeyWoo,
      order_id: OderId,
      paymentintent_id: paymentIntentid,
      paid: paid,
    })
    .then((response) => {
      if (response.error) {
        sendMessageFlag('Error: validate order: '+response.error.message);
        return null;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      return null;
    });
}


export function sendNotesOrderWoo(OderId, note) {
  return apiInstance
    .post("/order/notes", {
      publickey: publicKeyWoo,
      order_id: OderId,
      note: note
    })
    .then((response) => {
      if (response.error) {
       
        return null;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      return null;
    });
}

// verification de l'état des stock des produit dans le panier
export async function getItemsStockState(items) {
  const data = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/productstock",
    {
      // Adding method type
      method: "POST",

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ items }),
    }
  );

  const itemsStockState = await data.json();

  return itemsStockState;
}

// validator form

export const initialStatAdressShippementValidator = {
  firstname: true,
  lastname: true,
  address: true,
  postalcode: true,
  departement: true,
  city: true,
  countrycode: true,
  mail: true,
  phone: true,
  message_error: [],
};

export const initialStateValidation = {
  firstname: true,
  fristname_message: "",
  lastname: true,
  lastname_message: "",
  address: true,
  address_message: "",
  postalcode: true,
  postalcode_message: "",
  departement: true,
  departement_message: "",
  city: true,
  city_message: "",
  countrycode: true,
  countrycode_message: "",
  mail: true,
  mail_message: "",
  phone: true,
  phone_message: "",
  name_card: true,
  name_card_message: "",
  cgv: true,
  cgv_message: "",
  message_error: [],
  back_step: 10,
};
export function validatorShippementForm(shippementFromData, dispatch) {
  let fieldsValidationResult = { ...initialStateValidation };

  let message_error = [];
  if (
    validator.isEmpty(shippementFromData.firstname, { ignore_whitespace: true })
  ) {
    fieldsValidationResult.firstname = false;
    message_error.push("Veuillez entrer votre prénom");
    fieldsValidationResult.back_step = 2;
  }

  if (
    validator.isEmpty(shippementFromData.lastname, { ignore_whitespace: true })
  ) {
    fieldsValidationResult.lastname = false;
    message_error.push("Veuillez entrer votre nom");
    fieldsValidationResult.back_step = 2;
  }

  if (
    validator.isEmpty(shippementFromData.address, { ignore_whitespace: true })
  ) {
    fieldsValidationResult.address = false;
    message_error.push("Veuillez entrer une adresse valide");
    fieldsValidationResult.back_step = 2;
  }

  if (
    validator.isEmpty(shippementFromData.postalcode, {
      ignore_whitespace: true,
    })
  ) {
    fieldsValidationResult.postalcode = false;
    message_error.push("Veuillez entrer un code postal");
    fieldsValidationResult.back_step = 2;
  }
  if (
    validator.isEmpty(shippementFromData.departement, {
      ignore_whitespace: true,
    })
  ) {
    fieldsValidationResult.departement = false;
    message_error.push("Veuillez entrer un departement valide");
    fieldsValidationResult.back_step = 2;
  }
  if (validator.isEmpty(shippementFromData.city, { ignore_whitespace: true })) {
    fieldsValidationResult.city = false;
    message_error.push("Veuillez entrer une ville");
    fieldsValidationResult.back_step = 2;
  }
  if (
    validator.isEmpty(shippementFromData.name_card, { ignore_whitespace: true })
  ) {
    fieldsValidationResult.name_card = false;
    message_error.push("Veuillez entrer une adresse nom de carte");
    fieldsValidationResult.back_step = 3;
  }

  if (
    validator.isEmpty(shippementFromData.phone, { ignore_whitespace: true })
  ) {
    fieldsValidationResult.phone = false;
    message_error.push("Veuillez entrer un numéro de téléphone valide");
    fieldsValidationResult.back_step = 2;
  }

  if (!validator.isEmail(shippementFromData.mail)) {
    fieldsValidationResult.mail = false;
    message_error.push("Veuillez entrer un mail valide");
    fieldsValidationResult.back_step = 2;
  }

  if (shippementFromData.cgv !== true) {
    fieldsValidationResult.cgv = false;
    fieldsValidationResult.cgv_message =
      "Veuillez accepter les conditions générales de vente";
    message_error.push("Veuillez accepter les conditions générales de vente");
    fieldsValidationResult.back_step = 3;
  }
  fieldsValidationResult.message_error = message_error;

  dispatch(setShippementDataValidationState(fieldsValidationResult));
  return fieldsValidationResult;
}

export function validatorShippementFormMultiStep(
  shippementFromData,
  dispatch,
  currentStep
) {
  let fieldsValidationResult = { ...initialStateValidation };

  let message_error = [];
  fieldsValidationResult.back_step === 100000;
  const setbackstep = (step) => {
    if (fieldsValidationResult.back_step > step){
      return step
    }else{
      return fieldsValidationResult.back_step
    }
  }

  if (currentStep >= 2) {
    if (
      validator.isEmpty(shippementFromData.firstname, {
        ignore_whitespace: true,
      })
    ) {
      fieldsValidationResult.firstname = false;
      message_error.push("Veuillez entrer votre prénom");
      fieldsValidationResult.back_step = setbackstep(2);
    }

    if (
      validator.isEmpty(shippementFromData.lastname, {
        ignore_whitespace: true,
      })
    ) {
      fieldsValidationResult.lastname = false;
      message_error.push("Veuillez entrer votre nom");
      fieldsValidationResult.back_step = setbackstep(2);
    }

    if (
      validator.isEmpty(shippementFromData.address, { ignore_whitespace: true })
    ) {
      fieldsValidationResult.address = false;
      message_error.push("Veuillez entrer une adresse valide");
      fieldsValidationResult.back_step = setbackstep(2);
    }

    if (
      validator.isEmpty(shippementFromData.postalcode, {
        ignore_whitespace: true,
      })
    ) {
      fieldsValidationResult.postalcode = false;
      message_error.push("Veuillez entrer un code postal");
      fieldsValidationResult.back_step = setbackstep(2);
    }
    if (
      validator.isEmpty(shippementFromData.departement, {
        ignore_whitespace: true,
      })
    ) {
      fieldsValidationResult.departement = false;
      message_error.push("Veuillez entrer un departement valide");
      fieldsValidationResult.back_step = setbackstep(2);
    }
    if (
      validator.isEmpty(shippementFromData.city, { ignore_whitespace: true })
    ) {
      fieldsValidationResult.city = false;
      message_error.push("Veuillez entrer une ville");
      fieldsValidationResult.back_step = setbackstep(2);
    }

    if (
      validator.isEmpty(shippementFromData.phone, { ignore_whitespace: true })
    ) {
      fieldsValidationResult.phone = false;
      message_error.push("Veuillez entrer un numéro de téléphone valide");
      fieldsValidationResult.back_step = setbackstep(2);
    }

    if (!validator.isEmail(shippementFromData.mail)) {
      fieldsValidationResult.mail = false;
      message_error.push("Veuillez entrer un mail valide");
      fieldsValidationResult.back_step = setbackstep(2);
    }
  }

  if (currentStep >= 3) {
    if (
      validator.isEmpty(shippementFromData.name_card, {
        ignore_whitespace: true,
      })
    ) {
      fieldsValidationResult.name_card = false;
      message_error.push("Veuillez entrer une adresse nom de carte");
      fieldsValidationResult.back_step = setbackstep(3);
    }

    if (shippementFromData.cgv !== true) {
      fieldsValidationResult.cgv = false;
      fieldsValidationResult.cgv_message =
        "Veuillez accepter les conditions générales de vente";
      message_error.push("Veuillez accepter les conditions générales de vente");
      fieldsValidationResult.back_step = setbackstep(3);
    }
  }

  fieldsValidationResult.message_error = message_error;

  dispatch(setShippementDataValidationState(fieldsValidationResult));
  return fieldsValidationResult;
}
/**
 * Gestion Paiement
 */

export const handleSubmitPayementForm = async (
  dispatch,
  elements,
  adrShippement,
  items,
  methodeSelectedObject,
  stripe
) => {
  handleSetConfigModal({ is_loading: true }, dispatch);
  const validatorShippementFormResult = validatorShippementFormMultiStep(
    adrShippement,
    dispatch,
    3
  );
  const message_error = validatorShippementFormResult.message_error;
  //Verification tous les produits du panier sont bien disponible

  if (message_error.length === 0) {
    handleSetConfigModal(
      {
        is_loading: true,
        title: "2% Vérification des stocks...",
        message: "Veuillez ne pas quitter la page",
      },
      dispatch
    );

    if (methodeSelectedObject.method_is_valid) {
      if (items.length > 0) {
        handleSetConfigModal(
          {
            is_loading: true,
            title: "7% Vérification des stocks...",
            message: "Veuillez ne pas quitter la page",
          },
          dispatch
        );
        const stock = await getItemsStockState(items);

        handleSetConfigModal(
          {
            is_loading: true,
            title: "9% Vérification des stocks...",
            message: "Veuillez ne pas quitter la page",
          },
          dispatch
        );

        if (stock.all_in_stock) {
          const codeResult = await handlePayment(
            dispatch,
            elements,
            adrShippement,
            items,
            methodeSelectedObject,
            stripe
          );
          return codeResult;
        } else {
          //modale FERMANTE
          dispatch(setListNotValidItem(stock.items_no_stock));

          handleSetConfigModal(
            {
              is_loading: false,
              title: "Certains produits de votre panier ne sont plus en stock",
              message:
                "Aucun paiement n&apos;a été réalisé.<br/>Merci de revalider votre panier",
              is_positif: false,
            },
            dispatch
          );

          return CART_ERROR;
        }
      } else {
        handleSetConfigModal(
          {
            is_loading: false,
            title: "Votre panier est vide",
            message:
              "Veuillez mettre des produits dans votre panier avant de passer commande",
            is_positif: false,
            go_to_home_action: true,
          },
          dispatch
        );

        return CART_ERROR;
      }
    } else {
      handleSetConfigModal(
        {
          is_loading: false,
          title: "Aucun mode de livraison sélectionné",
          message:
            "Veuillez sélectionner un mode de livraison",
          is_positif: false,
         
        },
        dispatch
      );

      return FORM_SHIPMENT_ERROR;
    }
  } else {
    //modale FERMANtE
    if(validatorShippementFormResult.back_step === 2 ){
      handleSetConfigModal(
        {
          is_loading: false,
          title: "Le formulaire est invalide",
          message:
            "Veuillez bien remplir tous les champs en surbrillance",
          is_positif: false,
        },
        dispatch
      );
  
      return FORM_SHIPMENT_ERROR;
    }

    if(validatorShippementFormResult.back_step === 3 ){
      handleSetConfigModal(
        {
          is_loading: false,
          title: "Le formulaire est invalide",
          message:
            "Veuillez entrer un nom de carte et accepter les conditions générales de vente",
          is_positif: false,
        },
        dispatch
      );
  
      return "not";
    }

    }

    };


export const handlePayment = async (
  dispatch,
  elements,
  adrShippement,
  items,
  methodeSelectedObject,
  stripe
) => {
  handleSetConfigModal(
    {
      is_loading: true,
      title: "14% Paiement en cours...",
      message: "Veuillez ne pas quitter la page",
    },
    dispatch
  );

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
    handelSetOrderSession(
      {
        order_id: order.id,
        in_process: true,
        done: false,
      },
      dispatch
    );
    handleSetConfigModal(
      {
        is_loading: true,
        title: "37% Paiement en cours...",
        message: "Veuillez ne pas quitter la page",
      },
      dispatch
    );
    apiInstance
      .post("/paymentadn", {
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
        handleSetConfigModal(
          {
            is_loading: true,
            title: "68% Paiement en cours...",
            message: "Veuillez ne pas quitter la page",
          },
          dispatch
        );
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
            sendNotesOrderWoo(
              order.id, 'Création du Paiement Methode par Stripe'
            )
            handleSetConfigModal(
              {
                is_loading: true,
                title: "96% Paiement en cours...",
                message: "Veuillez ne pas quitter la page",
              },
              dispatch
            );
            if (paymentMethod) {

              stripe
                .confirmCardPayment(clientSecret, {
                  payment_method: paymentMethod.id,
                })
                .then(({ paymentIntent, error }) => {
                  if (paymentIntent) {
                    sendNotesOrderWoo(
                      order.id, ' Paiement intent créé par Stripe n°:'+paymentIntent.id
                    )
                    ValidateOrderWoo(order.id, paymentIntent.id, true);
                    sendNotesOrderWoo(
                      order.id, 'paiement Stripe réussie par carte'
                    )
                    handelSetOrderSession(
                      {
                        order_id: order.id,
                        in_process: false,
                        done: true,
                      },
                      dispatch
                    );

                    handleSetConfigModal(
                      {
                        is_loading: false,
                        title:
                          " 100% Merci pour votre commande n°" + order.id + "!",
                        message: "Votre commande a bien été enregistrée",
                        is_positif: true,
                        go_to_home_action: true,
                      },
                      dispatch
                    );

                    //clear cart
                    //numéro de commande =validerOrderpaiment(order, paymentIntent)
                    //afficher paiement validé numéro de commande retourner à l'accueil
                    //ne plus afficher la roue
                  }else{
                    sendNotesOrderWoo(
                      order.id, 'Création du Paiement intent par Stripe a échoué'
                    )
                    ValidateOrderWoo(order.id, null , false);
                  }
                  if (error) {
                    console.log(error);
                    sendNotesOrderWoo(
                      order.id, ' Le paiement Stripe échoué la carte a été refusée'
                    )
                    ValidateOrderWoo(order.id, null , false);
                    handleSetConfigModal(
                      {
                        is_loading: false,
                        title: "Paiement refusé",
                        message: "",
                        is_positif: false,
                      },
                      dispatch
                    );
                    //ne plus afficher la roue
                    //indication modification paiement refusé
                  }
                })
                .catch((err) => {
                  console.log(err);
                  sendNotesOrderWoo(
                    order.id, ' Le paiement Stripe échoué erreur technique code 8 (Pb de Creation du PaiementIntent)'
                  )
                  ValidateOrderWoo(order.id, null , false);
                  handleSetConfigModal(
                    {
                      is_loading: false,
                      title: "La tentative de paiement a échouée",
                      message: "Veuillez rééssayer ulterieurement ou nous contacter (codeEreur: 8)",
                      is_positif: false,
                      contactBtn: true,
                    },
                    dispatch
                  );
                  
                });
                
            } else {
              //modale
              // numéro de carte invalide

              handleSetConfigModal(
                {
                  is_loading: false,
                  title: "La tentative de paiement a échouée",
                  message: "Veuillez rééssayer ulterieurement ou nous contacter (codeEreur: 1)",
                  contactBtn: true,
                  is_positif: false,
                },
                dispatch
              );
              sendNotesOrderWoo(
                order.id, ' Le paiement Stripe échoué erreur technique code 1 (Pb de Creation du PaiementIntent)'
              )
              ValidateOrderWoo(order.id, null , false);
              
            }

            if (error) {
              console.log("PB create Payment Methode");
              console.log(error);

              handleSetConfigModal(
                {
                  is_loading: false,
                  title: "Votre mode de paiment est invalide",
                  message: "Veuillez entrer un numéro de carte valide",
               
                  is_positif: false,
                },
                dispatch
              );
              sendNotesOrderWoo(
                order.id, ' Le paiement Stripe a échoué le numéro de carte est invalide (code: PB Payment Method)'
              )
              ValidateOrderWoo(order.id, null , false);
            }
          });


        if (error) {
    
          handleSetConfigModal(
            {
              is_loading: false,
              title: "La tentative de paiement a échouée",
              message: "Veuillez rééssayer ulterieurement ou nous contacter (codeEreur: 2)",
              is_positif: false,
              contactBtn: true
            },
            dispatch
          );
          sendNotesOrderWoo(
            order.id, ' Le paiement Stripe échoué erreur technique code 2'
          )
          sendMessageFlag('[Critical Error Stripe API]    Error: mode de paiment échoué: code erreur 2 (fonction: checkout.utils > handlePayment)');
        }
      })
      .catch((err) => {
        console.log('erroooooorr');


        handleSetConfigModal(
          {
            is_loading: false,
            title: "La tentative de Paiement a échouée",
            message: "Veuillez rééssayer ulterieurement ou nous contacter (codeError: 3)",
            is_positif: false,
            contactBtn: true
          },
          dispatch
        );
        ValidateOrderWoo(order.id, null , false);
        sendMessageFlag('[Critical Error Stripe API]  Error: mode de paiment échoué: code erreur 3 (PB de connexion avec API Stripe Contactez le supoport technique (fonction: checkout.utils > handlePayment)');
        sendNotesOrderWoo(
          order.id, ' Le paiement Stripe échoué erreur technique code 3 (PB de connexion avec API Stripe: contactez le support technique)'
        )

    

        // problème critique envoyer alert
      });
  } else {
    
    handleSetConfigModal(
      {
        is_loading: false,
        title: "La tentative de Paiement a échouée",
        message: "Veuillez rééssayer ulterieurement ou nous contacter (codeError:0) ",
        is_positif: false,
        contactBtn: true
      },
      dispatch
    );

    sendMessageFlag('[Critical Error WooCommerce API]   Error: mode de paiment échoué: code erreur 0 (PB de création de commande wooCommerce (fonction: checkout.utils > handlePayment)');
    
  }
};

export const isValidAccessCheckbox = (cart, isEmpty) => {
  return true;
};

export const CheckCartItemValid = async (items, dispatch) => {
  if (items.length < 1) {
    handleSetConfigModal(
      {
        is_loading: false,
        title: "Panier vide",
        message: "Merci de mettre dans votre panier des articles",
        is_positif: false,
      },
      dispatch
    );

    return false;
  }
  handleSetConfigModal(
    {
      is_loading: true,
      title: "Validation du panier",
      message: "",
    },
    dispatch
  );

  const stockState = await getItemsStockState(items);

  if (stockState.all_in_stock) {
    dispatch(setListNotValidItem(stockState.items_no_stock));
    handleSetConfigModal(
      {
        is_loading: false,
        title: "Panier valide",
        message: "",
        is_positif: true,
      },
      dispatch
    );

    return true;
  } else {
    dispatch(setListNotValidItem(stockState.items_no_stock));
    handleSetConfigModal(
      {
        is_loading: false,
        title: "Certains produits de votre panier ne sont plus en stock",
        message: "Merci de revalider votre panier",
        is_positif: false,
      },
      dispatch
    );
    return false;
  }
};

export const handelSetOrderSession = (orderSession, dispatch) => {
  dispatch(setOrderSession(orderSession));
};

export const handelResetOrderSession = (dispatch) => {
  dispatch(
    setOrderSession({
      done: false,
    })
  );
};





export const getListShipmentsAvailable = (shipmentsZones, items, totalCart) => {
  const isFreeCartAvailble = isFreeShippementAvailableCart(items)
  return shipmentsZones.map(shippementZones => {
    const zone_shipping_methods = shippementZones.zone_shipping_methods.filter((method) => methodeShipementFilter(method, isFreeCartAvailble, totalCart))


    return{    
      ...shippementZones,
      zone_shipping_methods:zone_shipping_methods }



    })
    
}

export const methodeShipementFilter = (methode, freeCartAvailble, totalCart)=>{
  if(methode.method_user_title.includes(FREE_SHIPPEMENT_LABEL)){
    if(parseFloat(methode.method_cost) <= parseFloat(totalCart)){
      return true
    }else{
      if(freeCartAvailble){
        return true
      }else{
        return false
      }
    }
    }else{
      return true
    }

}

export const isFreeShippementAvailableCart = (items) => {
  let isFreeShippementAvailable = true;
    items.forEach( (item) => {
      if (!item.free_shippement){
        isFreeShippementAvailable = false; 
      }
    })
  return isFreeShippementAvailable;
}
export const calculMethodShippementCost = (modeSelected, items) => {
   
    if(modeSelected.method_user_title.includes(FREE_SHIPPEMENT_LABEL)){
      return 0;
    }
    if(!modeSelected.method_cost){
      return 0
    }else{
      let cost_total_items = 0;
      items.forEach(item => {
        if(item.shipping_cost_unit){
          const cost_item = parseFloat(modeSelected.method_cost) * item.shipping_cost_unit * item.quantity
  
          cost_total_items = cost_total_items + cost_item > 0 ? cost_item : 0;
         
        }
      });
  
      const result = cost_total_items + parseFloat(modeSelected.method_cost) 
      console.log(result)
  
      return   result.toFixed(2) < 0 ? 0 : result.toFixed(2);
    }

}

export const getTheMethodeShippementCheeperIndex = (methods) => {
 let min_cost = parseFloat(methods[0].method_cost);
  let index_methods_cheeper = 0;

  for (let i = 0; i < methods.length; i++) {
    console.log(methods[i].method_cost +'<'+ min_cost)
    if(methods[i].method_user_title.includes(FREE_SHIPPEMENT_LABEL)){
      min_cost = 0;
      index_methods_cheeper = i;
    }else if (parseFloat(methods[i].method_cost) <= min_cost) {
      
       min_cost = parseFloat(methods[i].method_cost);
       index_methods_cheeper = i;
    }
  }
  return index_methods_cheeper;
}