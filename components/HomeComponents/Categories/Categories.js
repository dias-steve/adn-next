import React, { useConext, useRef, useEffect, useState } from "react";
import styles from "./Categorie.module.scss";
import Image from "next/image";

const Categories = ({ imageCollectionUrl, imageShootbookUrl }) => {
    return (
      <div className={styles.homeCategories}>
        <div className={[styles.subContainer ].join(" ")}>
          <h1 className={styles.title}>Catégories</h1>
          <div className={styles.imageContainer }>
            <Image src={imageCollectionUrl.url} alt={imageCollectionUrl.alt} layout="fill" className={styles.image} />
          </div>
        </div>
        <div className={styles.subContainer}>
          <h1 className={styles.title}>Shootbooks</h1>
          <div className={styles.imageContainer }>
            <Image src={imageShootbookUrl.url} alt={imageShootbookUrl.alt} layout="fill" className={styles.image}  />
          </div>
        </div>
      </div>
    );
  };

export default Categories;