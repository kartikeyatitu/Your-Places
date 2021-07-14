import React, { useContext, useState } from 'react'
import './Auth.css'
import Card from '../../shared/components/UIelements/Card'
import Input from '../../shared/components/FormComponents/Input'
import Button from '../../shared/components/FormComponents/Button'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/Validators'
import { AuthContext } from '../../shared/context/Auth-context'
import { useForm } from '../../shared/Hooks/form-hook'
import ErrorModal from '../../shared/components/UIelements/ErrorModal'
import { useHttpClient} from '../../shared/Hooks/http-hooks'
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner'
import ImageUpload from '../../shared/components/FormComponents/ImageUpload'
const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setisLoginMode] = useState(true);
    const {isloading,error,sendRequest,ClearError}=useHttpClient();
    const [formState, InputHandler, setFormData] = useForm({

        email: {
            value: '',
            isValid: false

        },
        password: {
            value: '',
            isValid: false

        }





    })
    const authSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formState.inputs);

        //and we want to send request to login or signup according to the situation note abhi tak postman use krree the now frontend se bhejengay
        //will need the api url which points at backend
        if (isLoginMode) {
      
    
              try{
               const responseData= await sendRequest('http://localhost:5008/api/users/login', 
                'POST',
                 JSON.stringify({
                    
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                    {
                        'Content-Type': 'application/json'

                    },
                    

                );
                auth.login(responseData.user.id);
              }catch(err)
              {


              }
             

             
           




        }
        else {
            try {
              //for sending image files as images are binary files so we canot send it in json format and multer at our backend does not support json its supports multipart formadata
              //we can send both plain json data and multipart formdata using append; 
               const formdata= new FormData();
               formdata.append('name',formState.inputs.name.value);
               formdata.append('email',formState.inputs.email.value)
               formdata.append('password',formState.inputs.password.value)
               formdata.append('image',formState.inputs.image.value)
               const responseData= await sendRequest('http://localhost:5008/api/users/signup',  'POST',
                    //note the fecth appi automatically adds the right headers for this 
                    formdata
                );
               
                auth.login(responseData.user.id);
            } catch (err) {

              

            }



        }
        

      




    };
    const switchmodeHandler = () => {
        //here we set the form data in case we are switching from signupmode to login mode 
        if (!isLoginMode) {

            setFormData({ ...formState.inputs, name: undefined,image:undefined}, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else {
            //now moving to signup mode,validity will be false as we just added the name input field

            setFormData({

                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image:{
                    velue:null,
                    isValid:false
                }


            }, false)

        }

        setisLoginMode(prevMode => !prevMode);
    }
    //note point--> There is a mistake here as we the new input element which we have added in the signup form and  login firm do not behave well and the overall form validity plays an abnormal role here 
    // if we have a 400 or 500 error response then also it will sign in as it was happening  
 const errorHandler = ()=>{

     ClearError();

 };

  return (<React.Fragment>
          <ErrorModal error={error} onClear={ClearError}/>
        <Card className="authentication">
        {isloading && <LoadingSpinner asOverlay/>}
        <h2> Login Required  </h2>
        <hr />


        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && <Input element='input' id="name" type="text" label=" Your Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name" onInput={InputHandler} />}
            {!isLoginMode && <ImageUpload   center id="image" onInput={InputHandler} errorText="Please provide an Image"/>}
            <Input element="input" id="email" type="email" label="E-Mail" validators={[VALIDATOR_EMAIL()]} errorText="Please enter a valid email address" onInput={InputHandler} />
            <Input element="input" id="password" type="password" label="Password" validators={[VALIDATOR_MINLENGTH(6)]} errorText="Please enter a valid password" onInput={InputHandler} />
            <Button type="Submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
        </form>

        <Button inverse onClick={switchmodeHandler}> Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'} </Button>


    </Card>
    </React.Fragment>
  );
}
export default Auth;

