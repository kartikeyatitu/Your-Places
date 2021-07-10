import React, { useCallback, useReducer, useRef } from 'react'
//for new places we need to create a form which will be taking the data and adding it to the new places.but for now we will not be adding the data to our new places as there is no bakend
//Note Not just like  normal inputs in form we will create a a input component which will have a validation also meaning in which the component will hav a an aray of predefined validation rules{validators here};
import Input from '../../shared/components/FormComponents/Input'
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators'
import './NewPlaces.css'
import { useForm } from '../../shared//Hooks/form-hook.js'
import Button from '../../shared/components/FormComponents/Button'

const NewPlaces = () => {

 const [formState,InputHandler] =useForm({

    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    Address: {

      value: '',
      isValid: false


    }
  }, false);


  


  const placeSubmitHandler = (event) => {
    //SEND DATA TO SERVER
    event.preventDefault();
    console.log(formState.inputs);

  };
  /*const descrptionInputHandler = useCallback((id,value,isValid) => {
  
  
  },[]);
  */

  return <form  
  
  className="place-form" onSubmit={placeSubmitHandler}>

    <Input id="title" element="input" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid titile" onInput={InputHandler} />
    <Input id="description" element="textarea" label="description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description" onInput={InputHandler} />
    <Input id="Address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid Address" onInput={InputHandler} />

    <Button type="submit" disabled={!formState.isValid}>Add Place</Button>

  </form>
}
export default NewPlaces;