import React from 'react';
import { v4 as uuidv4 } from "uuid";
import styles from './Bloc3Column.module.scss';

const Column = ({dataColumn}) => {
    const {title, description} = dataColumn;
    return (<div className={styles.column_container}>
        <h2 className={styles.title}>{title}</h2>
        <div className= {styles.description} dangerouslySetInnerHTML={{__html:description}}/>
    </div>)
}
export default function Bloc3Column({data}) {
    const {columns} = data;
    
  return (
    <div className={styles.global_column}>
    {Array.isArray(columns)&&
        <div className={styles.column_wrapper}>
            {columns.map(column => (
                <Column key={uuidv4()} dataColumn={column}/>
            ))}

        </div>
    }
    </div>
  )
}