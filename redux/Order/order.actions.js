import orderTypes from "./order.types";

export const setShippementMode = shippementMode => ({
    type: orderTypes.SET_SHIPPEMENT_MODE,
    payload: shippementMode
});



