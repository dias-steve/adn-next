import React from 'react'

export default function Bloc({data, type}) {

    switch(type){
        case 'Image-cercle-titre':
          return  <p> image cercle titre</p>
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
