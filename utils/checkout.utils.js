import { apiInstance } from "./api.utils";
import validator from "validator";
import { handleSetConfigModal, handleSetShowModal } from "./modal.utils";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_ERROR, PAYMENT_SUCCESS, FORM_SHIPMENT_ERROR, CART_ERROR } from "./codeError.types";
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
  setOrderSession
} from "../redux/Order/order.actions";
import { EXITING } from "react-transition-group/Transition";

const publicKeyWoo = process.env.NEXT_PUBLIC_WC_PUBLIC_KEY;
export function getListShippmentByCountryCode(
  CountryCode,
  methodShippementData
) {
  for (let i = 0; i < methodShippementData.length; i++) {
    for (let j = 0; j < methodShippementData[i].zone_locations.length; j++) {
      if (methodShippementData[i].zone_locations[j].code === CountryCode) {
        return methodShippementData[i].zone_shipping_methods;
      }
    }
  }
  return null;
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
  dispatch
) => {
  dispatch(
    setShippementModeSelected(
      getMethodShipmentbyTitle(value, countrycode, listShipmentMethods)
    )
  );
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
  console.log("title:" + title);
  let results = null;
  if (listMethodeAvailable) {
    for (let i = 0; i < listMethodeAvailable.length; i++) {
      if (title === listMethodeAvailable[i].method_user_title) {
        console.log("good:");
        return listMethodeAvailable[i];
      }
    }
    console.log("notgood:");
    return null;
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
      method_id: methodShippingObject.method_rate_id,
      method_title: methodShippingObject.method_user_title,
      total: methodShippingObject.method_cost,
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
        return null;
      } else {
        return response.data;
      }
    })
    .catch((err) => {
      return null;
    });
}

export function ValidateOrderWoo(OderId, paymentIntentid) {
  return apiInstance
    .post("/order/validate", {
      publickey: publicKeyWoo,
      order_id: OderId,
      paymentintent_id: paymentIntentid,
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
    fieldsValidationResult.back_step= 2;
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
    fieldsValidationResult.back_step= 2;
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
  if (currentStep >= 2) {
    if (
      validator.isEmpty(shippementFromData.firstname, {
        ignore_whitespace: true,
      })
    ) {
      fieldsValidationResult.firstname = false;
      message_error.push("Veuillez entrer votre prénom");
      fieldsValidationResult.back_step = 2;
    }

    if (
      validator.isEmpty(shippementFromData.lastname, {
        ignore_whitespace: true,
      })
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
    if (
      validator.isEmpty(shippementFromData.city, { ignore_whitespace: true })
    ) {
      fieldsValidationResult.city = false;
      message_error.push("Veuillez entrer une ville");
      fieldsValidationResult.back_step = 2;
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
  }

  if (currentStep >= 3){
    if (
      validator.isEmpty(shippementFromData.name_card, { ignore_whitespace: true })
    ) {
      fieldsValidationResult.name_card = false;
      message_error.push("Veuillez entrer une adresse nom de carte");
      fieldsValidationResult.back_step = 3;
    }
  
    if (shippementFromData.cgv !== true) {
      fieldsValidationResult.cgv = false;
      fieldsValidationResult.cgv_message =
        "Veuillez accepter les conditions générales de vente";
      message_error.push("Veuillez accepter les conditions générales de vente");
      fieldsValidationResult.back_step= 3;
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
  const validatorShippementFormResult = validatorShippementForm(
    adrShippement,
    dispatch
  );
  const message_error = validatorShippementFormResult.message_error;
  //Verification tous les produits du panier sont bien disponible

  if (message_error.length === 0) {
    handleSetConfigModal(
      {
        is_loading: true,
        title: "5% Verification des stocks...",
        message: "Veuillez ne pas quitter la page",
      },
      dispatch
    );
    console.log(items);
    const stock = await getItemsStockState(items);

    handleSetConfigModal(
      {
        is_loading: true,
        title: "10% Verification des stocks...",
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
      // pousser à la page panier message error

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

      return CART_ERROR
    }
  } else {
    //modale FERMANtE

    handleSetConfigModal(
      {
        is_loading: false,
        title: "Le formulaire est invalide",
        message:
          "Veuillez bien remplir tous les champs et accepter les conditions générales de vente",
        is_positif: false,
      },
      dispatch
    );

    return FORM_SHIPMENT_ERROR
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
      title: "10% Paiement en cours...",
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
    handelSetOrderSession({
      order_id: order.id,
      in_process: true,
      done: false
    }, dispatch)
  handleSetConfigModal(
      {
        is_loading: true,
        title: "30% Paiement en cours...",
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
            title: "60% Paiement en cours...",
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
            // on passe au paiement pure
            handleSetConfigModal(
              {
                is_loading: true,
                title: "90% Paiement en cours...",
                message: "Veuillez ne pas quitter la page",
              },
              dispatch
            );
            if (paymentMethod) {
             let codeError = stripe
                .confirmCardPayment(clientSecret, {
                  payment_method: paymentMethod.id,
                })
                .then(({ paymentIntent, error }) => {
                 
                  if (paymentIntent) {
                    
                    ValidateOrderWoo(order.id, paymentIntent.id);

                    handelSetOrderSession({
                      order_id: order.id,
                      in_process: false,
                      done: true
                    }, dispatch)

                    handleSetConfigModal(
                      {
                        is_loading: false,
                        title: "Merci pour votre commande n° "+ order.id +"!",
                        message:
                          "Votre commande a bien été enregistrée",
                        is_positif: true,
                        go_to_home_action: true,

                      },
                      dispatch
                    );
                    
                  
                    //clear cart
                    //numéro de commande =validerOrderpaiment(order, paymentIntent)
                    //afficher paiement validé numéro de commande retourner à l'accueil
                    //ne plus afficher la roue
                  }
                  if (error) {
                    console.log(error);

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
                  handleSetConfigModal(
                    {
                      is_loading: false,
                      title: "Paiement a échoué",
                      message: "Veuillez rééssayer ulterieurement 8",
                      is_positif: false,
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
                  title: "Le paiement a échoué",
                  message: "Veuillez rééssayer ulterieurement 1",
                  is_positif: false,
                },
                dispatch
              );
              
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
              
            }
           
          });

        if (error) {
          handleSetConfigModal(
            {
              is_loading: false,
              title: "Paiement à échoué",
              message: "Veuillez rééssayer ulterieurement 2",
              is_positif: false,
            },
            dispatch
          );
         
        }
      })
      .catch((err) => {
        console.log(err);
        handleSetConfigModal(
          {
            is_loading: false,
            title: "Paiement a échoué",
            message: "Veuillez rééssayer ulterieurement (codeEreur: 3)",
            is_positif: false,
          },
          dispatch
        );
        
        // problème critique envoyer alert
      });
  } else {
    handleSetConfigModal(
      {
        is_loading: false,
        title: "Paiement a échoué",
        message: "Veuillez rééssayer ulterieurement",
        is_positif: false,
      },
      dispatch
    );

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
  dispatch(
    setOrderSession(orderSession)
  )
}

export const handelResetOrderSession = ( dispatch) => {
  dispatch(
    setOrderSession({
      done: false
    })
  )
}