import React from 'react';
import styles from './PopUpToast.module.scss';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setIsAccepted } from '../../redux/RGPD/rgpd.actions';


const mapState = (state) => ({
  rgpd: state.rgpd,
});
export default function PopUpToast ({title, description, primaryBtnData, secondBtnData }) {

  const {rgpd } = useSelector(mapState);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      setIsAccepted(true)
    )
  }
  return (
    <>
    {!rgpd.is_accepted && 
    <div className={styles.global_container}>
    
        <h2>{title}</h2>
        <p> {description}</p>
        {secondBtnData &&
          <Link href={secondBtnData.link}>
          <a>
            <button className={styles.second_btn}> {secondBtnData.label} </button>
          </a>
          </Link>
        }
        { primaryBtnData &&
        <button className={styles.primary_btn} onClick = {(e) => handleClick(e)}> {primaryBtnData.label} </button>
        }


    </div>
    }
    </>
  )
}
