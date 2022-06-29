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
  handleSubmitPayementForm,
  handleSetShippementdata
} from "./../../utils/checkout.utils";
import { apiInstance } from "./../../utils/api.utils";
import Spinner from "../../components/spin/spinner";
import FormInput from "../form/FormInput";
import ModalPopUp from "../modalPopUp/modalPopUp";
import { is } from "@react-spring/shared";

import {  setConfig, setShowModal } from "../../redux/Modal/modal.actions"
import { useDispatch, useSelector} from 'react-redux';
import { handleSetConfigModal, handleSetShowModal } from "../../utils/modal.utils";

const mapState  = state => ({
  is_paying : state.modal.show_modal,
  order : state.order
});


export default function PaiementForm({

  totalPrice,

}) {
  const stripe = useStripe();
  const elements = useElements();
  const { items } = useCart();
  const dispatch = useDispatch();

  const {is_paying, order} = useSelector(mapState)





  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };



  return (
    <div className="paiementform-component form-wrapper">
      <h2 className="checkout-sub-title">3. Paiement</h2>
      <div className="wrapper-fields">
        <FormInput
          isValid={order.shippement_data_validation_state.name_card}
          label="Nom sur la carte"
          type="text"
          handleChange={(e) => {
            handleSetShippementdata({ ...order.shippement_data, name_card: e.target.value }, dispatch);
          }}
        />
        <div className="card-wrapper">
          <CardElement options={configCardElement} />
        </div>
      </div>
      <div className="cgv-zone">
      <label className={!order.shippement_data_validation_state.cgv ?'cgv-error': 'cgv'}>
        <input
          type="checkbox"
          checked={order.shippement_data.cgv}
          onChange={() => handleSetShippementdata({ ...order.shippement_data, cgv: !order.shippement_data.cgv }, dispatch)}
        />
         <span>J&apos;accepte les conditions générales de vente </span>
      </label>
      </div> 
      
        


      

      <div className="pay-zone">
        { !is_paying &&
          <>
            <p> Total à payer: {order.total_price}€</p>
            <FormButton
              name={"Payer Maintenant"}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmitPayementForm(dispatch, elements, order.shippement_data, items, order.shippement_mode_selected, stripe);
                console.log(is_paying)
              }}
            />
          </>
        }
      </div>
      
    </div>
  );
}
