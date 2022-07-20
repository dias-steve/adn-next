import React from 'react'
import { useState } from 'react'
import Link from "next/link";
import SubMenuItem from '../SubMenuItem/SubMenuItem'
import styles from './MenuMultiSteps.module.scss'
import {CATEGORIES_FLAT_TEST, getChildCategory,getCategoryByID, handleSetCurrentMenu, handlePevCategories} from '../../../utils/menu.utils'
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";



const mapState = (state) => ({
  menu: state.menu
})

export default function MenuMultiSteps() {

  const { menu } = useSelector(mapState);
  const currentMenu = menu.current_menu;
  const menuList = menu.menu_list
  const dispatch = useDispatch()


  

 
  
  const handlePrev = () => {  
    handlePevCategories(currentMenu, menuList, dispatch);
  }





  const handleClick = (subMenuItem) => {

    handleSetCurrentMenu(subMenuItem,menuList, dispatch);
    
  }
  return (
    <div className={styles.globalContainer}>
      { currentMenu.sub_menu_item &&
        <h1 className= {styles.tilteCategory} onClick= {handlePrev} > {currentMenu.sub_menu_item.name} </h1>
      }
        {currentMenu && currentMenu.childrens &&
          <>
          {currentMenu.childrens.map((item) => {

            if(item.have_childs){
              return (
                <div className={styles.titleMenuItemWrapper} key={uuidv4()} onClick={() => handleClick(item)}>
                  <h2 className= {styles.titleMenuItem}>{item.name}</h2>
                </div>)
            }else{
              return (
                <div  className={styles.titleMenuItemWrapper} key={uuidv4()} >
                  <Link  href={item.link ? item.link : "/notfound"}>
                  <a>
                  <h2 className= {styles.titleMenuItem}>{item.name}</h2>
                  </a>
                  </Link>
                </div>)
            }


          })}
          </>
        }
    </div>
  )
}
