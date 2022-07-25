import generalSettingsTypes from './generalSettings.types';

export const setGeneralSettings = generalSettings => ({
    type: generalSettingsTypes.SET_GENERAL_SETTINGS,
    payload: generalSettings
})