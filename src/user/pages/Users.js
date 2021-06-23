import React from 'react'
import UsersList from '../components/UsersList'
const Users = () => {
    //For now if we are creating frontend we create Dummy array later it will be fetched by backend;
    const USERS=[
        {

     id:'u1',
      name:'Tutu',
      image:'https://static.boredpanda.com/blog/wp-content/uploads/2016/11/before-and-after-photoshop-pics-90-581b2e9ab164d__700.jpg',
      places:4
      
    }
    
];
   
    return <UsersList  items={USERS}/>


}
export default Users;