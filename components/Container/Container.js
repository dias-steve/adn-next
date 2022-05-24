import React from "react";

import Header from "./../Header";
import Footer from "../Footer";
export default function Container({ children }) {
  return (
    <div className="globla-wrapper">
      <Header />
      {children}
      <Footer/>
    </div>
  );
}
