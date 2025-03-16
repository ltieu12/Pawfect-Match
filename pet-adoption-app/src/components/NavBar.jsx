import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="mx-10 flex items-center justify-between p-4">
            <div className="text-2xl font-bold">Pawfect Match</div>
            <div className="flex space-x-7">
                <NavLink to='/' className="pt-1 font-semibold hover:underline">Dogs</NavLink>
                <NavLink to='/cat' className= "pt-1 font-semibold hover:underline">Cats</NavLink>
                <NavLink to='/others' className="pt-1 font-semibold hover:underline">Others</NavLink>
            </div>
        </nav>
    );
}

export default NavBar;