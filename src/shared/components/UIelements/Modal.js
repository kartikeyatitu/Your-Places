//note this modal is used to display the map its made(spliited) in two components overlay and backdrop
import React from 'react'
import './Modal.css'
import {CSSTransition} from 'react-transition-group';
import Backdrop from './Backdrop'
import ReactDOM from 'react-dom'

//this ModelOverlay is the actual one that we will see 
const ModelOverlay = (props) => {

    const content = (

        <div className={`modal ${props.className}`} style={props.style}>
       <header className={`modal__header ${props.headerClass}`}>

  <h2>{props.header}</h2>

       </header>
       <form onSubmit={props.onSubmit ? props.onSubmit : (event)=> event.preventDefault()}>

   <div className={`modal__content ${props.contentClass}`}>

      {props.children};

   </div>
  <footer className={`modal__footer  ${props.footerClass}  ` }>{props.footer}</footer>

       </form>

        </div>


    );

    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
    return (<React.Fragment>
    {props.show&&<Backdrop onClick={props.onCancel}       />}

  <CSSTransition 
  
    in={props.show}
    mountOnEnter
    unmountOnExit
    timeout={200}
    classNames="modal">
    <ModelOverlay {...props}/>
    </CSSTransition>

    </React.Fragment>);






};
export default Modal;

