import React from 'react'
import { v4 as uuidv4 } from "uuid";
import Bloc from './Bloc/Bloc';
import styles from './AproposContentBloc.module.scss';



export default function AproposContentBloc({contentList}) {
  
  return (
    <div className={styles.global}>
      {contentList.map(bloc => (
        <div key={uuidv4()}>
          <Bloc type={bloc.type_section} data={bloc}/>
        </div>
      ))}
    </div>
  )
}
