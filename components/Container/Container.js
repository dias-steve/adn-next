import React from "react";

import Header from "./../Header";
import Footer from "../Footer";
import ModalPopUp from "../modalPopUp/modalPopUp";
import { useDispatch, useSelector } from "react-redux";

export default function Container(props) {
  console.log( props.children.props.generalSettings)
  const generalSettings= props.children.props.generalSettings;
  const maintenanceMode = generalSettings ? generalSettings.maintenance_mode : false;

  return (
    <div className="globla-wrapper">
      { !maintenanceMode.is_activated ?
      <>
      <Header />
      <ModalPopUp />
      {props.children}
      <Footer/>
      </> : <p>en_maintenance </p>
      }
    </div>
  );
}

