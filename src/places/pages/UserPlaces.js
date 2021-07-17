//component that fetches and renders all the places iof the users
import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'// node useParans is only applical on functional based components
import PlaceList from '../components/PlaceList'
import { useHttpClient } from '../../shared/Hooks/http-hooks';
import ErrorModal from '../../shared/components/UIelements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner';
//getting places by userId
const UserPlaces=(props)=>{
 
    const {isloading,error,sendRequest,ClearError}=useHttpClient();
    const [loadedPlaces,setloadedPlaces]=useState();
    const userId=useParams().userId;
 
    useEffect(()=>{
       const fetchPlaces = async() => {
   try{
      
        const responseData=  await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
        setloadedPlaces(responseData.places);
      
    }catch(err){


    }
    
    };
    fetchPlaces();

     

    },[sendRequest,userId])
      
    const placeDeletedHandler=(deletedPlaceId)=>{
        setloadedPlaces(prevPlaces => prevPlaces.filter(place => place.id!==deletedPlaceId));


    }
   
    return <React.Fragment>
         <ErrorModal error={error} onClear={ClearError}/>
         {isloading && (<div className="center"><LoadingSpinner/></div>)}
        {!isloading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
    
    
    </React.Fragment>
};
export default UserPlaces;
