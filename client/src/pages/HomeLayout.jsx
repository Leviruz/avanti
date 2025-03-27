import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "../app.css";
import { ToastContainer } from "react-toastify";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default HomeLayout;
