import React from "react";
import { useDispatch, useSelector} from 'react-redux';
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";

//utils
import {
  handleSubmitPayementForm,
  handleSetShippementdata
} from "./../../utils/checkout.utils";

//Components
import FormInput from "../form/FormInput";
import FormButton from "../form/FormButton";

const mapState  = state => ({
  is_paying : state.modal.show_modal,
  order : state.order
});


export default function PaiementForm() {
  //stripe configuration


  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  //Cart
  const { items } = useCart();

  //Redux
  const dispatch = useDispatch();
  const {is_paying, order} = useSelector(mapState)

  return (
    <div className="paiementform-component form-wrapper">
      <h2 className="checkout-sub-title">Paiement</h2>
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


      
    </div>
  );
}
