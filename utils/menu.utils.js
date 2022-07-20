import { setCurrentMenu, setMenuList, setShowMenu } from "../redux/Menu/menu.actions";

export const CATEGORIES_FLAT_TEST = [
    {
        "term_id": 15,
        "name": "Uncategorized",
        "slug": "uncategorized",
        "term_group": 0,
        "term_taxonomy_id": 15,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 0,
        "count": 1,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": false
    },
    {
        "term_id": 19,
        "name": "Accessories",
        "slug": "accessories",
        "term_group": 0,
        "term_taxonomy_id": 19,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 16,
        "count": 6,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": true
    },
    {
        "term_id": 16,
        "name": "Clothing",
        "slug": "clothing",
        "term_group": 0,
        "term_taxonomy_id": 16,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 0,
        "count": 14,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": true
    },
    {
        "term_id": 21,
        "name": "Decor",
        "slug": "decor",
        "term_group": 0,
        "term_taxonomy_id": 21,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 0,
        "count": 1,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": false
    },
    {
        "term_id": 34,
        "name": "enfant",
        "slug": "enfant",
        "term_group": 0,
        "term_taxonomy_id": 34,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 19,
        "count": 1,
        "filter": "raw",
        "thumnail": {
            "url": "http://wpadnpro.local/wp-content/uploads/2022/04/3F108CCC-EC2B-4010-A7ED-707E78C5F131.jpg",
            "alt": "fee"
        },
        "have_childs": false
    },
    {
        "term_id": 18,
        "name": "Hoodies",
        "slug": "hoodies",
        "term_group": 0,
        "term_taxonomy_id": 18,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 16,
        "count": 3,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": false
    },
    {
        "term_id": 31,
        "name": "Look",
        "slug": "look",
        "term_group": 0,
        "term_taxonomy_id": 31,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 0,
        "count": 2,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": true
    },
    {
        "term_id": 32,
        "name": "Look Primtemps 2017",
        "slug": "look-primtemps-2017",
        "term_group": 0,
        "term_taxonomy_id": 32,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 31,
        "count": 2,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": false
    },
    {
        "term_id": 20,
        "name": "Music",
        "slug": "music",
        "term_group": 0,
        "term_taxonomy_id": 20,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 0,
        "count": 2,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": false
    },
    {
        "term_id": 17,
        "name": "Tshirts",
        "slug": "tshirts",
        "term_group": 0,
        "term_taxonomy_id": 17,
        "taxonomy": "product_cat",
        "description": "",
        "parent": 16,
        "count": 5,
        "filter": "raw",
        "thumnail": {
            "url": false,
            "alt": false
        },
        "have_childs": false
    }
  ]

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