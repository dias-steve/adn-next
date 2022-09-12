import footerTypes from "./footer.types";

export const setFooterGreen = ( isgreen ) => ({
    type: footerTypes.SET_FOOTER_GREEN,
    payload: isgreen
})