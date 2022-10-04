import React from 'react'
import BlocImageCercleTitre from './BlocImageCercleTitre/BlocImageCercleTitre'
import styles from './Bloc.module.scss';
import Bloc3Column from './Bloc3Column/Bloc3Column';

export default function Bloc({data, type}) {

    switch(type){
        case 'Image-cercle-titre':
          return  <BlocImageCercleTitre data={data} />
        case '3-colonnes':
          return  <Bloc3Column data={data} />
        case 'image-grande-titre':
            return  <p> image-grande-titre</p>
        case 'graphique-paragraphe':
          return <p> graphique-paragraphe</p>
       default:
        return <p>Null</p>
       }

}
