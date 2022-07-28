
import cartModalTypes from "./cartModal.types";

export const setShowCartModal = (show) => ({
    type: cartModalTypes.SET_SHOW_CART_MODAL,
    payload: show
});