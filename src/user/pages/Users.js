import React,{useEffect,useState} from 'react'
import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIelements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner';
import { useHttpClient} from '../../shared/Hooks/http-hooks'
const Users = () => {
    //For now if we are creating frontend we create Dummy array later it will be fetched by backend;
    const {isloading,error,sendRequest,ClearError}=useHttpClient();
     const[loadedUser,setloadedUser]=useState();     

     useEffect(()=>{

          const fetchUser= async ()=>{
        
       
       try{
        const responseData=await sendRequest('http://localhost:5008/api/users')
      
        
         setloadedUser(responseData.users);
         
       }catch(err) {}

        };
         fetchUser();
     },[sendRequest])

// note point fetch usse kia hai to async await hoga hi asynchronous task hai but useeffect ke andar nai use krna async useEffect(async()=>{ this is not done
   
    return (
    
     <React.Fragment>    
     <ErrorModal  error={error} onClear={ClearError}/>
      {isloading && (<div className="center"><LoadingSpinner/></div>)}
      
      {!isloading && loadedUser && <UsersList  items={loadedUser}/> } 
     
     </React.Fragment>

        
        
        
        
        );


}
export default Users;