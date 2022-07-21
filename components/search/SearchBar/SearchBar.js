import React, { useState } from 'react'
import styles from './SearchBar.module.scss'
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import {sendSearch, handleSetShowResultScreen, handleSetIsLoading,handleSetResults,    handleSetShowSearchBar } from './../../../utils/search.utils'

const mapState = (state) => ({
  search: state.search
})
export default function SearchBar({handleSearch, handleSetTerms}) {


const {search} = useSelector(mapState);
const showInputSearch = search.show_search_bar;
const dispatch = useDispatch()

const handleShowInputSearch = () => {
 
    if (showInputSearch === true){
      handleSearch();
    }else{

      handleSetShowSearchBar(true, dispatch);
    }
}

  return (
    <div className={styles.containerGlobal}>
      <form>
    <div className = {styles.containerWrapper}>
        <input className= {styles.searchInput} 
          type= 'text' placeholder= 'Votre recherche' 
          style={{ 
            maxWidth: (showInputSearch ? '1000px': '0')
            }}
            onChange = {(e) => {handleSetTerms(e.target.value)}}
            />
            
        <button className= {styles.btnSearch} type='submit' onClick={(e) => { e.preventDefault(); handleShowInputSearch()}} style={{ backgroundColor: showInputSearch ? 'black': ' #D9D9D9' }}>
            <div className= {styles.imageWrapper}> <Image src= {showInputSearch ?  '/search-green.svg': '/search-gray.svg'} layout={'fill'} className={styles.image}/> </div>

        </button >

    </div>
    </form>
    </div>

  )
}
