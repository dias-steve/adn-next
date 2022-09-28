import React from 'react'
import BlocImageCercleTitre from './BlocImageCercleTitre/BlocImageCercleTitre'
import styles from './Bloc.module.scss';

export default function Bloc({data, type}) {

    switch(type){
        case 'Image-cercle-titre':
          return  <BlocImageCercleTitre data={data} />
        case 'Image-pillule-description':
          return  <p> Image-pillule-description</p>
        case 'image-grande-titre':
            return  <p> image-grande-titre</p>
        case 'graphique-paragraphe':
          return <p> graphique-paragraphe</p>
       default:
        return <p>Null</p>
       }

}
