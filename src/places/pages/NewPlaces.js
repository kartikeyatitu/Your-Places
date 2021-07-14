import React, { useCallback , useReducer , useRef ,  useContext } from 'react'
//for new places we need to create a form which will be taking the data and adding it to the new places.but for now we will not be adding the data to our new places as there is no bakend
//Note Not just like  normal inputs in form we will create a a input component which will have a validation also meaning in which the component will hav a an aray of predefined validation rules{validators here};
import Input from '../../shared/components/FormComponents/Input'
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators'
import './NewPlaces.css'
import { useForm } from '../../shared//Hooks/form-hook.js'
import Button from '../../shared/components/FormComponents/Button'
import { useHttpClient} from '../../shared/Hooks/http-hooks'
import ErrorModal from '../../shared/components/UIelements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'
import {AuthContext} from '../../shared/context/Auth-context'
import ImageUpload from '../../shared/components/FormComponents/ImageUpload'
import Auth from '../../user/pages/Auth'
import { useHistory } from 'react-router-dom'

const NewPlaces = () => {
 
   const {isloading,error,sendRequest,ClearError}=useHttpClient();
   const auth=useContext(AuthContext);

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


    },
    image:{
      value:null,
      isValid:false
    }
  }, false);


  
   const history=useHistory();
//this history object has a push and a replace method
  const placeSubmitHandler =  async(event) => {
    //SEND DATA TO SERVER
     event.preventDefault();
     try{ 

      const formData= new FormData();
      formData.append('title',formState.inputs.title.value);
      formData.append('description',formState.inputs.description.value);
      formData.append('address',formState.inputs.Address.value);
      formData.append('creator',auth.userId);
      formData.append('image',formState.inputs.image.value);
      await sendRequest('http://localhost:5008/api/places',  'POST',  formData);
   
     
   

     history.push('/')
}catch(err)
{

}
  
  };
  /*const descrptionInputHandler = useCallback((id,value,isValid) => {
  
  
  },[]);
  */

  return (<React.Fragment>
    <ErrorModal error={error} onClear={ClearError}  />
    
    <form  
  
   className="place-form" onSubmit={placeSubmitHandler}>
    {isloading && <LoadingSpinner asOverlay/>}

    <Input id="title" element="input" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid titile" onInput={InputHandler} />
    <Input id="description" element="textarea" label="description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description" onInput={InputHandler} />
    <Input id="Address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid Address" onInput={InputHandler} />
    <ImageUpload id="image" onInput={InputHandler} errorText="Please provide an Image" />
    <Button type="submit" disabled={!formState.isValid}>Add Place</Button>

  </form>
  </React.Fragment>
  );
}
export default NewPlaces;