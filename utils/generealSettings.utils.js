import { setGeneralSettings } from "../redux/GeneralSettings/generalSettings.action"

export const handleSetGeneralSettings = (generalSettings, dispatch) =>{
    dispatch(
        setGeneralSettings(generalSettings)
    )
}