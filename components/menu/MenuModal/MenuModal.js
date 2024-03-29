import React from 'react'
import styles from './MenuModal.module.scss'
import MenuMultiSteps from '../MenuMultiSteps/MenuMultiSteps'
import { useDispatch, useSelector } from "react-redux";
import {handleSetShowMenu, handlePevCategories} from "../../../utils/menu.utils"
import {handleSetShowResultScreen,  handleSetShowSearchBar} from "../../../utils/search.utils"
import chevron from '../../../public/chevron-left-gray.svg'
import ButtonCercle from '../../ButtonCercle/ButtonCercle';
import ResultSearchScreen from '../../search/ResultSearchScreen/ResultSearchScreen';
import SearchBar from '../../search/SearchBar/SearchBar';
import ImageViewerMenu from '../ImageViewer/ImageViewerMenu';




const mapState = (state) => ({
    menu: state.menu,
    search: state.search,
  })


export default function MenuModal() {

    const dispatch = useDispatch();
    const {menu, search} = useSelector(mapState);
    const currentMenu = menu.current_menu;
    const menuList = menu.menu_list
    const showMenu = menu.show_menu;

    const showScreenSearch = search.show_results_screen;

    const handlePrev = () => {
        if(showScreenSearch){
          handleSetShowResultScreen(false, dispatch);
          handleSetShowSearchBar(false, dispatch);
        }else{
          if(currentMenu.sub_menu_item){
            handlePevCategories(currentMenu, menuList, dispatch);
        }else{
            handleSetShowMenu(false, dispatch)
            handleSetShowSearchBar(false, dispatch);
        }
        }

    }

  return (
  
  <div className={[styles.menuModal, showMenu? styles.show : styles.hide].join(" ")}>
    <ImageViewerMenu/>
    <div className={styles.buttonsWrapper}>
      <div className={styles.searchWrapper}>
        <SearchBar/>
      </div>
      <div  className={styles.backBtnWrapper}>
        <ButtonCercle img={chevron} rotate90={showScreenSearch} alt={'icon back'} handleClick={(e)=> {e.preventDefault();handlePrev()}}/>
      </div>
    </div>
    <div className= {styles.resultWrapper} >
        <ResultSearchScreen />
    </div>
    <MenuMultiSteps />
  </div>
  )
}
