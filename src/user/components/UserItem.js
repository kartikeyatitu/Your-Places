import React from 'react';
import Avatar from '../../shared/components/UIelements/Avatar'
import Card from '../../shared/components/UIelements/Card'
import './UserItem.css'
import { Link } from 'react-router-dom'
// so we have to add link to our user which when clicked takes to the page where places created by that particular user is....So  instead of anchor tag we use link manipulated by react dom router
// below to in link defines where to u want to go
const UserItem = (props) => {

    return (<li className="user-item">


     
            <Card className="user-item__content">
                <Link to={`/${props.id}/places`}>

                    <div className="user-item__image">
                        <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name} />
                    </div>

                    <div className="user-item__info">
                        <h2>{props.name}</h2>
                        <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                </Link>
            </Card>
        
    </li>
    );


}
export default UserItem;