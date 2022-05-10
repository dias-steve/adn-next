import React from 'react'

export default function collection(props) {
  const collectionData = props.collection
  console.log('[INFO] Collection Data');
  console.log(collectionData);
  return (
    <div className="page-collection-style-container">
      <div className="global-container">
        <h1 className='title-collection'>{collectionData.title}</h1>
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