import React from 'react';
import { BrowserRouter as Router,Route ,Redirect,Switch} from 'react-router-dom'; //this is helpful in client side routing with url elements. It reads the url entered by the user and helps to render different pages according to the url
//our pages should be loaded with the help of router..
import Users from './user/pages/Users'
import NewPlaces from './places/pages/NewPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
function App() {
  return (

    <Router>
    <MainNavigation/>
    <main>
     <Switch>
     <Route path="/" exact><Users /></Route>
     <Route path="/:userId/places" exact> <UserPlaces /></Route>
     
     <Route path="/places/new" exact><NewPlaces/></Route>
     <Route path="/places/:placeId" exact><UpdatePlace/></Route>
     <Redirect to="/"/>
     </Switch>
     </main>
     </Router>
     



  );
};

export default App;
