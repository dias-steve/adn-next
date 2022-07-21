import React, {useState} from 'react'
import styles from './Search.module.scss'
import { useDispatch, useSelector } from "react-redux";

//components
import SearchBar from './SearchBar/SearchBar';
import ResultSearchScreen from './ResultSearchScreen/ResultSearchScreen';
import {sendSearch, handleSetShowResultScreen, handleSetIsLoading,handleSetResults } from './../../utils/search.utils'
import { useEffect } from 'react';


const mapState = (state) => ({
    search: state.search
 })
export default function Search() {

const {search} = useSelector(mapState);
const dispatch = useDispatch()
const showResultScreen = search.show_results_screen;
const isLoading = search.is_loading;
const results = search.results;



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

const handleSetTerm = (value) => {
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

  return (

    <div className= {styles.globalContainer}>
    
  
      <SearchBar handleSearch = {handleSearch} handleSetTerms={handleSetTerm}/>

   
    </div>
  )
}
