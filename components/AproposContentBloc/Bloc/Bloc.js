import React from 'react'
import BlocImageCercleTitre from './BlocImageCercleTitre/BlocImageCercleTitre'
import styles from './Bloc.module.scss';
import Bloc3Column from './Bloc3Column/Bloc3Column';
import BlocGraphiqueDescription from './BlocGraphiqueDescription/BlocGraphiqueDescription';
import BlocGrilleImagesTextes from './BlocGrilleImagesTextes/BlocGrilleImagesTextes';

export default function Bloc({data, type}) {

    switch(type){
        case 'Image-cercle-titre':
          return  <BlocImageCercleTitre data={data} />
        case '3-colonnes':
          return  <Bloc3Column data={data} />
        case 'grille-images-textes':
            return  <BlocGrilleImagesTextes data={data} />
        case 'graphique-paragraphe':
          return <BlocGraphiqueDescription data={data} />
       default:
        return <p>Null</p>
       }

}
