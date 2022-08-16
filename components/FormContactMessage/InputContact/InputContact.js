import React, {useState} from 'react';
import styles from './InputContact.module.scss';

export default function InputContact( {onChange, value, name, textarea, ...otherProps}) {

const [onFocus, setOnFocus] = useState(false);
const upName = onFocus || value != "" ? true : false;

  return (

    
    <div className={[styles.inputGroup, textarea ? styles.textarea: styles.notTextarea].join(" ")}>
        <label className={[styles.label, upName ? styles.upLabel : styles.notUpLabel, onFocus ? styles.onFocus : styles.NotFocus].join(" ")}>{name}</label>
          
          {textarea ?
            <textarea className={[styles.input].join(" ")} rows={textarea.rows} cols={textarea.cols}

            placeholder=""
            name="message"
           
            onFocus={() => {setOnFocus(true);}} 
            onBlur={() => {setOnFocus(false);}}
            value={value}
            onChange={(event) =>  onChange(event.target.value)}
            /> :
          <input
            { ...otherProps}
       
            placeholder=""
            name="name"
            className={styles.input}
            onFocus={() => {setOnFocus(true);}} 
            onBlur={() => {setOnFocus(false);}}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        }
    </div>
  )
}
