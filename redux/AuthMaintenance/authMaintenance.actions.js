import authMaintenanceTypes from "./authMaintenace.types";

export const setAuth = (auth) => ({
    type: authMaintenanceTypes.SET_AUTH,
    payload: auth
})