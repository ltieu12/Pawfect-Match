import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="mx-10 flex items-center justify-between p-4 bg-white">
            <div className="text-2xl font-bold">Pawfect Match</div>
            <div className="hidden md:flex space-x-7">
                <NavLink to='/' className="pt-1 font-semibold hover:underline hover:text-primary active:text-primary">Dogs</NavLink>
                <NavLink to='/cat' className= "pt-1 font-semibold hover:underline hover:text-primary active:text-primary">Cats</NavLink>
                <NavLink to='/others' className="pt-1 font-semibold hover:underline hover:text-primary active:text-primary">Others</NavLink>
            </div>
        </nav>
    );
}

export default NavBar;