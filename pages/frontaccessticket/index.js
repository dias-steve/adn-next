import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss"
import Spinner from '../../components/spin/spinner';
import { setAuth } from '../../redux/AuthMaintenance/authMaintenance.actions';


const mapState = (state) => ({
  auth: state.auth.auth,
 
});
export default function MaintenanceAccess() {


  const dispatch = useDispatch()
  const {auth} = useSelector(mapState)
  const [id, setId] = useState("");
  const [mdp,setMdp]= useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({is_error: false, message: ""});
  const connected = false;
  
  console.log(auth.is_auth)
  const handleChangeId = (e) => {
    setId(e.target.value)
  }
  const handleChangeMDP = (e) => {
    setMdp(e.target.value)
  }
  const handleSubmit =  () => {

    if(id!=='' && mdp !==''){
     
      //envoie
      setIsLoading(true);
      Send()

  }
}
const handleDisconnect = () => {
  dispatch(
    setAuth({
      is_auth: false,
      token: null
  })
  )
}
  
  const bodyToSend= {
    user: id,
    mdp: mdp
  }
  const Send = async () => {
    const results = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/frontaccessauth", {
      // Adding method type
      method: "POST",
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(bodyToSend)
    })
    .then((response) => response.json())
    .then((response) => 
    {
      if(response.is_auth){
        setIsLoading(false);

        dispatch(
          setAuth(response)
        )
        setError({
          is_error: false, message: ""
        })
       
      }else{
        setIsLoading(false);
        setError({
          is_error: true, message: "Aucun ticket de cet id et mdp"
        })
      }

    })

   .catch((err)=> {
        return {error: true, message: err.message}
      
      });

 
    
  
  }

  return (
    <div className="global-container">
      <div className='content-container'>
        <div className= {styles.formContainer}>
        <form>
          {!isLoading ?
          <>
          {!auth.is_auth ?
            <>
              <h1>Front Access Ticket</h1>
              <span className= {styles.errorMessage}>{error.message}</span>
              <label>Id-ticket</label>
              <input  onChange={(e) => {handleChangeId(e)}}  type = 'text' placeholder='Entrez votre id'/>
              <label>MDP-ticket</label>
              <input  onChange={(e) => {handleChangeMDP(e)}}type = 'password'  placeholder='Entrez votre mdp'/>
              <button onClick= {(e) => {handleSubmit(); e.preventDefault();}}type='submit'> Se connecter </button>
            </>: 
            <> <p>Vous êtes connecté</p>
            <button className={styles.disconnect} onClick= {(e) => {handleDisconnect(); e.preventDefault();}}> Se déconnecter </button>
            </>
          }</>: <Spinner/>}
        </form>
        </div>
      </div>

      </div>
  )
}

export async function getStaticProps(context) {



  const menuRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/menu", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const menuData= await menuRaw.json()

  const generalSettingsRaw = await fetch(process.env.NEXT_PUBLIC_REACT_APP_API_REST_DATA + "/generalSettings", {
    // Adding method type
    method: "GET",

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const generalSettingsOn = await generalSettingsRaw.json();
  const generalSettings = {...generalSettingsOn,maintenance_mode:{"is_activated": false} }
  return {
    props: {

      menuData,
      key: uuidv4(),
      generalSettings
    },
    revalidate: 60,
    
  };
}
