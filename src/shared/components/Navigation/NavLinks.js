import React from 'react';
import './NavLinks.css'
import { NavLink } from 'react-router-dom'
//Navlink are special type of Link which has a special feature of activeClass  so wen u click on the link it get bolded or the css u have applied

const NavLinks = (props) => {

    return <ul className="nav-links">
        <li>
         <NavLink to="/" exact>All Users</NavLink>
        </li>
        <li>
         <NavLink to="/u1/places">My Places</NavLink>
        </li>
        <li>
         <NavLink to="/places/new">Add Places</NavLink>
        </li>
        <li>
         <NavLink to="/auth">Authenticate</NavLink>
        </li>

    </ul>

};
export default NavLinks;