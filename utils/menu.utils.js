import { setCurrentMenu, setMenuList, setShowMenu, setShowThumbnail, setThumbnail } from "../redux/Menu/menu.actions";


export const getChildCategory = (categoryID, categories) => {
   
  return categories.filter((category)=> {
        if(category.parent === categoryID ){
            return true;
        }else{
            return false
        }
    })
}

export const getCategoryByID = (categoryID, categories) => {
    let categoryFound = null
    let i = 0
  
    while (i <categories.length && categoryFound === null) {
     
        if(categories[i].term_id === categoryID){
            categoryFound = categories[i];
           
        }
        i++;
     }
    
    return categoryFound;
}

export const handleSetCurrentMenu = (currentMenu, menuList ,dispatch) => {
    if(!currentMenu){
        dispatch(
            setCurrentMenu({
                sub_menu_item: null,
                childrens: getChildCategory(0, menuList )
              })
        )
    }else{
        dispatch(
            setCurrentMenu({
                sub_menu_item: currentMenu,
                childrens: getChildCategory(currentMenu.term_id, menuList )
              })
        )
    }


}

export const initializeMenuList =  (menuList, dispatch)=> {
    dispatch(
        setCurrentMenu({
            sub_menu_item: null,
            childrens: getChildCategory(0, menuList.categorie_flat)
        })
    )
    dispatch(
        setMenuList(menuList.categorie_flat)
    )
    dispatch(
        setShowMenu(false)
    )
}

export  const handlePevCategories = async (currentMenu, menuList, dispatch) => {
    if(currentMenu.sub_menu_item ){

        const currt = await getCategoryByID(currentMenu.sub_menu_item.parent, menuList)
        console.log (getCategoryByID(currentMenu.sub_menu_item.parent, menuList))
        handleSetCurrentMenu(currt,menuList, dispatch);
      }
}

export const CreateBaseMenu = () => {
  

    return baseMenu;
}

export const handleSetShowMenu = (isShow, dispatch) => {
    dispatch(
        setShowMenu(isShow)
    )
}

export const handleSetThumbnail = (thumbnail, dispatch) => {
    dispatch(
        setThumbnail(thumbnail)
    )
}

export const handleSetShowThumbnail = (show, dispatch) => {
    dispatch(
        setShowThumbnail(show)
    )
}
