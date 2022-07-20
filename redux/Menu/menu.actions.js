import menuTypes from "./menu.types"
export const setCurrentMenu = (current_menu) => ({
    type: menuTypes.SET_CURRENT_MENU,
    payload: current_menu
});

export const setMenuList= (menuList) => ({
    type: menuTypes.SET_MENU_LIST,
    payload: menuList
});
export const setShowMenu = (isShowMenu) => ({
    type: menuTypes.SET_SHOW_MENU,
    payload: isShowMenu
});