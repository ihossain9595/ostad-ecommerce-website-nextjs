import React from "react";
import AppNavBar from "./AppNavBar";
import Footer from "./Footer";

const Master = ({ children }) => {
  return (
    <>
      <AppNavBar />
      {children}
      <Footer />
    </>
  );
};

export default Master;
