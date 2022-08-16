import React from "react";

import Header from "./../Header";
import Footer from "../Footer/Footer";
import ModalPopUp from "../modalPopUp/modalPopUp";
import { useDispatch, useSelector } from "react-redux";
import MaintenancePage from "../MaintenancePage/MaintenancePage";
import Preloader from "../Preloader/Preloader";

const mapState = (state) => ({
  auth: state.auth.auth,
});
export default function Container(props) {
  const { auth } = useSelector(mapState)
  const generalSettings= props.children.props.generalSettings;
  const maintenanceMode = generalSettings ? generalSettings.maintenance_mode : false;
  console.log(props.children.props)
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

