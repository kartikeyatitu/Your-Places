import React, { useState } from 'react';//useState is used to manipulate the state whether the drawer is openend or not
import './MainNavigation.css'
import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import Sidedrawer from './Sidedrawer'
import {Link} from 'react-router-dom'
import Backdrop from '../UIelements/Backdrop'
const MainNavigation = (props) => {

    const [draweropen,setdraweropen]=useState(false);
    const openDrawer=()=>{
        setdraweropen(true);
    }
    const closeDrawer=()=>{
       setdraweropen(false);
    }
    return (
        <React.Fragment>
        {draweropen && <Backdrop onClick={closeDrawer}/>}
           <Sidedrawer show={draweropen} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />

                </nav>
            </Sidedrawer> 
        
            <MainHeader>

                <button className="main-navigation__menu-btn" onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title"><Link to="/">Your Places</Link> </h1>
                <nav className='main-navigation__header-nav'><NavLinks /></nav>
            </MainHeader>
        </React.Fragment>
    )

};
export default MainNavigation;