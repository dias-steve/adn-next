import generalSettingsReducer from "../redux/GeneralSettings/generalSettings.reducer";
import { handleSetShowCartModal } from "./cartModal.utils";
import { handleSetGeneralSettings } from "./generealSettings.utils";
import { initializeMenuList } from "./menu.utils";

export const initializePage = (menuData,generalSettingsReducerData,dispatch) => {
    handleSetShowCartModal(false, dispatch)
    handleSetGeneralSettings(generalSettingsReducerData, dispatch)
    initializeMenuList(menuData, dispatch)
}