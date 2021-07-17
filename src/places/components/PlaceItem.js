import React, { useState ,useContext} from 'react'
import './PlaceItem.css'
import Card from '../../shared/components/UIelements/Card'
import Button from '../../shared/components/FormComponents/Button';
import Modal from '../../shared/components/UIelements/Modal'
import { AuthContext } from '../../shared/context/Auth-context';
import Map from '../../shared/components/UIelements/Map'
import { useHttpClient } from '../../shared/Hooks/http-hooks';
import ErrorModal from '../../shared/components/UIelements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIelements/LoadingSpinner';
/*   <iframe title="map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"

          src={'https://maps.google.com/maps?q=' + props.coordinates.lat.toString() + ',' + props.coordinates.lng.toString() + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}></iframe><script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165'></script>
     */
// general method would be to use mapbox and googlemaps so that but iframe which is used to  display a web page within a web page.
const PlaceItem = (props) => {
    const auth=useContext(AuthContext);

    const [showMap, setshowMap] = useState(false);
    const [showConfirmedModal,setshowConfirmedModal]=useState(false);
    const {isloading,error,sendRequest,ClearError}=useHttpClient();
    const openMaphandler = () => {

        setshowMap(true);


    };
    const closeMaphandler = () => {

        setshowMap(false);
    }


    const showdeletewarnighandler=()=>{
        
        setshowConfirmedModal(true);
    }
    const cancelDeleteHandler=()=>{
        
        setshowConfirmedModal(false);
    }
   
      const confirmDeleteHandler= async()=>{
         setshowConfirmedModal(false);
           try{

                 await sendRequest(process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,'DELETE',null,{Authorization:'Bearer '  + auth.token});
                 props.onDelete(props.id);

           }catch(err)
           {



           }

      }


    return (
        <React.Fragment>
             <ErrorModal error={error} onClear={ClearError}/>

            <Modal
                show={showMap}
                onCancel={closeMaphandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMaphandler}>Close Button</Button>}
            >



                <div className="map-container" style={{ padding: "5px" }} >
                    <iframe title="map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"

                        src={'https://maps.google.com/maps?q=' + props.coordinates.lat.toString() + ',' + props.coordinates.lng.toString() + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}></iframe><script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165'></script>

                </div>

            </Modal>
            <Modal show={showConfirmedModal}  cancel={cancelDeleteHandler}  header="Are you sure" footerClass="place-item__modal-actions" footer={
                  <React.Fragment>
                   
                   <Button inverse onClick={cancelDeleteHandler}>
                     
                     Cancel

                   </Button>
                   <Button danger onClick={confirmDeleteHandler}>
                       Delete
                   </Button>



                  </React.Fragment>



            }>
            <p> Do you want to  proceed  and  "Delete" surely!!!..Please not that it cant be undone after </p>

            </Modal>
            <li className='place-item'>
                <Card className="place-item__content">
                    {isloading && <LoadingSpinner asOverlay/>}
                    <div className="place-item__image">

                        <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />

                    </div>
                    <div className="place-item__info">

                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">

                        <Button inverse onClick={openMaphandler}>View on map</Button>
                        {auth.userId===props.creatorId && 
                        <Button to={`/places/${props.id}`}>Edit</Button>}
                        {auth.userId===props.creatorId && <Button danger onClick={showdeletewarnighandler}>Delete</Button>}
                        
                    </div>
                </Card>
            </li>
        </React.Fragment>

    )
};
export default PlaceItem;