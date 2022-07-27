import React from "react";

import Header from "./../Header";
import Footer from "../Footer/Footer";
import ModalPopUp from "../modalPopUp/modalPopUp";
import { useDispatch, useSelector } from "react-redux";
import MaintenancePage from "../MaintenancePage/MaintenancePage";

const mapState = (state) => ({
  auth: state.auth.auth,
});
export default function Container(props) {
  const { auth } = useSelector(mapState)
  const generalSettings= props.children.props.generalSettings;
  const maintenanceMode = generalSettings ? generalSettings.maintenance_mode : false;

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
 {props.children}
 <Footer/>
 </>:

        <MaintenancePage maintenanceData={maintenanceMode} />
     
    
      }
    </div>
  );
}

