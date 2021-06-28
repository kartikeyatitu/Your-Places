import React,{useContext, useState} from 'react'
import './Auth.css'
import Card from '../../shared/components/UIelements/Card'
import Input  from '../../shared/components/FormComponents/Input'
import Button from '../../shared/components/FormComponents/Button'
import {VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from '../../shared/Util/Validators'
import { AuthContext } from '../../shared/context/Auth-context'
import { useForm } from '../../shared/Hooks/form-hook'
const Auth = () => {
    const auth=useContext(AuthContext);
 const [isLoginMode,setisLoginMode]=useState(true);   
const [formState,InputHandler,setFormData]=useForm({

   email:{
    value:'',
    isValid:false

   },
   password:{
     value:'',
     isValid:false

   }
  




})
const authSubmitHandler=(event)=>{
    event.preventDefault();
    auth.login();
    console.log(formState.inputs)



}
const switchmodeHandler=()=>{
    //here we set the form data in case we are switching from signupmode to login mode 
    if(!isLoginMode)
    {
        
         setFormData({...formState.inputs,name:undefined},formState.inputs.email.isValid && formState.inputs.password.isValid);
    }
    else
    {
        //now moving to signup mode,validity will be false as we just added the name input field

        setFormData({

              ...formState.inputs,
              name : {
                  value:'',
                  isValid:false
              }


        },false)

    }

    setisLoginMode(prevMode => !prevMode);
}
 //note point--> There is a mistake here as we the new input element which we have added in the signup form and  login firm do not behave well and the overall form validity plays an abnormal role here 

    return <Card className="authentication">
        <h2> Login Required  </h2>
        <hr />


        <form onSubmit={authSubmitHandler}>  
         {!isLoginMode && <Input element='input' id="name" type="text" label=" Your Name"  validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name" onInput={InputHandler} />}
         <Input element="input" id="email" type="email" label="E-Mail" validators={[VALIDATOR_EMAIL()]} errorText="Please enter a valid email address"  onInput={InputHandler}/>
         <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid password"  onInput={InputHandler}/>
          <Button type="Submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
         </form>

         <Button inverse onClick={switchmodeHandler}> Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'} </Button>


    </Card>


}
export default Auth;

