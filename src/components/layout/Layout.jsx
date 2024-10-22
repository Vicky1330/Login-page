import { Button } from "@nextui-org/react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import CustomNavbar from "./Navbar";

const Layout = () => {
  return (
    <>
        <CustomNavbar/>
        <div className="">
        <Outlet/>
        </div>
    </>
  );
};

export default Layout;
