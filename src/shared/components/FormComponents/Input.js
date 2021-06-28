//Complex Component...;
//Note we can also use 3rd party library  like formik but here we built it from scratch
//using usereducers instd of usestate because taking the input and validatingg the form are the two states which we will have and also we will have more complex react logic and calculations  and both the states are dependent on each other
//usereducer can also  have a second argument which is optional and which is basically the initial state 
import React, { useReducer, useEffect, useRef, forwardRef } from 'react';
import './Input.css'
import { validate } from '../../Util/Validators'
const InputReducer = (state, action) => {
    //in this function we always have to return a new state.

    switch (action.type) {

        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'Touch':
            return {

                ...state,
                isTouched: true


            }
        default:
            return state;

    }
};

const Input = (props) => {

    const [inputState, dispatch] = useReducer(InputReducer, { value: props.initialvalue || " ", isValid: props.initialvalid || false, isTouched: false });

    const { id, onInput } = props;
    const { value, isValid } = inputState;


    useEffect(() => {
        onInput(id, value, isValid)

    }, [id, onInput, value, isValid]);

    const touchHandler = () => {

        dispatch({ type: "Touch" });
    }

    const changeHandler = event => {

        dispatch({ type: "CHANGE", val: event.target.value, validators: props.validators });


    };

    const element = props.element === 'input' ? (<input id={props.id} type={props.type} placeholder={props.placeholder}
        onChange={changeHandler} value={inputState.value} onBlur={touchHandler} />) : (


        <textarea id={props.id} rows={props.rows || 3} onBlur={touchHandler} onChange={changeHandler} value={inputState.value} />

    )




    //below is the code for  but in our update form we dont reflect the inital default content of the  form as it is not reflected 

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>

            <label htmlFor={props.id}>{props.label}</label>

            {element}
            {!inputState.isValid && inputState.isTouched && <p> {props.errorText}  </p>}
        </div>

    );
}

export default Input;