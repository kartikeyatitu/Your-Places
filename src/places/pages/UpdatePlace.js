import React, { useEffect,useState,useContext } from 'react'
import { useParams ,useHistory} from 'react-router';
import Input from '../../shared/components/FormComponents/Input';
import Button from '../../shared/components/FormComponents/Button';
import Card from '../../shared/components/UIelements/Card'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/Util/Validators';
import { useForm } from '../../shared/Hooks/form-hook';
import  './UpdatePlace';
import { useHttpClient } from '../../shared/Hooks/http-hooks';
import ErrorModal from '../../shared/components/UIelements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner';
import { AuthContext } from '../../shared/context/Auth-context';
import { is } from '@babel/types';
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
    const {isloading,error,sendRequest,ClearError}=useHttpClient();
    const [isLoading,setisLoading]=useState(true);
    const [loadedPlaces,setloadedPlaces]=useState();
    const history=useHistory();
    const auth=useContext(AuthContext);
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
   useEffect(()=>{
    const fetchPlaces = async() => {
      try{
         
           const responseData=  await sendRequest(`http://localhost:5008/api/places/${PlaceId}`);
           setloadedPlaces(responseData.place);
           
    setFormData({
      title: {
          value:responseData.place.title,
          isValid: true
        },
        description: {
          value: responseData.place.description,
          isValid: true
        }



   },true);
     
  
         
       }catch(err){
   
   
       }
      };
       fetchPlaces();
      


   },[sendRequest,PlaceId,setFormData])
   //here we again update our formstate so we have to change our hook a liitle bit and add a functionallty which will allow us to change our validdity 
  
     
    const placeUpdateSubmitHandler= async(event)=>{
      
        event.preventDefault();
      
      try{
        await sendRequest(`http://localhost:5008/api/places/${PlaceId}`,'PATCH',JSON.stringify({
        
         title:formState.inputs.title.value,
         description:formState.inputs.description.value
  



        }),
          
          {'Content-Type':'application/json'}
     
     
          


        );
        history.push('/' + auth.userId + '/places');
      }catch(err)
      {


      }


    };
    
    if(isloading )
    {
       return (

           <div className="center">
              <LoadingSpinner/>
           </div>
       );

     }

    if (!loadedPlaces && !error) {
        return (

            <div className="center">
                <Card>
                <h2>Could Not Find Place!!!</h2>
                </Card>
            </div>


        );
    };
    
  
    return( <React.Fragment>
       <ErrorModal error={error} onClear={ClearError}/>

  {!isloading && loadedPlaces &&  <form className="place-form" onSubmit={placeUpdateSubmitHandler}>

        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please Enter A Valid Title" onInput={InputHandler} initialvalue={loadedPlaces.title} initialvalid={true}></Input>
        <Input id="description" element="textarea" label="description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please Enter A Valid description" onInput={InputHandler} initialvalue={loadedPlaces.description} initialvalid={true}></Input>

        <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
    </form>}
    </React.Fragment>
   );
};
  
export default UpdatePlace;