import React from "react";

import Header from "./../Header";
import Footer from "../Footer/Footer";
import ModalPopUp from "../modalPopUp/modalPopUp";
import { useDispatch, useSelector } from "react-redux";
import MaintenancePage from "../MaintenancePage/MaintenancePage";
import Preloader from "../Preloader/Preloader";
import PopUpToast from "../PopUpToast/PopUpToast";

const mapState = (state) => ({
  auth: state.auth.auth,
});

const DEFAULT_RGPD_POPUP = {
  title: "Politique de cookies",
  description: "les cookies ",
  link: "/page/3"
}
export default function Container(props) {
  const { auth } = useSelector(mapState)
  const generalSettings= props.children.props.generalSettings;
  const maintenanceMode = generalSettings ? generalSettings.maintenance_mode : false;
  const rgpdData = generalSettings ? generalSettings.rgpd_pop_up_data : DEFAULT_RGPD_POPUP;

  const isAccessFront = () => {
    if(auth.is_auth){
      return true;
    }else{
      if(!maintenanceMode.is_activated){
        return true
      }else{
        return false
      }
    }
  }
  return (
    <div className="globla-wrapper">
      
    
      { isAccessFront()  ?
 

 <>
 <Header />
 <ModalPopUp />
 <PopUpToast 
  title={rgpdData.title}
  description={rgpdData.description}
  primaryBtnData = {{
    label: 'OK',
  }}
  secondBtnData = {{
    label: 'En savoir plus',
    link: rgpdData.link
  }
  }

 />
 <Preloader/>
 {props.children}
 <Footer/>
 </>:
        <> <Preloader black = {false}/>
        <MaintenancePage maintenanceData={maintenanceMode} />
        </>
    
      }
    </div>
  );
}

