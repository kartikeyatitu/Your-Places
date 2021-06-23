import React from 'react';
import './UsersList.css'
import UserItem from './UserItem'
import Card from '../../shared/components/UIelements/Card'
//The idea is to output a message of no users if there is no users present otherwise list of users
const UserList = (props) => {
  //we get the list from outside items array
    if (props.items.length === 0) {
        return (<div className="center">
             <Card>
            <h2>No Users Found</h2>
            </Card>
        </div>
        );
    }
    return (<ul className="users-list">

        {props.items.map(user => {

            return <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places}

            />




        })}
    </ul>
    )
};
export default UserList;