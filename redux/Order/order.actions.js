import orderTypes from "./order.types";

export const setShippementModeSelected = shippementMode => ({
    type: orderTypes.SET_SHIPPEMENT_MODE_SELECTED,
    payload: shippementMode
});

export const setShippementData = shippementData => ({
    type: orderTypes.SET_SHIPPEMENT_DATA,
    payload: shippementData
});

export const setListShippementAvailable = listShippementAvailable => ({
    type: orderTypes.SET_LIST_SHIPPEMENT_AVAILABLE,
    payload: listShippementAvailable
})

export const setShippementDataValidationState = validationState => ({
    type: orderTypes.SET_SHIPPEMENT_DATA_VALIDATION_STATE,
    payload: validationState
})

export const setTotalPriceOrder = price => ({
    type: orderTypes.SET_TOTAL_PRICE,
    payload: price
})

export const setListCountryShippementAvailable = list => ({
    type: orderTypes.SET_LIST_COUNTRY_SHIPPEMENT_AVAILABLE,
    payload: list
})

export const setListNotValidItem = list => ({
    type: orderTypes.SET_LIST_NOT_VALID_ITEMS,
    payload: list
})


