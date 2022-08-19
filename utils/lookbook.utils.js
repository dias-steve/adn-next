export const createImageTableCaroussel = (media_list) => {
    const images = media_list
    .filter(item => (item.type_media === 'image'))
    .map(item => (item.image));
  
    const lengtharray = 8;
    let nbImageOnTable= 0;
    let currentImage= 0;
  
    const imageTable = []
  
    while(nbImageOnTable <lengtharray){
      if (currentImage < images.length){
        imageTable.push(images[currentImage]);
        nbImageOnTable++
        currentImage++
      }else{
        currentImage=0
        imageTable.push(images[currentImage]);
        nbImageOnTable++
        currentImage++
  
      }
    }
    return imageTable;
  }