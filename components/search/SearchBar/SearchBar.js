import React, { useState, useEffect } from 'react'
import styles from './SearchBar.module.scss'
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import {sendSearch, handleSetShowResultScreen, handleSetIsLoading,handleSetResults,    handleSetShowSearchBar } from './../../../utils/search.utils'

const mapState = (state) => ({
  search: state.search
})
export default function SearchBar() {


const {search} = useSelector(mapState);
const showInputSearch = search.show_search_bar;
const dispatch = useDispatch()

const [terms, setTerms] = useState("")

const [delayIsUp , setDelayIsUp] = useState(0)

const handleSearch = async () => {

    if (terms !== ""){

        handleSetIsLoading(true, dispatch)
        const result = await sendSearch(terms)
        console.log(result)
        handleSetResults(result, dispatch)
        handleSetIsLoading(false, dispatch)
    }

}

const handleSetTerms = (value) => {
    handleSetShowResultScreen(true, dispatch)
    handleSetIsLoading(true, dispatch)
    setTerms(value)

    setTimeout(()=> {
        if(value!== ""){
            setDelayIsUp(delayIsUp+1)
        }
        console
    }, 3000)
    if(value === ""){
        handleSetIsLoading(false, dispatch)
    }
 
    
}

useEffect(() => {
    if(delayIsUp){
        handleSearch() 

    }
},[delayIsUp])


const handleShowInputSearch = () => {
 
    if (showInputSearch === true){
      handleSetShowResultScreen(true, dispatch)
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
