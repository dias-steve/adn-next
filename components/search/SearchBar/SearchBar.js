import React, { useState } from 'react'
import styles from './SearchBar.module.scss'
import Image from 'next/image'


export default function SearchBar() {
const [showInputSearch, setShowInputSearch] = useState(false);

const handleShowInputSearch = () => {
    setShowInputSearch(!showInputSearch)
}

  return (
    <div className={styles.containerGlobal}>
    <div className = {styles.containerWrapper}>
        <input className= {styles.searchInput} type= 'text' placeholder= 'Votre recherche' style={{ maxWidth: showInputSearch ? '1000px': '0'}}/>
        <div className= {styles.btnSearch} onClick={() => { handleShowInputSearch()}} style={{ backgroundColor: showInputSearch ? 'black': ' #D9D9D9' }}>
            <div className= {styles.imageWrapper}> <Image src= {showInputSearch ?  '/search-green.svg': '/search-gray.svg'} layout={'fill'} className={styles.image}/> </div>

        </div>

    </div>
    </div>

  )
}
