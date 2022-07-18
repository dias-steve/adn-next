import React, {useState} from 'react'
import styles from './Search.module.scss'

//components
import SearchBar from './SearchBar/SearchBar';
import ResultSearchScreen from './ResultSearchScreen/ResultSearchScreen';
import {sendSearch} from './../../utils/search.utils'
import { useEffect } from 'react';
export default function Search() {

const [showResultSearch, setShowResultSearch] = useState(false);
const [isLoading, setIsLoading] = useState(false)
const [terms, setTerms] = useState("")
const [result , setResult] = useState( {    post_types_found: [
 
]}
)
const [delayIsUp , setDelayIsUp] = useState(0)

const handleSearch = async () => {

    if (terms !== ""){
        setShowResultSearch(true)
        setIsLoading(true)
        const result = await sendSearch(terms)
        console.log(result)
        setResult(result)
        setIsLoading(false)
    }

}

const handleSetTerm = (value) => {
    setShowResultSearch(true)
    setIsLoading(true)
    setTerms(value)

    setTimeout(()=> {
        if(value!== ""){
            setDelayIsUp(delayIsUp+1)
        }
        console
    }, 3000)
    if(value === ""){
        setIsLoading(false)
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
    <div className= {styles.resultWrapper} style= {{maxHeight: showResultSearch ? '10000px':'0px'}}>
        <ResultSearchScreen 
            isLoading={isLoading}
            result={result}
        />
    </div>
   
    </div>
  )
}
