import { Button } from "@nextui-org/react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
        <div className="min-h-screen">

            <nav>
                <ul className="flex justify-center gap-4 p-2">
                <li>
                    <NavLink to="/login">
                    <Button color="default" variant="shadow">
                        Login
                    </Button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register">
                    <Button color="default" variant="shadow">
                        Register
                    </Button>
                    </NavLink>
                </li>
                </ul>
            </nav>

        </div>
        <Outlet/>
    </>
  );
};

export default Layout;
