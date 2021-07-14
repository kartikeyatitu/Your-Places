
import React, { useCallback,useReducer } from "react";
const formReducer= (state,action)=>{

    switch(action.type)
    {
        case 'INPUT_CHANGE':
            let formisValid=true;
            for(const inputId  in state.inputs)
            { 
                if(!state.inputs[inputId])
                {
                    continue;
                }
                if(inputId===action.inputId)
                {
                    formisValid=formisValid && action.isValid
                }else{
 
                 formisValid=formisValid && state.inputs[inputId].isValid
 
                 
                }
            } 
            
           return{
 
 
             ...state,
             inputs:{
 
              ...state.inputs,
              
               [action.inputId]:{value:action.value,isValid:action.isValid}
 
             },
             isValid:formisValid
           }
           case 'SET_DATA':
                return{
                  
                 inputs:action.inputs,
                  isValid:action.formisValid



                }
         
        default:
          return state
    }
 
 
 }
export const useForm=(inititalInputs,initialFormValidity)=>{

    const [formState,dispatch]=  useReducer(formReducer,{
      
        inputs:inititalInputs,
        isValid:initialFormValidity,
      

    });
    const InputHandler = useCallback((id, value, isValid) => {

        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id })
    
    
    
      }, []);
      const setFormData=useCallback((inputData,formValidity)=>{

        dispatch({
   
            type:"SET_DATA",
            inputs:inputData,
            formisValid:formValidity

             
        })



      },[]);


  return [formState,InputHandler,setFormData];


}
