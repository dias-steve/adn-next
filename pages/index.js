import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Collection1 = ({ collectionData }) => {
  const { id, title, titre_accueil, short_description, image_1_accueil } =
    collectionData;

  return (
    <div className="home-collection-1 content-container">
      <div className="grid-wrapper">
        <div className={"image-container"}>
          <Image src={image_1_accueil.url} layout="fill" className={"image"} />
        </div>

        <h1 className="home-collection-title home-collection-title">
          {titre_accueil}
        </h1>
        <div className="short-description-wrapper">
          <div className="short-description-content">
            <p className="home-collection-short-description">
              {short_description}
            </p>
            <Link href={`/`}>
              <a className="btn-primary"> En savoir plus</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Collection2 = ({ collectionData }) => {
  const { id, title, titre_accueil, short_description, image_1_accueil } =
    collectionData;

  return (
    <div className="home-collection  home-collection-2 content-container">
      <div className="grid-wrapper">
        <div className={"grid-left-container"}>
          <div className={"image-container"}>
            <Image
              src={image_1_accueil.url}
              layout="fill"
              className={"image"}
            />
          </div>
        </div>

        <h1 className="home-collection-title home-collection-title">
          {titre_accueil}
        </h1>
        <div className="short-description-wrapper">
          <div className="short-description-content">
            <p className="home-collection-short-description">
              {short_description}
            </p>
            <Link href={`/`}>
              <a className="btn-primary"> En savoir plus</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Interlude = ({ interludeData }) => {
  return (
    <div className="home-interlude-content">
      <div className="interlude-text-wrapper">
        <div className="text-color-zone" />
        <h2 className="home-interlude">okokk{interludeData}</h2>
      </div>
    </div>
  );
};

const Shootbook = ({ shootbookData }) => {
  const { id, title, decription_shootbook, image_1, image_2, image_3, video } =
    shootbookData;
  return (
    <div className="home-shootbook">
      <div className="left-container">
      <div className={"image-container shootbook-img-3"}>
            <Image src={image_3} layout="fill" className={"image"} />
          </div>
          <div className={"image-container shootbook-img-1"}>
            <Image src={image_1} layout="fill" className={"image"} />
        
        </div>
        
          <div className={"image-container shootbook-img-2"}>
            <Image src={image_2} layout="fill" className={"image"} />
          </div>
        
     
          <div className={"image-container shootbook-img-3"}>
            <Image src={image_3} layout="fill" className={"image"} />
          </div>
       
      </div>
      <div className="right-container">
        <div className="text-wrapper">
          <p>{decription_shootbook}</p>
          <Link href={`/`}>
            <a className="btn-primary"> En savoir plus</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default function Home(props) {
  console.log("data");
  console.log(props.homeData);
  const homeData = props.homeData;
  if (homeData) {
  }
  return (
    <div className="page-home-style-container">
      {homeData ? (
        <>
        
          <div className="global-container">
            <Collection1 collectionData={homeData.collection_1} />
          </div>
          <div style={{ height: "30vh" }} className="space" />
          <div className="global-container">
            <Collection2 collectionData={homeData.collection_2} />
          </div>

          <div style={{ height: "30vh" }} className="space" />
          <div className="global-container">
            <Interlude interludeData={homeData.phrase_intermediaire} />
          </div>
          <div className="global-container">
            <Shootbook shootbookData={homeData.shootbook_1} />
          </div>
        </>
      ) : (
        <p>Chargement</p>
      )}
    </div>
  );
}
export async function getStaticProps() {
  const data = await fetch(process.env.REACT_APP_API_REST_DATA + "/homedata", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const homeData = await data.json();

  return {
    props: {
      homeData,
    },
    revalidate: 60, // rechargement toutes les 10s
  };
}
