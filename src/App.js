import React,{useCallback,useState,Fragment, useEffect,Suspense} from 'react';
import { BrowserRouter as Router,Route ,Redirect,Switch} from 'react-router-dom'; //this is helpful in client side routing with url elements. It reads the url entered by the user and helps to render different pages according to the url
//our pages should be loaded with the help of router..
//import Users from './user/pages/Users'
//import NewPlaces from './places/pages/NewPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation';
//import UserPlaces from './places/pages/UserPlaces';
//import Auth from '/user/pages/Auth'
//import UpdatePlace from './places/pages/UpdatePlace';
import {AuthContext} from './shared/context/Auth-context'
import './App.css'
import LoadingSpinner from './shared/components/UIelements/LoadingSpinner';
import styled from 'styled-components'


const Users=React.lazy(() => import('./user/pages/Users')); 
const NewPlaces=React.lazy(() => import('./places/pages/NewPlaces'));   //using lazy loading so that now  the user component is used when required
const UserPlaces=React.lazy(() => import('./places/pages/UserPlaces')); 
const UpdatePlace=React.lazy(() => import('./places/pages/UpdatePlace')); 
const Auth=React.lazy(() => import('./user/pages/Auth')); 



let logoutTimer;
function App() {

 


  const [token,setToken]=useState(false);
  const [userId,setuserId]=useState();
  const [tokenExprie,setTokenExprie]=useState();



  const login=useCallback((uid,token,expirationDate)=>{

    setToken(token);
    setuserId(uid);
    const TokenExpirationDate=expirationDate ||  new Date(new Date().getTime()+1000*60*60);
    setTokenExprie(TokenExpirationDate);
    localStorage.setItem('userData',JSON.stringify({userId:uid,token:token,expiration:TokenExpirationDate.toISOString()}));
    


  },[])
  const logout=useCallback(()=>{

    setToken(null);
    setuserId(null);
    setTokenExprie(null);
    localStorage.removeItem('userData');

  },[])

  useEffect(()=>{
    if(token && tokenExprie)
    {
      const remainingTime=tokenExprie.getTime()-new Date().getTime();
     logoutTimer= setTimeout(logout,remainingTime);
    }
    else{
      clearTimeout(logoutTimer);
    }

    
 },[token,logout,tokenExprie])


  useEffect(()=>{

    const storedData=JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token  && new Date(storedData.expiration) > new Date())
    {
          login(storedData.userId,storedData.token,new Date(storedData.expiration));
    }
 
 },[login])
  let routes;
  if(token)
  {
    routes=(
      <Switch>
      <Route path="/"  exact><Users /></Route>

      <Route path="/:userId/places" exact> <UserPlaces /></Route>
      <Route  path="/places/new" exact><NewPlaces/></Route>
     <Route path="/places/:placeId" exact><UpdatePlace/></Route>
    
      <Redirect to="/"/>
      </Switch>
      );
    


    }
  else
  {
    routes=(
      <Switch>
      <Route path="/"  exact><Users /></Route>

      <Route path="/:userId/places" exact> <UserPlaces /></Route>
      <Route path="/auth"> <Auth/></Route>
      <Redirect to="/Auth"/>
      </Switch>
      );
    
  
  }
  


  return (

    

    
    
<AuthContext.Provider value={{isLoggedIn:!!token,token:token,userId:userId,login:login,logout:logout}}>



    <Router>
    <MainNavigation/>
    <main>
    <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>
     {routes}
    </Suspense>
     </main>
     </Router>

     </AuthContext.Provider> 
   
     
     );
 
    };   
     


          

export default App;