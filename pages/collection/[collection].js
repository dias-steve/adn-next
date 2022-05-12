import React from 'react'
import Image from "next/image";
import Arrowdown from "../../public/arrow-down.svg"
import ProductList from '../../components/ProductList';

const CollectionIntro = ({collectionIntroData}) => {
  const {image_principale, description_detaille,introduction} = collectionIntroData
  return (
    <div className="page-collection-introduction content-container">
    <div className="left-container">
      <div className="collection-intro-img-wrapper">
      <Image src={image_principale} layout="fill" className={"image"} />
      </div>
      <h1 className='title-collection'>{introduction}</h1>
    </div>
    <div className="right-container">
      <h2 className="description-detail">
        {description_detaille}
      </h2>
      <a className='button-down' href="">
        <div className=" arrow-img-wrapper">
          <Image src={Arrowdown} layout="fill" className={"image"} />
        </div>
      </a>
    </div>
  
  </div>
  )
}
export default function collection(props) {
  const collectionData = props.collection;

  console.log('[INFO] Collection Data');
  console.log(collectionData);



  return (
    <div className="page-collection-style-container">
      <div className="global-container">
        <CollectionIntro collectionIntroData={collectionData}/>
      </div>
      <div className="global-container">
        <ProductList productsListData={collectionData.productlist}/>
      </div>

    </div>
  )
}
export async function getStaticProps(context) {
  const id = context.params.collection;

  const data = await fetch(
    `https://otgbac.ovh/wp-json/adn/v1/collections/${id}`)
  const collection = await data.json();

  return {
    props: {
      collection
    },
  };
}

export async function getStaticPaths() {

  const data = await fetch("https://otgbac.ovh/wp-json/adn/v1/collections");

  const collections = await data.json();
  
  // on dit le chemin pour chaque articles
  const paths = collections.map(item => ({
    params: { collection: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  }
}