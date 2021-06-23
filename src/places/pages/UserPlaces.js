//component that fetches and renders all the places iof the users
import React from 'react'
import {useParams} from 'react-router-dom'// node useParans is only applical on functional based components
import PlaceList from '../components/PlaceList'
const DUMMY_PLACES=[{
   
     id:"p1",
     title:"empire state building",
     description:"best skyscraper",
     imageUrl:"https://mma.prnewswire.com/media/1500294/Empire_State_Building_90th_Anniversary.jpg?w=950",
     address:"20 W 34th St, New York, NY 10001, United States",
     location:{

        /*lat:40.7484405,
        lng:-73.9862116,*/
        lat:28.7041, 
        lng:77.1025,
     },
     creator:"u1"



},

{
    
    id:"p2",
    title:"empire state building",
    description:"best skyscraper",
    imageUrl:"https://mma.prnewswire.com/media/1500294/Empire_State_Building_90th_Anniversary.jpg?w=950",
    address:"20 W 34th St, New York, NY 10001, United States",
    location:{

       lat:40.7484405,
       lng:-73.9862116,
    },
    creator:"u2"



}
];
const UserPlaces=(props)=>{
 
    const userId=useParams().userId;
    const LoadedPlaces=DUMMY_PLACES.filter(place=> place.creator===userId);
    return <PlaceList items={LoadedPlaces}/>
};
export default UserPlaces;
