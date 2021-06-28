import React,{useCallback,useState} from 'react';
import { BrowserRouter as Router,Route ,Redirect,Switch} from 'react-router-dom'; //this is helpful in client side routing with url elements. It reads the url entered by the user and helps to render different pages according to the url
//our pages should be loaded with the help of router..
import Users from './user/pages/Users'
import NewPlaces from './places/pages/NewPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import Auth from './user/pages/Auth'
import UpdatePlace from './places/pages/UpdatePlace';
import {AuthContext} from './shared/context/Auth-context'
function App() {
  const [isLoggedIn,setisLoggedIn]=useState(false);
  const login=useCallback(()=>{

    setisLoggedIn(true);


  },[])
  const logout=useCallback(()=>{

    setisLoggedIn(false);


  },[])
  let routes;
  if(isLoggedIn)
  {
    routes=(
      <Switch>
      <Route path="/"  exact><Users /></Route>

      <Route path="/:userId/places" exact> <UserPlaces /></Route>
      <Route path="/places/new" exact><NewPlaces/></Route>
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
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn,login:login,logout:logout}}>

    <Router>
    <MainNavigation/>
    <main>

    {routes}
    
     </main>
     </Router>
     </AuthContext.Provider> 



  );
};

export default App;
