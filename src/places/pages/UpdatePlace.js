import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router';
import Input from '../../shared/components/FormComponents/Input';
import Button from '../../shared/components/FormComponents/Button';
import Card from '../../shared/components/UIelements/Card'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/Util/Validators';
import { useForm } from '../../shared/Hooks/form-hook';
import  './UpdatePlace';
//for editing the places updating title or description of a place
const DUMMY_PLACES = [{

    id: "p1",
    title: "empire state building",
    description: "best skyscraper",
    imageUrl: "https://mma.prnewswire.com/media/1500294/Empire_State_Building_90th_Anniversary.jpg?w=950",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {

        /*lat:40.7484405,
        lng:-73.9862116,*/
        lat: 28.7041,
        lng: 77.1025,
    },
    creator: "u1"



},

{

    id: "p2",
    title: "emp. state building",
    description: "best skyscraper",
    imageUrl: "https://mma.prnewswire.com/media/1500294/Empire_State_Building_90th_Anniversary.jpg?w=950",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {

        lat: 40.7484405,
        lng: -73.9862116,
    },
    creator: "u2"



}
];
 

  const UpdatePlace = () => {
    const [isLoading,setisLoading]=useState(true);
    const PlaceId = useParams().placeId;
    
   //pehle situation aur thi jab dummy data ke sath kaam kkiye the ab aur baat thi backend data ke sath kaam karne par custom hook ko try catch ke andar nai rakhna chiye so this modification ki pehle hardcodeed satte false false vala bhejo frantother thin update kro uske lye custom hook ko manipulate karna padega
   //in this place we will create a problem if when later work with data from backend as it will take some time to process  and  we will be needing a default value in the title and the  description and beacuse of the rulee of hooks we could not call it under a useeefect hook and which will make sure that jab response aajaye tab call kre this is totally wrong 
   //to ek hi option bachta hai hamare pass ki first initally define kdre and call hone ke bach fecth()(taking data from the backend frse call lre )

  
    const [formState,InputHandler,setFormData] = useForm({
        
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
   },false);
   const identifiedPlace = DUMMY_PLACES.find(p => p.id === PlaceId);
   //here we again update our formstate so we have to change our hook a liitle bit and add a functionallty which will allow us to change our validdity 
   useEffect(()=>{
  if(identifiedPlace)
  {

    setFormData({
        title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }



     },true);
  }

    

   setisLoading(false);

   },[setFormData,identifiedPlace])
     
    const placeUpdateSubmitHandler=(event)=>{
      
        event.preventDefault();
        console.log(formState.inputs);


    }
    
    if (!identifiedPlace) {
        return (

            <div className="center">
                <Card>
                <h2>Could Not Find Place!!!</h2>
                </Card>
            </div>


        );
    };
     if(isLoading )
     {
        return (

            <div className="center">
                <h2>Loading!!!</h2>
            </div>
        );

      }
  
    return(
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>

        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please Enter A Valid Title" onInput={InputHandler} initialvalue={formState.inputs.title.value} initialvalid={formState.inputs.title.isValid}></Input>
        <Input id="description" element="textarea" label="description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please Enter A Valid description" onInput={InputHandler} initialvalue={formState.inputs.description.value} initialvalid={formState.inputs.description.isValid}></Input>

        <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
    </form>
    
   );
};
  
export default UpdatePlace;