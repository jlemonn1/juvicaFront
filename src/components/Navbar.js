import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/imgBranding/logo.jpg";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <NavLink to="/" ><img src={Logo} alt="Logo Juvica" /></NavLink>
            </div>
            <div className="nav-links">
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                <NavLink to="/categorias" activeClassName="active">Categorías</NavLink>
                <NavLink to="/about" activeClassName="active">About</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
