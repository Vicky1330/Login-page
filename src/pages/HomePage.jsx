import { Button } from "@nextui-org/react";
import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
        <div className="min-h-screen">
            <div className="flex justify-center items-center p-5 pt-10">
                <h1 className="font-bold text-7xl">Welcome </h1>
            </div>
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
    </>
  );
};

export default HomePage;
