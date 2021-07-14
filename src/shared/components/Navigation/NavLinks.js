import React,{useContext,Fragment} from 'react';
import './NavLinks.css'
import { AuthContext } from '../../context/Auth-context';
import { NavLink } from 'react-router-dom'

import { useForm } from '../../Hooks/form-hook';
//Navlink are special type of Link which has a special feature of activeClass  so wen u click on the link it get bolded or the css u have applied

const NavLinks = (props) => {

     const Auth=useContext(AuthContext);
    return <ul className="nav-links">
        <li>
         <NavLink to="/" exact>All Users</NavLink>
        </li>
       {Auth.isLoggedIn &&  <li>
         <NavLink to={`/${Auth.userId}/places`}>My Places</NavLink>
        </li> }
       {Auth.isLoggedIn &&  <li>
         <NavLink to="/places/new">Add Places</NavLink>
        </li>}
        
        {!Auth.isLoggedIn&&    <li>
         <NavLink to="/auth">Authenticate</NavLink>
        </li>}
          
        {Auth.isLoggedIn&&    <li>
         <button onClick={Auth.logout}>LogOut</button>
        </li>}

    </ul>
    

 
      
   

};
export default NavLinks;
