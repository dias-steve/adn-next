import React, { useState } from 'react'
import styles from './SearchBar.module.scss'
import Image from 'next/image'


export default function SearchBar({handleSearch, handleSetTerms}) {
const [showInputSearch, setShowInputSearch] = useState(false);

const handleShowInputSearch = () => {
 
    if (showInputSearch === true){
      handleSearch();
    }else{
      setShowInputSearch(!showInputSearch)
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
