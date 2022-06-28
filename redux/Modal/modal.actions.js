import modalTypes from "./modal.types";

export const setConfig = config => ({
    type: modalTypes.SET_CONFIG,
    payload: config
});

export const setShowModal = show => ({
    type: modalTypes.SET_SHOW_MODAL,
    payload: show
})

