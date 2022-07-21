import React from 'react'
import styles from './ResultSearchScreen.module.scss'
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

// component
import ResultSearchItem from '../ResultSearchItem/ResultSearchItem'
import SearchBar from '../SearchBar/SearchBar'
import Spinner from '../../spin/spinner'


const mapState = (state) => ({
  search: state.search
})

const SectionSearch = ({title, items, isPortrait}) => {



  return (
    <div className={styles.sectionSearchContainer}>
      <h1 className={styles.titleSection}>{title}({items.length})</h1>
      <div className={styles.resultContainer}>
          {
            items.map((item)=> {
              return (
           
                <ResultSearchItem 
                  key={uuidv4()}
                  thumnail={item.thumnail_post}
                  title={item.title}
                  isPortrait={isPortrait}
                  link={item.link}
                />
          
              )
            })
          }

      </div>
    </div>
  )
}

export default function ResultSearchScreen() {

  const {search} = useSelector(mapState);
const dispatch = useDispatch()
const show = search.show_results_screen;
const isLoading = search.is_loading;
const result = search.results;

  return (


    <div className={[styles.globalConntainer, show? styles.show : styles.hide].join(" ")} >

        {
          isLoading ?
          <div className={styles.loadingWindows}> <Spinner blackCircle= {true}/> </div>:

            <>
            { result && result.post_types_found &&  result.post_types_found.length > 0 ?
              <div className={styles.windowsSearch}>
             {
               result.post_types_found.map((postType) => {
                let title = postType
                const itemsFound = result[postType]
                let isPortrait = false
                
                if(postType === 'product'){
                  title = 'Produit'+ (itemsFound.length > 1 ? 's' : '')
                  isPortrait = true
                }
                if(postType === 'shootbooks'){
                  title = 'Lookbook'+ (itemsFound.length > 1 ? 's' : '')
                }
                if(postType === 'general_info'){
                  title = 'information'+ (itemsFound.length > 1 ? 's' : '') + ' générale'+ (itemsFound.length > 1 ? 's' : '')
                }
                if(postType === 'collections'){
                  title = 'Collection'+ (itemsFound.length > 1 ? 's' : '')
                }
                

                  return (
                    <SectionSearch 
                    key={uuidv4()}
                    title={title}
                    items={itemsFound}
                    isPortrait={isPortrait}
                    />
                  )
               })


             }
             </div> : <div className={styles.loadingWindows}><p className={styles.notFoundMessage}> Aucun resultat trouvé</p></div>}
          </>
        }

  
    
    </div>
  )
}
