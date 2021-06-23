import React from 'react';
import './Sidedrawer.css'
import ReactDOM from 'react-dom'
import {CSSTransition} from 'react-transition-group' //this is a component prvided by a third party library react-transition-group
//note in css transition we have classNames not className
const Sidedrawer =(props)=>{
    //add animations and aside tag
    const content= 
    <CSSTransition in={props.show} timeout={200} classNames="slide-in-left"  mountOnEnter unmountOnExit>
      <aside className="side-drawer" onClick={props.onClick}>{props.children}
      </aside> 
    </CSSTransition>
    return  ReactDOM.createPortal(content ,document.getElementById('drawer-root'));

};
export default Sidedrawer