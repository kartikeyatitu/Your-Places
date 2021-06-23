import React, { useState } from 'react'
import './PlaceItem.css'
import Card from '../../shared/components/UIelements/Card'
import Button from '../../shared/components/FormComponents/Button';
import Modal from '../../shared/components/UIelements/Modal'
import Map from '../../shared/components/UIelements/Map'
/*   <iframe title="map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"

          src={'https://maps.google.com/maps?q=' + props.coordinates.lat.toString() + ',' + props.coordinates.lng.toString() + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}></iframe><script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165'></script>
     */
// general method would be to use mapbox and googlemaps so that but iframe which is used to  display a web page within a web page.
const PlaceItem = (props) => {

    const [showMap, setshowMap] = useState(false);
    const openMaphandler = () => {

        setshowMap(true);


    };
    const closeMaphandler = () => {

        setshowMap(false);
     }

    return (
        <React.Fragment>
            <Modal
             show={showMap}  
             onCancel={closeMaphandler} 
             header={props.address} 
             contentClass="place-item__modal-content" 
             footerClass="place-item__modal-actions"
             footer={<Button onClick={closeMaphandler}>Close Button</Button>}
             >
          

              
               <div className="map-container" style={{padding:"5px"}} >
               <iframe title="map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"

src={'https://maps.google.com/maps?q=' + props.coordinates.lat.toString() + ',' + props.coordinates.lng.toString() + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}></iframe><script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165'></script>
            
           </div>

             </Modal>
                <li className='place-item'>
                    <Card className="place-item__content">
                        <div className="place-item__image">

                            <img src={props.image} alt={props.title} />

                        </div>
                        <div className="place-item__info">

                            <h2>{props.title}</h2>
                            <h3>{props.address}</h3>
                            <p>{props.description}</p>
                        </div>
                        <div className="place-item__actions">

                            <Button inverse onClick={openMaphandler}>View on map</Button>
                            <Button to={`/places/${props.id}`}>Edit</Button>
                            <Button danger>Delete</Button>

                        </div>
                    </Card>
                </li>
    </React.Fragment>

)
};
export default PlaceItem;