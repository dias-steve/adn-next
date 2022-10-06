import rgpdTypes from './rgpd.types.js';

export const setIsAccepted = isAccepted => ({
    type: rgpdTypes.SET_IS_ACCEPTED,
    payload: isAccepted
});