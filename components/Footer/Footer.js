import React from 'react'

import styles from './Footer.module.scss';
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const mapState = (state) => ({
    footer_list: state.menu.footer_list
})

export const FooterSection = ({name, childrens}) => {
    return (
        <div className={styles.footerSection}>
            <h2 className={styles.titleFooterSection}>{name}</h2>
            <ul>
                {childrens.map(child =>{
                    const is_external_link = child.link.startsWith("http");
                    if(is_external_link){
                        return(
                            <li key={uuidv4()}>
                                <Link href={child.link} passHref>
                                    < a target="_blank" rel="noopener noreferrer">
                                        <h3 className={styles.titleLink}>{child.name}</h3>
                                    </a>
                                </Link>
                            </li>)
                    }else{
                        return(
                            <li key={uuidv4()}>
                                <Link href={child.link} >
                                    < a >
                                        <h3 className={styles.titleLink}>{child.name}</h3>
                                    </a>
                                </Link>
                            </li>)
                    }

                }
                )}
            </ul>
        </div>
    )
}
export default function Footer() {
    let now = new Date();
    const {footer_list} = useSelector(mapState)

  return (
    <div className='global-container'>
  
            <div className='content-container'>
      
            <div className={styles.footerSectionsContainer}>
                {footer_list.map(section => (
                    <FooterSection key={uuidv4()} name={section.name} childrens={section.childrens} />
                ))}
            </div>
     
            <div className={styles.copyrightWrapper}>
                <span>Tous droits réservés © UNADN {now.getFullYear()}</span>
            </div>
            </div>
          

    </div>
  )
}
